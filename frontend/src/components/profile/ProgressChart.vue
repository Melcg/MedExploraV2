<template>
  <v-card elevation="2">
    <v-card-title>Progreso General</v-card-title>
    <v-divider />
    <v-card-text>
      <!-- Nivel y porcentaje -->
      <div class="text-center mb-6">
        <v-avatar :color="levelColor" size="100" class="mb-3">
          <span class="text-h4 font-weight-bold">{{ level.level }}</span>
        </v-avatar>
        <h3 class="text-h5 mb-1">Nivel {{ level.level }} - {{ level.name }}</h3>
        <v-progress-linear
          :model-value="progressPercentage"
          :color="levelColor"
          height="20"
          rounded
          class="mt-3"
        >
          <template v-slot:default>
            <strong>{{ progressPercentage }}%</strong>
          </template>
        </v-progress-linear>
      </div>

      <!-- Barras de progreso por categoría -->
      <div v-for="(item, index) in progressItems" :key="index" class="mb-4">
        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex align-center">
            <v-icon :icon="item.icon" :color="item.color" class="mr-2" />
            <span class="text-body-2">{{ item.label }}</span>
          </div>
          <span class="text-caption">{{ Math.round(item.value) }}%</span>
        </div>
        <v-progress-linear
          :model-value="item.value"
          :color="item.color"
          height="8"
          rounded
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progressPercentage: {
    type: Number,
    required: true
  },
  level: {
    type: Object,
    required: true
  },
  progressData: {
    type: Object,
    required: true
  }
})

const levelColor = computed(() => {
  const level = props.level.level
  if (level >= 5) return 'purple'
  if (level >= 4) return 'primary'
  if (level >= 3) return 'success'
  if (level >= 2) return 'warning'
  return 'grey'
})

const progressItems = computed(() => [
  {
    label: props.progressData.labels[0],
    value: props.progressData.values[0],
    icon: 'mdi-human',
    color: 'blue'
  },
  {
    label: props.progressData.labels[1],
    value: props.progressData.values[1],
    icon: 'mdi-clipboard-text',
    color: 'green'
  },
  {
    label: props.progressData.labels[2],
    value: props.progressData.values[2],
    icon: 'mdi-checkbox-marked',
    color: 'orange'
  }
])
</script>