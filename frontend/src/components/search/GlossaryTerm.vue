<template>
  <v-dialog
    :model-value="show"
    max-width="600"
    @update:model-value="$emit('update:show', $event)"
  >
    <v-card v-if="term">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-book-alphabet" color="orange" class="mr-2" />
        {{ term.term }}
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="$emit('update:show', false)"
        />
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <!-- Categoría -->
        <v-chip
          size="small"
          color="orange"
          variant="tonal"
          prepend-icon="mdi-tag"
          class="mb-4"
        >
          {{ term.category }}
        </v-chip>

        <!-- Definición -->
        <div class="mb-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Definición</h4>
          <p class="text-body-1">{{ term.definition }}</p>
        </div>

        <!-- Términos relacionados -->
        <div v-if="relatedTerms.length" class="mt-4">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">
            Términos relacionados
          </h4>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="related in relatedTerms"
              :key="related.id"
              size="small"
              variant="outlined"
              @click="$emit('select-term', related.id)"
            >
              {{ related.term }}
            </v-chip>
          </div>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="$emit('update:show', false)"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { getRelatedTerms } from '@/data/glossary'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  term: {
    type: Object,
    default: null
  }
})

defineEmits(['update:show', 'select-term'])

const relatedTerms = computed(() => {
  if (!props.term) return []
  return getRelatedTerms(props.term.id)
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>