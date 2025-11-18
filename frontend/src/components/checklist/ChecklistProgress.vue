<template>
  <v-card class="checklist-progress" elevation="2">
    <v-card-text class="pa-4">
      <!-- Header -->
      <div class="d-flex align-center justify-space-between mb-3">
        <div>
          <h3 class="text-h6">Progreso de Checklist</h3>
          <p class="text-caption text-medium-emphasis mb-0">
            {{ completedItems }} de {{ totalItems }} completados
          </p>
        </div>
        <v-avatar :color="progressColor" size="56">
          <span class="text-h6 font-weight-bold">{{ progress }}%</span>
        </v-avatar>
      </div>

      <!-- Barra de progreso -->
      <v-progress-linear
        :model-value="progress"
        :color="progressColor"
        height="12"
        rounded
        class="mb-3"
      >
        <template v-slot:default>
          <span class="text-caption font-weight-bold">{{ progress }}%</span>
        </template>
      </v-progress-linear>

      <!-- Estadísticas adicionales -->
      <v-row dense>
        <v-col cols="6">
          <div class="stat-box">
            <v-icon icon="mdi-clock-outline" size="small" class="mr-1" />
            <span class="text-caption">{{ elapsedTime }}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="stat-box">
            <v-icon
              :icon="progress === 100 ? 'mdi-check-circle' : 'mdi-progress-check'"
              :color="progress === 100 ? 'success' : 'primary'"
              size="small"
              class="mr-1"
            />
            <span class="text-caption">
              {{ progress === 100 ? 'Completada' : 'En progreso' }}
            </span>
          </div>
        </v-col>
      </v-row>

      <!-- Botones de acción -->
      <div class="d-flex gap-2 mt-4">
        <v-btn
          v-if="progress < 100"
          variant="outlined"
          size="small"
          prepend-icon="mdi-refresh"
          @click="$emit('reset')"
        >
          Reiniciar
        </v-btn>
        <v-btn
          v-if="progress === 100"
          color="success"
          size="small"
          prepend-icon="mdi-check-all"
          block
          @click="$emit('complete')"
        >
          Finalizar Checklist
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  completedItems: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  elapsedTime: {
    type: String,
    default: '0 min'
  }
})

defineEmits(['reset', 'complete'])

const progressColor = computed(() => {
  if (props.progress === 100) return 'success'
  if (props.progress >= 50) return 'primary'
  return 'warning'
})
</script>

<style scoped>
.checklist-progress {
  position: sticky;
  top: 80px;
  z-index: 10;
}

.stat-box {
  display: flex;
  align-items: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
}

.gap-2 {
  gap: 8px;
}
</style>