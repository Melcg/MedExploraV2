// src/composables/useMultimedia.js
import { ref, computed } from 'vue'
import { MULTIMEDIA_TYPES } from '@/utils/constants'

export function useMultimedia() {
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(1)
  const loading = ref(false)
  const error = ref(null)

  // Referencias a elementos multimedia
  const mediaElement = ref(null)

  // Tipo de multimedia actual
  const mediaType = ref(null)
  const mediaList = ref([])

  // Item actual
  const currentMedia = computed(() => {
    return mediaList.value[currentIndex.value] || null
  })

  // Progreso en porcentaje
  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  // Hay siguiente/anterior
  const hasNext = computed(() => {
    return currentIndex.value < mediaList.value.length - 1
  })

  const hasPrevious = computed(() => {
    return currentIndex.value > 0
  })

  // Cargar lista de multimedia
  const loadMediaList = (type, list) => {
    mediaType.value = type
    mediaList.value = list || []
    currentIndex.value = 0
    error.value = null
  }

  // Reproducir
  const play = () => {
    if (mediaElement.value) {
      mediaElement.value.play()
        .then(() => {
          isPlaying.value = true
        })
        .catch(err => {
          console.error('Error al reproducir:', err)
          error.value = 'No se pudo reproducir el archivo'
        })
    }
  }

  // Pausar
  const pause = () => {
    if (mediaElement.value) {
      mediaElement.value.pause()
      isPlaying.value = false
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  // Siguiente
  const next = () => {
    if (hasNext.value) {
      currentIndex.value++
      resetPlayback()
    }
  }

  // Anterior
  const previous = () => {
    if (hasPrevious.value) {
      currentIndex.value--
      resetPlayback()
    }
  }

  // Ir a un índice específico
  const goToIndex = (index) => {
    if (index >= 0 && index < mediaList.value.length) {
      currentIndex.value = index
      resetPlayback()
    }
  }

  // Buscar en la línea de tiempo
  const seek = (time) => {
    if (mediaElement.value) {
      mediaElement.value.currentTime = time
      currentTime.value = time
    }
  }

  // Cambiar volumen
  const setVolume = (newVolume) => {
    volume.value = Math.max(0, Math.min(1, newVolume))
    if (mediaElement.value) {
      mediaElement.value.volume = volume.value
    }
  }

  // Silenciar/Desilenciar
  const toggleMute = () => {
    if (mediaElement.value) {
      mediaElement.value.muted = !mediaElement.value.muted
    }
  }

  // Resetear reproducción
  const resetPlayback = () => {
    if (mediaElement.value) {
      mediaElement.value.pause()
      mediaElement.value.currentTime = 0
    }
    isPlaying.value = false
    currentTime.value = 0
  }

  // Handlers de eventos de audio/video
  const handleTimeUpdate = (event) => {
    currentTime.value = event.target.currentTime
  }

  const handleLoadedMetadata = (event) => {
    duration.value = event.target.duration
    loading.value = false
  }

  const handleEnded = () => {
    isPlaying.value = false
    
    // Auto-reproducir siguiente si existe
    if (hasNext.value) {
      next()
      setTimeout(() => play(), 100)
    }
  }

  const handleError = (event) => {
    console.error('Error de multimedia:', event)
    error.value = 'Error al cargar el archivo multimedia'
    loading.value = false
  }

  const handleLoadStart = () => {
    loading.value = true
    error.value = null
  }

  // Formatear tiempo (segundos a MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Limpiar
  const cleanup = () => {
    pause()
    mediaElement.value = null
    currentIndex.value = 0
    currentTime.value = 0
    duration.value = 0
    isPlaying.value = false
    loading.value = false
    error.value = null
  }

  return {
    // State
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    loading,
    error,
    mediaElement,
    mediaType,
    mediaList,
    // Computed
    currentMedia,
    progress,
    hasNext,
    hasPrevious,
    // Methods
    loadMediaList,
    play,
    pause,
    togglePlay,
    next,
    previous,
    goToIndex,
    seek,
    setVolume,
    toggleMute,
    resetPlayback,
    formatTime,
    cleanup,
    // Event handlers
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleError,
    handleLoadStart,
  }
}