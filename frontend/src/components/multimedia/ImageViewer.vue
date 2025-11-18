<template>
  <div class="image-viewer">
    <!-- Imagen principal -->
    <div 
      class="image-container"
      @wheel="handleWheel"
      @mousedown="startPan"
      @mousemove="pan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <v-img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="imageAlt"
        cover
        class="viewer-image"
        :style="imageStyle"
        @load="handleImageLoad"
        @error="handleImageError"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
      </v-img>

      <!-- Error -->
      <div v-if="error" class="error-state">
        <v-icon icon="mdi-image-broken" size="64" color="error" />
        <p class="mt-4">No se pudo cargar la imagen</p>
      </div>
    </div>

    <!-- Controles de zoom -->
    <div class="zoom-controls">
      <v-btn
        icon="mdi-magnify-plus"
        size="small"
        color="white"
        @click="zoomIn"
      />
      <div class="zoom-indicator">
        {{ Math.round(zoom * 100) }}%
      </div>
      <v-btn
        icon="mdi-magnify-minus"
        size="small"
        color="white"
        @click="zoomOut"
      />
      <v-btn
        icon="mdi-fit-to-screen"
        size="small"
        color="white"
        class="mt-2"
        @click="resetZoom"
      />
    </div>

    <!-- Controles de navegación (si hay múltiples imágenes) -->
    <div v-if="showNavigation" class="navigation-controls">
      <v-btn
        icon="mdi-chevron-left"
        size="large"
        color="white"
        :disabled="!hasPrevious"
        @click="$emit('previous')"
      />
      <v-btn
        icon="mdi-chevron-right"
        size="large"
        color="white"
        :disabled="!hasNext"
        @click="$emit('next')"
      />
    </div>

    <!-- Contador -->
    <div v-if="showNavigation" class="image-counter">
      {{ currentIndex + 1 }} / {{ totalImages }}
    </div>

    <!-- Descripción -->
    <div v-if="description" class="image-description">
      <v-card color="rgba(0,0,0,0.7)" dark>
        <v-card-text class="pa-3">
          {{ description }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Imagen médica'
  },
  description: {
    type: String,
    default: ''
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  totalImages: {
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

defineEmits(['previous', 'next'])

const zoom = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isPanning = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const loading = ref(true)
const error = ref(false)

// Touch
let lastTouchDistance = 0

const showNavigation = computed(() => props.totalImages > 1)

const imageStyle = computed(() => ({
  transform: `scale(${zoom.value}) translate(${translateX.value}px, ${translateY.value}px)`,
  transition: isPanning.value ? 'none' : 'transform 0.3s ease',
  cursor: zoom.value > 1 ? 'grab' : 'default',
}))

const MIN_ZOOM = 0.5
const MAX_ZOOM = 5
const ZOOM_STEP = 0.2

const zoomIn = () => {
  zoom.value = Math.min(MAX_ZOOM, zoom.value + ZOOM_STEP)
}

const zoomOut = () => {
  zoom.value = Math.max(MIN_ZOOM, zoom.value - ZOOM_STEP)
  
  // Resetear posición si zoom es 1 o menos
  if (zoom.value <= 1) {
    translateX.value = 0
    translateY.value = 0
  }
}

const resetZoom = () => {
  zoom.value = 1
  translateX.value = 0
  translateY.value = 0
}

const handleWheel = (event) => {
  event.preventDefault()
  
  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

const startPan = (event) => {
  if (zoom.value > 1) {
    isPanning.value = true
    lastX.value = event.clientX
    lastY.value = event.clientY
  }
}

const pan = (event) => {
  if (isPanning.value && zoom.value > 1) {
    const deltaX = event.clientX - lastX.value
    const deltaY = event.clientY - lastY.value
    
    translateX.value += deltaX / zoom.value
    translateY.value += deltaY / zoom.value
    
    lastX.value = event.clientX
    lastY.value = event.clientY
  }
}

const endPan = () => {
  isPanning.value = false
}

// Touch events
const handleTouchStart = (event) => {
  if (event.touches.length === 2) {
    const dx = event.touches[0].clientX - event.touches[1].clientX
    const dy = event.touches[0].clientY - event.touches[1].clientY
    lastTouchDistance = Math.sqrt(dx * dx + dy * dy)
  } else if (event.touches.length === 1 && zoom.value > 1) {
    isPanning.value = true
    lastX.value = event.touches[0].clientX
    lastY.value = event.touches[0].clientY
  }
}

const handleTouchMove = (event) => {
  event.preventDefault()
  
  if (event.touches.length === 2) {
    // Pinch zoom
    const dx = event.touches[0].clientX - event.touches[1].clientX
    const dy = event.touches[0].clientY - event.touches[1].clientY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (lastTouchDistance > 0) {
      const scale = distance / lastTouchDistance
      zoom.value = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom.value * scale))
    }
    
    lastTouchDistance = distance
  } else if (event.touches.length === 1 && isPanning.value) {
    // Pan
    const deltaX = event.touches[0].clientX - lastX.value
    const deltaY = event.touches[0].clientY - lastY.value
    
    translateX.value += deltaX / zoom.value
    translateY.value += deltaY / zoom.value
    
    lastX.value = event.touches[0].clientX
    lastY.value = event.touches[0].clientY
  }
}

const handleTouchEnd = () => {
  isPanning.value = false
  lastTouchDistance = 0
  
  if (zoom.value <= 1) {
    translateX.value = 0
    translateY.value = 0
  }
}

const handleImageLoad = () => {
  loading.value = false
  error.value = false
}

const handleImageError = () => {
  loading.value = false
  error.value = true
}

// Reset cuando cambia la imagen
watch(() => props.imageSrc, () => {
  resetZoom()
  loading.value = true
  error.value = false
})
</script>

<style scoped>
.image-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}

.viewer-image {
  max-width: 100%;
  max-height: 100%;
  user-select: none;
}

.viewer-image:active {
  cursor: grabbing !important;
}

.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.zoom-indicator {
  background: white;
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

.navigation-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
  z-index: 10;
}

.navigation-controls .v-btn {
  pointer-events: all;
  opacity: 0.8;
}

.navigation-controls .v-btn:hover {
  opacity: 1;
}

.image-counter {
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

.image-description {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 100px;
  z-index: 10;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

@media (max-width: 960px) {
  .image-description {
    left: 10px;
    right: 10px;
    bottom: 80px;
  }
}
</style>