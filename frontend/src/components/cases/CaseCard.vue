<template>
  <v-card
    class="case-card"
    elevation="2"
    @click="$emit('select', clinicalCase)"
  >
    <v-card-text class="pa-4">
      <!-- Header -->
      <div class="d-flex align-center mb-3">
        <v-chip
          :color="getDifficultyColor(clinicalCase.difficulty)"
          size="small"
          prepend-icon="mdi-chart-line"
        >
          {{ getDifficultyLabel(clinicalCase.difficulty) }}
        </v-chip>
        <v-spacer />
        <v-chip
          v-if="clinicalCase.completed"
          size="small"
          color="success"
          prepend-icon="mdi-check"
        >
          Completado
        </v-chip>
      </div>

      <!-- Título y categoría -->
      <h3 class="text-h6 mb-2">{{ clinicalCase.title }}</h3>
      <p class="text-caption text-medium-emphasis mb-3">
        <v-icon icon="mdi-tag" size="small" class="mr-1" />
        {{ clinicalCase.category }}
      </p>

      <!-- Descripción -->
      <p class="text-body-2 mb-3">{{ clinicalCase.description }}</p>

      <!-- Info del paciente -->
      <v-card variant="tonal" class="mb-3">
        <v-card-text class="pa-3">
          <div class="text-caption mb-1">
            <strong>Paciente:</strong> {{ clinicalCase.patient.gender }}, {{ clinicalCase.patient.age }} años
          </div>
          <div class="text-caption">
            <strong>Motivo:</strong> {{ clinicalCase.patient.chiefComplaint }}
          </div>
        </v-card-text>
      </v-card>

      <!-- Metadata -->
      <div class="d-flex align-center justify-space-between">
        <div class="text-caption text-medium-emphasis">
          <v-icon icon="mdi-clock-outline" size="small" class="mr-1" />
          ~{{ clinicalCase.estimatedTime }} min
        </div>
        <div v-if="clinicalCase.completed" class="text-caption">
          <v-icon icon="mdi-star" size="small" color="amber" class="mr-1" />
          {{ clinicalCase.score }} puntos
        </div>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        variant="text"
        :prepend-icon="clinicalCase.completed ? 'mdi-replay' : 'mdi-play'"
        @click.stop="$emit('select', clinicalCase)"
      >
        {{ clinicalCase.completed ? 'Reintentar' : 'Comenzar' }}
      </v-btn>
      <v-spacer />
      <v-icon icon="mdi-chevron-right" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  clinicalCase: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const getDifficultyColor = (difficulty) => {
  const colors = {
    basic: 'success',
    intermediate: 'warning',
    advanced: 'error'
  }
  return colors[difficulty] || 'grey'
}

const getDifficultyLabel = (difficulty) => {
  const labels = {
    basic: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }
  return labels[difficulty] || difficulty
}
</script>

<style scoped>
.case-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
}
</style>