<template>
  <div 
    ref="containerRef" 
    class="anatomical-model-container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Canvas de Three.js -->
    <canvas ref="canvasRef"></canvas>

    <!-- Loading -->
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      />
      <p class="mt-4">Cargando modelo 3D...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="error-overlay">
      <v-icon icon="mdi-alert-circle" size="64" color="error" />
      <p class="mt-4">{{ error }}</p>
      <v-btn color="primary" @click="loadModel">Reintentar</v-btn>
    </div>

    <!-- Tooltip de región -->
    <v-tooltip
      v-if="hoveredRegion"
      :model-value="true"
      location="top"
      :style="tooltipStyle"
    >
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="tooltip-anchor" />
      </template>
      <div class="region-tooltip">
        <strong>{{ hoveredRegion.name }}</strong>
        <p class="text-caption mt-1">{{ hoveredRegion.description }}</p>
        <p class="text-caption mt-1">
          <v-icon icon="mdi-cursor-pointer" size="small" />
          Click para explorar
        </p>
      </div>
    </v-tooltip>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { use3DControls } from '@/composables/use3DControls'

const props = defineProps({
  gender: {
    type: String,
    default: 'male',
    validator: (value) => ['male', 'female'].includes(value)
  },
  hoveredRegion: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['region-click', 'model-loaded', 'region-hover'])

const containerRef = ref(null)
const canvasRef = ref(null)
const loading = ref(true)
const error = ref(null)
const tooltipStyle = ref({})

// Three.js objects
let scene, camera, renderer, model, raycaster, mouse
let animationFrameId

// Controles 3D
const {
  rotation,
  zoom,
  position,
  isDragging,
  startDrag,
  onDrag,
  endDrag,
  onWheel,
  zoomIn,
  zoomOut,
} = use3DControls()

// Mapa de regiones clickeables (meshes)
const regionMeshes = new Map()

// Inicializar Three.js
const initThreeJS = () => {
  if (!canvasRef.value || !containerRef.value) return

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  // Camera
  const aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(0, 1, 3)
  camera.lookAt(0, 0.8, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 5)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)

  // Raycaster para detectar clicks
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // Cargar modelo
  loadModel()
}

// Cargar modelo GLB
const loadModel = () => {
  loading.value = true
  error.value = null

  const loader = new GLTFLoader()
  const modelPath = `/assets/models/${props.gender}-body.glb`

  loader.load(
    modelPath,
    (gltf) => {
      // Remover modelo anterior si existe
      if (model) {
        scene.remove(model)
      }

      model = gltf.scene

      // Centrar y escalar modelo
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 1.5 / maxDim
      model.scale.multiplyScalar(scale)

      model.position.x = -center.x * scale
      model.position.y = -center.y * scale
      model.position.z = -center.z * scale

      // Configurar materiales
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Material base
          if (child.material) {
            child.material.side = THREE.DoubleSide
          }

          // Registrar meshes de regiones (por nombre)
          if (child.name && child.name.startsWith('region_')) {
            const regionId = child.name.replace('region_', '')
            regionMeshes.set(regionId, child)
          }
        }
      })

      scene.add(model)
      loading.value = false
      emit('model-loaded', model)
      animate()
    },
    (progress) => {
      // Progreso de carga
      const percent = (progress.loaded / progress.total) * 100
      console.log(`Cargando modelo: ${percent.toFixed(2)}%`)
    },
    (err) => {
      console.error('Error al cargar modelo:', err)
      error.value = 'No se pudo cargar el modelo 3D. Verifica que el archivo existe.'
      loading.value = false
    }
  )
}

// Animar
const animate = () => {
  if (!renderer || !scene || !camera) return

  animationFrameId = requestAnimationFrame(animate)

  // Aplicar transformaciones
  if (model) {
    model.rotation.x = rotation.value.x
    model.rotation.y = rotation.value.y
    
    camera.position.z = 3 / zoom.value
    camera.position.x = position.value.x * 0.01
    camera.position.y = 1 + position.value.y * 0.01
    
    camera.lookAt(0, 0.8, 0)
  }

  renderer.render(scene, camera)
}

// Manejo de eventos del mouse
const handleMouseDown = (event) => {
  startDrag(event)
  checkIntersection(event)
}

const handleMouseMove = (event) => {
  if (isDragging.value) {
    onDrag(event)
  } else {
    // Detectar hover sobre regiones
    updateMousePosition(event)
    checkHover()
  }
}

const handleMouseUp = () => {
  endDrag()
}

const handleWheel = (event) => {
  onWheel(event)
}

// Touch events
let lastTouchDistance = 0

const handleTouchStart = (event) => {
  if (event.touches.length === 1) {
    startDrag(event)
  } else if (event.touches.length === 2) {
    const dx = event.touches[0].clientX - event.touches[1].clientX
    const dy = event.touches[0].clientY - event.touches[1].clientY
    lastTouchDistance = Math.sqrt(dx * dx + dy * dy)
  }
}

const handleTouchMove = (event) => {
  event.preventDefault()
  
  if (event.touches.length === 1) {
    onDrag(event)
  } else if (event.touches.length === 2) {
    // Pinch zoom
    const dx = event.touches[0].clientX - event.touches[1].clientX
    const dy = event.touches[0].clientY - event.touches[1].clientY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (lastTouchDistance > 0) {
      const scale = distance / lastTouchDistance
      zoom.value = Math.max(0.5, Math.min(3, zoom.value * scale))
    }
    
    lastTouchDistance = distance
  }
}

const handleTouchEnd = () => {
  endDrag()
  lastTouchDistance = 0
}

// Actualizar posición del mouse en coordenadas normalizadas
const updateMousePosition = (event) => {
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

// Verificar intersección con regiones
const checkIntersection = (event) => {
  if (!model || isDragging.value) return

  updateMousePosition(event)
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(model.children, true)
  
  if (intersects.length > 0) {
    const object = intersects[0].object
    
    // Buscar si el mesh corresponde a una región
    for (const [regionId, mesh] of regionMeshes.entries()) {
      if (mesh === object || mesh.children.includes(object)) {
        emit('region-click', regionId)
        return
      }
    }
  }
}

// Verificar hover
const checkHover = () => {
  if (!model) return

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(model.children, true)
  
  if (intersects.length > 0) {
    const object = intersects[0].object
    
    for (const [regionId, mesh] of regionMeshes.entries()) {
      if (mesh === object || mesh.children.includes(object)) {
        emit('region-hover', regionId)
        
        // Posicionar tooltip
        const rect = containerRef.value.getBoundingClientRect()
        tooltipStyle.value = {
          left: `${event.clientX - rect.left}px`,
          top: `${event.clientY - rect.top - 50}px`,
        }
        return
      }
    }
  }
  
  emit('region-hover', null)
}

// Redimensionar
const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

// Limpiar
const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  if (renderer) {
    renderer.dispose()
  }

  if (model) {
    scene.remove(model)
  }

  window.removeEventListener('resize', handleResize)
}

// Watch para cambios de género
watch(() => props.gender, () => {
  loadModel()
})

// Lifecycle
onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cleanup()
})

// Exponer métodos públicos
defineExpose({
  zoomIn,
  zoomOut,
  rotation,
  zoom,
})
</script>

<style scoped>
.anatomical-model-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
}

.anatomical-model-container:active {
  cursor: grabbing;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
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
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.tooltip-anchor {
  position: absolute;
  pointer-events: none;
}

.region-tooltip {
  max-width: 250px;
}
</style>