// src/composables/use3DControls.js
import { ref } from 'vue'

export function use3DControls() {
  const rotation = ref({ x: 0, y: 0 })
  const zoom = ref(1)
  const position = ref({ x: 0, y: 0 })
  
  const isDragging = ref(false)
  const lastMousePosition = ref({ x: 0, y: 0 })

  // Límites de zoom
  const MIN_ZOOM = 0.5
  const MAX_ZOOM = 3

  // Sensibilidad
  const ROTATION_SENSITIVITY = 0.005
  const ZOOM_SENSITIVITY = 0.001
  const PAN_SENSITIVITY = 0.5

  // Iniciar arrastre
  const startDrag = (event) => {
    isDragging.value = true
    lastMousePosition.value = {
      x: event.clientX || event.touches?.[0]?.clientX || 0,
      y: event.clientY || event.touches?.[0]?.clientY || 0,
    }
  }

  // Durante el arrastre (rotación)
  const onDrag = (event) => {
    if (!isDragging.value) return

    const currentX = event.clientX || event.touches?.[0]?.clientX || 0
    const currentY = event.clientY || event.touches?.[0]?.clientY || 0

    const deltaX = currentX - lastMousePosition.value.x
    const deltaY = currentY - lastMousePosition.value.y

    // Rotar el modelo
    rotation.value.y += deltaX * ROTATION_SENSITIVITY
    rotation.value.x += deltaY * ROTATION_SENSITIVITY

    // Limitar rotación en X para evitar que se voltee completamente
    rotation.value.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.value.x))

    lastMousePosition.value = { x: currentX, y: currentY }
  }

  // Terminar arrastre
  const endDrag = () => {
    isDragging.value = false
  }

  // Zoom con rueda del mouse
  const onWheel = (event) => {
    event.preventDefault()
    
    const delta = event.deltaY * ZOOM_SENSITIVITY
    zoom.value = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom.value - delta))
  }

  // Zoom con pinch (móvil)
  const onPinch = (scale) => {
    zoom.value = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom.value * scale))
  }

  // Pan (arrastre con shift o dos dedos)
  const onPan = (event, shiftKey = false) => {
    if (!shiftKey && !isDragging.value) return

    const currentX = event.clientX || event.touches?.[0]?.clientX || 0
    const currentY = event.clientY || event.touches?.[0]?.clientY || 0

    const deltaX = currentX - lastMousePosition.value.x
    const deltaY = currentY - lastMousePosition.value.y

    position.value.x += deltaX * PAN_SENSITIVITY
    position.value.y -= deltaY * PAN_SENSITIVITY

    lastMousePosition.value = { x: currentX, y: currentY }
  }

  // Resetear vista
  const resetView = () => {
    rotation.value = { x: 0, y: 0 }
    zoom.value = 1
    position.value = { x: 0, y: 0 }
  }

  // Zoom in/out con botones
  const zoomIn = () => {
    zoom.value = Math.min(MAX_ZOOM, zoom.value + 0.2)
  }

  const zoomOut = () => {
    zoom.value = Math.max(MIN_ZOOM, zoom.value - 0.2)
  }

  // Rotar a una posición específica (frontal, lateral, etc.)
  const rotateToView = (view) => {
    switch (view) {
      case 'front':
        rotation.value = { x: 0, y: 0 }
        break
      case 'back':
        rotation.value = { x: 0, y: Math.PI }
        break
      case 'left':
        rotation.value = { x: 0, y: -Math.PI / 2 }
        break
      case 'right':
        rotation.value = { x: 0, y: Math.PI / 2 }
        break
    }
  }

  return {
    rotation,
    zoom,
    position,
    isDragging,
    startDrag,
    onDrag,
    endDrag,
    onWheel,
    onPinch,
    onPan,
    resetView,
    zoomIn,
    zoomOut,
    rotateToView,
  }
}