<template>
  <v-list class="technique-list">
    <v-list-item
      v-for="technique in techniques"
      :key="technique.id"
      :prepend-icon="technique.icon"
      :title="technique.name"
      :subtitle="technique.description"
      class="technique-item"
      @click="$emit('select', technique)"
    >
      <!-- Chip con tipo de técnica -->
      <template v-slot:append>
        <v-chip
          size="small"
          :color="getTechniqueColor(technique.techniqueType)"
          variant="tonal"
          class="mr-2"
        >
          {{ getTechniqueLabel(technique.techniqueType) }}
        </v-chip>
        <v-icon icon="mdi-chevron-right" />
      </template>
    </v-list-item>

    <!-- Estado vacío -->
    <v-list-item v-if="techniques.length === 0">
      <v-list-item-title class="text-center text-medium-emphasis">
        No hay técnicas disponibles para este sistema
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { EXPLORATION_TECHNIQUES } from '@/utils/constants'

defineProps({
  techniques: {
    type: Array,
    required: true
  }
})

defineEmits(['select'])

const getTechniqueColor = (type) => {
  const colors = {
    [EXPLORATION_TECHNIQUES.INSPECCION]: 'blue',
    [EXPLORATION_TECHNIQUES.PALPACION]: 'green',
    [EXPLORATION_TECHNIQUES.PERCUSION]: 'orange',
    [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'purple',
    [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'teal',
  }
  return colors[type] || 'grey'
}

const getTechniqueLabel = (type) => {
  const labels = {
    [EXPLORATION_TECHNIQUES.INSPECCION]: 'Inspección',
    [EXPLORATION_TECHNIQUES.PALPACION]: 'Palpación',
    [EXPLORATION_TECHNIQUES.PERCUSION]: 'Percusión',
    [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'Auscultación',
    [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'Movilidad',
  }
  return labels[type] || type
}
</script>

<style scoped>
.technique-list {
  background: transparent;
}

.technique-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.technique-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>