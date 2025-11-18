<template>
  <canvas
    ref="canvasRef"
    class="waveform-canvas"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  isPlaying: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: 'purple'
  }
})

const canvasRef = ref(null)
let ctx = null
let animationId = null
let bars = []

const COLORS = {
  purple: '#9C27B0',
  blue: '#2196F3',
  green: '#4CAF50',
  red: '#F44336',
  orange: '#FF9800',
}

// Inicializar canvas
const initCanvas = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const parent = canvas.parentElement

  // Ajustar tamaño al contenedor
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight

  ctx = canvas.getContext('2d')

  // Generar barras aleatorias (simulación de onda)
  const barCount = Math.floor(canvas.width / 6)
  bars = Array.from({ length: barCount }, () => ({
    height: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.02 + 0.01,
    offset: Math.random() * Math.PI * 2,
  }))

  draw()
}

// Dibujar forma de onda
const draw = () => {
  if (!ctx || !canvasRef.value) return

  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height
  const barWidth = 4
  const gap = 2
  const totalWidth = barWidth + gap

  // Limpiar canvas
  ctx.clearRect(0, 0, width, height)

  // Color base
  const baseColor = COLORS[props.color] || props.color

  bars.forEach((bar, index) => {
    const x = index * totalWidth
    const progressPosition = (props.progress / 100) * width

    // Animar altura si está reproduciendo
    if (props.isPlaying) {
      bar.offset += bar.speed
      bar.height = Math.abs(Math.sin(bar.offset)) * 0.6 + 0.3
    }

    const barHeight = bar.height * height * 0.8
    const y = (height - barHeight) / 2

    // Color según progreso
    if (x <= progressPosition) {
      ctx.fillStyle = baseColor
    } else {
      ctx.fillStyle = `${baseColor}40` // Con transparencia
    }

    // Dibujar barra con bordes redondeados
    ctx.beginPath()
    ctx.roundRect(x, y, barWidth, barHeight, 2)
    ctx.fill()
  })

  // Continuar animación si está reproduciendo
  if (props.isPlaying) {
    animationId = requestAnimationFrame(draw)
  }
}

// Redimensionar
const handleResize = () => {
  initCanvas()
}

// Watch para cambios en isPlaying
watch(() => props.isPlaying, (newValue) => {
  if (newValue) {
    draw()
  } else if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

// Watch para cambios en progress
watch(() => props.progress, () => {
  if (!props.isPlaying) {
    draw()
  }
})

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.waveform-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>