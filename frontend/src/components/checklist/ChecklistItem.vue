<template>
  <v-card
    class="checklist-item mb-3"
    :class="{ 'item-completed': item.completed }"
    elevation="1"
  >
    <v-card-text class="pa-4">
      <div class="d-flex align-start">
        <!-- Checkbox -->
        <v-checkbox
          :model-value="item.completed"
          color="success"
          hide-details
          class="mr-3 flex-shrink-0"
          @update:model-value="$emit('toggle', item.id)"
        />

        <!-- Contenido -->
        <div class="flex-grow-1">
          <p
            class="text-body-1 mb-2"
            :class="{ 'text-decoration-line-through text-medium-emphasis': item.completed }"
          >
            {{ item.text }}
          </p>

          <!-- Tiempo de completado -->
          <div v-if="item.completed && item.completedAt" class="d-flex align-center mb-2">
            <v-icon icon="mdi-check-circle" color="success" size="small" class="mr-1" />
            <span class="text-caption text-success">
              Completado {{ formatCompletedTime(item.completedAt) }}
            </span>
          </div>

          <!-- Campo de notas -->
          <v-expand-transition>
            <div v-if="showNotes">
              <v-textarea
                :model-value="item.notes"
                label="Notas u observaciones"
                variant="outlined"
                density="compact"
                rows="2"
                auto-grow
                hide-details
                class="mt-2"
                @update:model-value="$emit('update-note', item.id, $event)"
              />
            </div>
          </v-expand-transition>

          <!-- Botón de notas -->
          <v-btn
            size="small"
            variant="text"
            :prepend-icon="showNotes ? 'mdi-chevron-up' : 'mdi-note-plus'"
            class="mt-2"
            @click="showNotes = !showNotes"
          >
            {{ showNotes ? 'Ocultar' : 'Agregar' }} notas
            <v-badge
              v-if="item.notes && !showNotes"
              color="primary"
              dot
              inline
            />
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'update-note'])

const showNotes = ref(false)

const formatCompletedTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.round(diffMs / 1000 / 60)

  if (diffMins < 1) return 'hace un momento'
  if (diffMins < 60) return `hace ${diffMins} min`
  
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `hace ${diffHours}h`
  
  const diffDays = Math.floor(diffHours / 24)
  return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
}
</script>

<style scoped>
.checklist-item {
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.checklist-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.item-completed {
  border-left-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.05);
}
</style>