<template>
  <div class="audio-player">
    <!-- Audio element (oculto) -->
    <audio
      ref="audioRef"
      :src="audioSrc"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
      @error="handleError"
      @loadstart="handleLoadStart"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />

    <v-card class="audio-card" elevation="8">
      <!-- Cabecera -->
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-music-note" color="purple" class="mr-2" size="large" />
        <div class="flex-grow-1">
          <div class="text-h6">{{ title || 'Audio médico' }}</div>
          <div v-if="description" class="text-caption text-medium-emphasis">
            {{ description }}
          </div>
        </div>
      </v-card-title>

      <v-divider />

      <!-- Visualizador de onda (simulado) -->
      <div class="waveform-container">
        <WaveformVisualizer
          :is-playing="isPlaying"
          :progress="progress"
          :color="'purple'"
        />
      </div>

      <v-divider />

      <!-- Controles -->
      <v-card-text class="pa-6">
        <!-- Loading -->
        <div v-if="loading" class="text-center py-4">
          <v-progress-circular indeterminate color="purple" />
          <p class="mt-2 text-caption">Cargando audio...</p>
        </div>

        <!-- Error -->
        <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
          {{ error }}
          <template v-slot:append>
            <v-btn size="small" @click="$emit('retry')">
              Reintentar
            </v-btn>
          </template>
        </v-alert>

        <!-- Controles principales -->
        <div v-if="!loading && !error">
          <!-- Barra de progreso -->
          <v-slider
            :model-value="currentTime"
            :max="duration"
            :step="0.1"
            color="purple"
            track-color="grey-lighten-2"
            class="mb-2"
            hide-details
            @update:model-value="seek"
          >
            <template v-slot:prepend>
              <span class="text-caption">{{ formatTime(currentTime) }}</span>
            </template>
            <template v-slot:append>
              <span class="text-caption">{{ formatTime(duration) }}</span>
            </template>
          </v-slider>

          <!-- Botones de control -->
          <div class="d-flex align-center justify-space-between mt-4">
            <!-- Navegación -->
            <div class="d-flex align-center gap-2">
              <v-btn
                v-if="hasPrevious"
                icon="mdi-skip-previous"
                size="small"
                variant="text"
                @click="$emit('previous')"
              />
              <span v-if="totalAudios > 1" class="text-caption">
                {{ currentIndex + 1 }} / {{ totalAudios }}
              </span>
              <v-btn
                v-if="hasNext"
                icon="mdi-skip-next"
                size="small"
                variant="text"
                @click="$emit('next')"
              />
            </div>

            <!-- Play/Pause central -->
            <v-btn
              :icon="isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle'"
              size="x-large"
              color="purple"
              variant="flat"
              @click="togglePlay"
            />

            <!-- Controles adicionales -->
            <div class="d-flex align-center gap-2">
              <!-- Loop -->
              <v-btn
                :icon="isLooping ? 'mdi-repeat' : 'mdi-repeat-off'"
                :color="isLooping ? 'purple' : 'grey'"
                size="small"
                variant="text"
                @click="toggleLoop"
              />

              <!-- Volumen -->
              <v-menu offset-y location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    :icon="volume === 0 ? 'mdi-volume-off' : 'mdi-volume-high'"
                    size="small"
                    variant="text"
                    v-bind="props"
                  />
                </template>
                <v-card>
                  <v-card-text class="pa-4">
                    <v-slider
                      v-model="volume"
                      direction="vertical"
                      :max="1"
                      :step="0.1"
                      color="purple"
                      height="120"
                      hide-details
                      @update:model-value="setVolume"
                    />
                  </v-card-text>
                </v-card>
              </v-menu>

              <!-- Velocidad -->
              <v-menu offset-y location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    size="small"
                    variant="text"
                    v-bind="props"
                  >
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
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useMultimedia } from '@/composables/useMultimedia'
import WaveformVisualizer from './WaveformVisualizer.vue'

const props = defineProps({
  audioSrc: {
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
  totalAudios: {
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

const audioRef = ref(null)
const isLooping = ref(false)
const playbackRate = ref(1)
const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2]

const progress = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const togglePlay = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause()
    } else {
      audioRef.value.play()
    }
  }
}

const seek = (time) => {
  if (audioRef.value) {
    audioRef.value.currentTime = time
  }
}

const setVolume = (newVolume) => {
  volume.value = newVolume
  if (audioRef.value) {
    audioRef.value.volume = newVolume
  }
}

const toggleLoop = () => {
  isLooping.value = !isLooping.value
  if (audioRef.value) {
    audioRef.value.loop = isLooping.value
  }
}

const setPlaybackRate = (rate) => {
  playbackRate.value = rate
  if (audioRef.value) {
    audioRef.value.playbackRate = rate
  }
}

watch(() => props.audioSrc, () => {
  if (audioRef.value) {
    audioRef.value.load()
  }
  isPlaying.value = false
  currentTime.value = 0
})

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
})

defineExpose({ audioRef })
</script>

<style scoped>
.audio-player {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.audio-card {
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}

.waveform-container {
  height: 120px;
  background: #f9f9f9;
}
</style>