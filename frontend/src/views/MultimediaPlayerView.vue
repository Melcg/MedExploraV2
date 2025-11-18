<template>
  <div class="multimedia-player-view">
    <!-- Barra superior mínima -->
    <v-app-bar color="black" dark density="compact">
      <v-btn icon="mdi-close" @click="close" />
      <v-toolbar-title>
        {{ mediaTypeLabel }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="mediaType === 'image'"
        icon="mdi-download"
        @click="downloadMedia"
      />
    </v-app-bar>

    <!-- Contenedor principal -->
    <div class="media-container">
      <!-- Visor de Imágenes -->
      <ImageViewer
        v-if="mediaType === 'image'"
        :image-src="currentMediaSrc"
        :image-alt="currentMediaAlt"
        :description="currentMediaDescription"
        :current-index="currentIndex"
        :total-images="mediaList.length"
        :has-previous="currentIndex > 0"
        :has-next="currentIndex < mediaList.length - 1"
        @previous="previous"
        @next="next"
      />

      <!-- Reproductor de Video -->
      <VideoPlayer
        v-else-if="mediaType === 'video'"
        :video-src="currentMediaSrc"
        :title="currentMediaTitle"
        :description="currentMediaDescription"
        :current-index="currentIndex"
        :total-videos="mediaList.length"
        :has-previous="currentIndex > 0"
        :has-next="currentIndex < mediaList.length - 1"
        @previous="previous"
        @next="next"
        @retry="loadMedia"
      />

      <!-- Reproductor de Audio -->
      <div v-else-if="mediaType === 'audio'" class="audio-container">
        <AudioPlayer
          :audio-src="currentMediaSrc"
          :title="currentMediaTitle"
          :description="currentMediaDescription"
          :current-index="currentIndex"
          :total-audios="mediaList.length"
          :has-previous="currentIndex > 0"
          :has-next="currentIndex < mediaList.length - 1"
          @previous="previous"
          @next="next"
          @retry="loadMedia"
        />
      </div>

      <!-- Estado vacío -->
      <div v-else class="empty-state">
        <v-icon icon="mdi-file-alert" size="64" color="grey" />
        <p class="mt-4">No hay contenido multimedia disponible</p>
        <v-btn color="primary" @click="close">
          Volver
        </v-btn>
      </div>
    </div>

    <!-- Lista de thumbnails (solo para imágenes y videos) -->
    <div
      v-if="mediaList.length > 1 && (mediaType === 'image' || mediaType === 'video')"
      class="thumbnails-bar"
    >
      <v-sheet class="d-flex pa-2" color="black">
        <v-btn
          v-for="(media, index) in mediaList"
          :key="index"
          :class="{ 'thumbnail-active': index === currentIndex }"
          class="thumbnail-btn mr-2"
          size="small"
          @click="goToIndex(index)"
        >
          <v-img
            v-if="mediaType === 'image'"
            :src="media"
            aspect-ratio="1"
            width="60"
            height="60"
            cover
          />
          <div v-else class="thumbnail-placeholder">
            <v-icon icon="mdi-video" />
            <span class="text-caption">{{ index + 1 }}</span>
          </div>
        </v-btn>
      </v-sheet>
    </div>

    <!-- Lista de audios (para audios) -->
    <div
      v-if="mediaList.length > 1 && mediaType === 'audio'"
      class="audio-list"
    >
      <v-card>
        <v-card-title>
          <v-icon icon="mdi-playlist-music" class="mr-2" />
          Lista de reproducción
        </v-card-title>
        <v-divider />
        <v-list density="compact">
          <v-list-item
            v-for="(audio, index) in mediaList"
            :key="index"
            :active="index === currentIndex"
            :prepend-icon="index === currentIndex && isPlaying ? 'mdi-volume-high' : 'mdi-music-note'"
            @click="goToIndex(index)"
          >
            <v-list-item-title>
              Audio {{ index + 1 }}
              <v-chip
                v-if="index === currentIndex"
                size="x-small"
                color="purple"
                class="ml-2"
              >
                Reproduciendo
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ImageViewer from '@/components/multimedia/ImageViewer.vue'
import VideoPlayer from '@/components/multimedia/VideoPlayer.vue'
import AudioPlayer from '@/components/multimedia/AudioPlayer.vue'
import { getTechniqueById } from '@/data/techniques'
import { MULTIMEDIA_TYPES } from '@/utils/constants'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['image', 'video', 'audio'].includes(value)
  },
  id: {
    type: String,
    required: true
  }
})

