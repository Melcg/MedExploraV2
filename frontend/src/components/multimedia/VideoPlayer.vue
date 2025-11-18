<template>
  <div class="video-player">
    <!-- Video element -->
    <video
      ref="videoRef"
      class="video-element"
      :src="videoSrc"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
      @error="handleError"
      @loadstart="handleLoadStart"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    >
      Tu navegador no soporta el elemento de video.
    </video>

    <!-- Loading overlay -->
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate size="64" color="white" />
      <p class="mt-4 text-white">Cargando video...</p>
    </div>

    <!-- Error overlay -->
    <div v-if="error" class="error-overlay">
      <v-icon icon="mdi-video-off" size="64" color="error" />
      <p class="mt-4">{{ error }}</p>
      <v-btn color="primary" @click="$emit('retry')">
        Reintentar
      </v-btn>
    </div>

    <!-- Controles personalizados -->
    <div v-show="!loading && !error" class="video-controls" :class="{ 'controls-visible': showControls }">
      <!-- Barra de progreso -->
      <v-slider
        :model-value="currentTime"
        :max="duration"
        :step="0.1"
        color="primary"
        track-color="grey"
        class="progress-slider"
        hide-details
        @update:model-value="seek"
      >
        <template v-slot:prepend>
          <span class="time-display">{{ formatTime(currentTime) }}</span>
        </template>
        <template v-slot:append>
          <span class="time-display">{{ formatTime(duration) }}</span>
        </template>
      </v-slider>

      <!-- Controles principales -->
      <div class="main-controls">
        <div class="left-controls">
          <!-- Play/Pause -->
          <v-btn
            :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
            size="large"
            @click="togglePlay"
          />

          <!-- Volumen -->
          <div class="volume-control">
            <v-btn
              :icon="volume === 0 ? 'mdi-volume-off' : 'mdi-volume-high'"
              @click="toggleMute"
            />
            <v-slider
              v-model="volume"
              :max="1"
              :step="0.1"
              color="white"
              track-color="grey"
              class="volume-slider"
              hide-details
              @update:model-value="setVolume"
            />
          </div>

          <!-- Velocidad -->
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text">
                {{ playbackRate }}x
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item
                v-for="rate in playbackRates"
                :key="rate"
                @click="setPlaybackRate(rate)"
              >
                <v-list-item-title :class="{ 'font-weight-bold': rate === playbackRate }">
                  {{ rate }}x
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="right-controls">
          <!-- Navegación -->
          <v-btn
            v-if="hasPrevious"
            icon="mdi-skip-previous"
            @click="$emit('previous')"
          />
          <v-btn
            v-if="hasNext"
            icon="mdi-skip-next"
            @click="$emit('next')"
          />

          <!-- Pantalla completa -->
          <v-btn
            :icon="isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
            @click="toggleFullscreen"
          />
        </div>
      </div>
    </div>

    <!-- Contador de videos -->
    <div v-if="totalVideos > 1" class="video-counter">
      {{ currentIndex + 1 }} / {{ totalVideos }}
    </div>

    <!-- Título/Descripción -->
    <div v-if="title" class="video-title">
      <v-card color="rgba(0,0,0,0.7)" dark>
        <v-card-text class="pa-3">
          <strong>{{ title }}</strong>
          <p v-if="description" class="text-caption mb-0 mt-1">
            {{ description }}
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useMultimedia } from '@/composables/useMultimedia'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  totalVideos: {
    type: Number,
    default: 1
  },
  hasPrevious: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  }
})

defineEmits(['previous', 'next', 'retry'])

const {
  isPlaying,
  currentTime,
  duration,
  volume,
  loading,
  error,
  formatTime,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleEnded,
  handleError,
  handleLoadStart,
} = useMultimedia()

const videoRef = ref(null)
const showControls = ref(true)
const isFullscreen = ref(false)
const playbackRate = ref(1)
const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

let controlsTimeout = null

const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
  }
}

const seek = (time) => {
  if (videoRef.value) {
    videoRef.value.currentTime = time
  }
}

const setVolume = (newVolume) => {
  volume.value = newVolume
  if (videoRef.value) {
    videoRef.value.volume = newVolume
  }
}

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    if (videoRef.value.muted) {
      volume.value = 0
    } else {
      volume.value = videoRef.value.volume
    }
  }
}

const setPlaybackRate = (rate) => {
  playbackRate.value = rate
  if (videoRef.value) {
    videoRef.value.playbackRate = rate
  }
}

const toggleFullscreen = () => {
  const container = videoRef.value?.parentElement
  
  if (!document.fullscreenElement) {
    container?.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// Auto-ocultar controles
const resetControlsTimeout = () => {
  showControls.value = true
  
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
  }
  
  if (isPlaying.value) {
    controlsTimeout = setTimeout(() => {
      showControls.value = false
    }, 3000)
  }
}

const handleMouseMove = () => {
  resetControlsTimeout()
}

const handleKeyPress = (event) => {
  switch (event.code) {
    case 'Space':
      event.preventDefault()
      togglePlay()
      break
    case 'ArrowLeft':
      seek(Math.max(0, currentTime.value - 5))
      break
    case 'ArrowRight':
      seek(Math.min(duration.value, currentTime.value + 5))
      break
    case 'KeyF':
      toggleFullscreen()
      break
  }
}

watch(isPlaying, () => {
  resetControlsTimeout()
})

watch(() => props.videoSrc, () => {
  if (videoRef.value) {
    videoRef.value.load()
  }
})

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('keydown', handleKeyPress)
  
  if (videoRef.value) {
    videoRef.value.volume = volume.value
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('keydown', handleKeyPress)
  
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
  }
})

defineExpose({ videoRef })
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 10;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 5;
}

.video-controls.controls-visible {
  transform: translateY(0);
}

.progress-slider {
  margin-bottom: 8px;
}

.time-display {
  color: white;
  font-size: 12px;
  min-width: 50px;
}

.main-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-controls,
.right-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 100px;
}

.video-counter {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  z-index: 10;
}

.video-title {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 10;
}

@media (max-width: 960px) {
  .volume-slider {
    display: none;
  }
  
  .video-title {
    top: 60px;
  }
}
</style>