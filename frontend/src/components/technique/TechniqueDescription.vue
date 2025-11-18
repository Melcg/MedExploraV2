<template>
  <v-card elevation="2" class="technique-description">
    <v-card-title class="d-flex align-center">
      <v-icon :icon="technique.icon" :color="techniqueColor" class="mr-2" />
      {{ technique.name }}
    </v-card-title>
    
    <v-divider />
    
    <v-card-text class="pa-6">
      <!-- Descripción general -->
      <div class="mb-6">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Descripción</h3>
        <p class="text-body-1">{{ technique.description }}</p>
      </div>

      <!-- Pasos de la técnica -->
      <div v-if="technique.steps && technique.steps.length" class="mb-6">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">
          Pasos de la exploración
        </h3>
        <v-timeline
          side="end"
          density="compact"
          class="technique-timeline"
        >
          <v-timeline-item
            v-for="(step, index) in technique.steps"
            :key="index"
            :dot-color="techniqueColor"
            size="small"
          >
            <template v-slot:opposite>
              <div class="text-caption text-medium-emphasis">
                Paso {{ index + 1 }}
              </div>
            </template>
            <div class="text-body-2">
              {{ step }}
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>

      <!-- Puntos clave -->
      <div v-if="technique.keyPoints && technique.keyPoints.length" class="mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">
          Puntos clave a recordar
        </h3>
        <v-alert
          type="info"
          variant="tonal"
          class="mb-0"
        >
          <ul class="pl-4 mb-0">
            <li v-for="(point, index) in technique.keyPoints" :key="index" class="mb-2">
              {{ point }}
            </li>
          </ul>
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { EXPLORATION_TECHNIQUES } from '@/utils/constants'

const props = defineProps({
  technique: {
    type: Object,
    required: true
  }
})

const techniqueColor = computed(() => {
  const colors = {
    [EXPLORATION_TECHNIQUES.INSPECCION]: 'blue',
    [EXPLORATION_TECHNIQUES.PALPACION]: 'green',
    [EXPLORATION_TECHNIQUES.PERCUSION]: 'orange',
    [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'purple',
    [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'teal',
  }
  return colors[props.technique.techniqueType] || 'primary'
})
</script>

<style scoped>
.technique-description {
  overflow: hidden;
}

.technique-timeline {
  padding-left: 0;
}

.technique-timeline :deep(.v-timeline-item__body) {
  padding-bottom: 24px;
}
</style>