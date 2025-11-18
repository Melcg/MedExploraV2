<template>
  <div class="zoom-controls">
    <!-- Zoom In -->
    <v-btn
      icon
      size="small"
      color="primary"
      elevation="2"
      class="mb-2"
      @click="$emit('zoom-in')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Indicador de zoom -->
    <div class="zoom-indicator">
      {{ zoomPercent }}%
    </div>

    <!-- Zoom Out -->
    <v-btn
      icon
      size="small"
      color="primary"
      elevation="2"
      class="mt-2"
      @click="$emit('zoom-out')"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <!-- Reset -->
    <v-btn
      icon
      size="small"
      color="secondary"
      elevation="2"
      class="mt-4"
      @click="$emit('reset')"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  zoom: {
    type: Number,
    default: 1
  }
})

defineEmits(['zoom-in', 'zoom-out', 'reset'])

const zoomPercent = computed(() => {
  return Math.round(props.zoom * 100)
})
</script>

<style scoped>
.zoom-controls {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  gap: 4px;
}

.zoom-indicator {
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

@media (max-width: 960px) {
  .zoom-controls {
    bottom: 100px;
  }
}
</style>