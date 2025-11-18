<template>
  <v-card
    class="system-card"
    :class="{ 'card-hover': !disabled }"
    :style="{ borderLeftColor: system.color }"
    elevation="2"
    @click="handleClick"
  >
    <v-card-text class="pa-4">
      <div class="d-flex align-center">
        <!-- Icono del sistema -->
        <v-avatar
          :color="system.color"
          size="48"
          class="mr-4"
        >
          <v-icon :icon="system.icon" size="28" color="white" />
        </v-avatar>

        <!-- Información -->
        <div class="flex-grow-1">
          <h3 class="text-h6 mb-1">{{ system.name }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-0">
            {{ system.description }}
          </p>
          
          <!-- Número de técnicas disponibles -->
          <v-chip
            v-if="techniqueCount"
            size="small"
            class="mt-2"
            :color="system.color"
            variant="tonal"
          >
            <v-icon start icon="mdi-playlist-check" size="small" />
            {{ techniqueCount }} técnica{{ techniqueCount !== 1 ? 's' : '' }}
          </v-chip>
        </div>

        <!-- Flecha -->
        <v-icon
          icon="mdi-chevron-right"
          size="large"
          class="ml-2"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { getTechniquesByRegionAndSystem } from '@/data/techniques'

const props = defineProps({
  system: {
    type: Object,
    required: true
  },
  regionId: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const techniqueCount = computed(() => {
  const techniques = getTechniquesByRegionAndSystem(props.regionId, props.system.id)
  return techniques.length
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.system)
  }
}
</script>

<style scoped>
.system-card {
  border-left: 4px solid;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.system-card:active {
  transform: translateY(0);
}
</style>