const mediaType = ref(props.type)
const mediaList = ref([])
const currentIndex = ref(0)
const isPlaying = ref(false)

const mediaTypeLabel = computed(() => {
  const labels = {
    image: 'Imágenes',
    video: 'Videos',
    audio: 'Audios'
  }
  return labels[mediaType.value] || 'Multimedia'
})

const currentMediaSrc = computed(() => {
  return mediaList.value[currentIndex.value] || ''
})

const currentMediaAlt = computed(() => {
  return `Imagen ${currentIndex.value + 1}`
})

const currentMediaTitle = computed(() => {
  return `${mediaTypeLabel.value} ${currentIndex.value + 1}`
})

const currentMediaDescription = computed(() => {
  // Aquí podrías cargar descripciones específicas desde los datos
  return ''
})

// Cargar multimedia
const loadMedia = () => {
  const technique = getTechniqueById(props.id)
  
  if (!technique || !technique.multimedia) {
    console.error('No se encontró multimedia para la técnica:', props.id)
    return
  }

  const multimedia = technique.multimedia

  switch (mediaType.value) {
    case 'image':
      mediaList.value = multimedia.images || []
      break
    case 'video':
      mediaList.value = multimedia.videos || []
      break
    case 'audio':
      mediaList.value = multimedia.audios || []
      break
  }

  // Obtener índice inicial desde query
  const queryIndex = parseInt(route.query.index || '0')
  currentIndex.value = Math.max(0, Math.min(queryIndex, mediaList.value.length - 1))
}

// Navegación
const next = () => {
  if (currentIndex.value < mediaList.value.length - 1) {
    currentIndex.value++
  }
}

const previous = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToIndex = (index) => {
  if (index >= 0 && index < mediaList.value.length) {
    currentIndex.value = index
  }
}

// Cerrar
const close = () => {
  router.back()
}

// Descargar (solo imágenes)
const downloadMedia = () => {
  if (mediaType.value === 'image' && currentMediaSrc.value) {
    const link = document.createElement('a')
    link.href = currentMediaSrc.value
    link.download = `imagen-${currentIndex.value + 1}.jpg`
    link.click()
  }
}

// Controles de teclado
const handleKeyPress = (event) => {
  switch (event.code) {
    case 'Escape':
      close()
      break
    case 'ArrowLeft':
      previous()
      break
    case 'ArrowRight':
      next()
      break
  }
}

watch(() => props.type, () => {
  mediaType.value = props.type
  loadMedia()
})

watch(() => props.id, () => {
  loadMedia()
})

onMounted(() => {
  loadMedia()
  document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.multimedia-player-view {
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.media-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.audio-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.thumbnails-bar {
  background: #000;
  overflow-x: auto;
  max-height: 100px;
}

.thumbnails-bar::-webkit-scrollbar {
  height: 6px;
}

.thumbnails-bar::-webkit-scrollbar-track {
  background: #333;
}

.thumbnails-bar::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 3px;
}

.thumbnail-btn {
  min-width: 60px;
  min-height: 60px;
  padding: 0 !important;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.thumbnail-btn.thumbnail-active {
  border-color: white;
  transform: scale(1.1);
}

.thumbnail-placeholder {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #333;
}

.audio-list {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;
}

@media (max-width: 960px) {
  .audio-list {
    bottom: 10px;
    right: 10px;
    left: 10px;
    width: auto;
  }
}
</style>