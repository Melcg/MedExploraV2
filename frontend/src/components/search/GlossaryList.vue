<template>
  <v-list class="glossary-list">
    <v-list-item
      v-for="term in terms"
      :key="term.id"
      :title="term.term"
      :subtitle="truncateText(term.definition, 100)"
      prepend-icon="mdi-book-alphabet"
      class="glossary-item"
      @click="$emit('select', term.id)"
    >
      <template v-slot:append>
        <v-chip size="x-small" variant="tonal">
          {{ term.category }}
        </v-chip>
      </template>
    </v-list-item>

    <EmptyState
      v-if="terms.length === 0"
      icon="mdi-book-remove"
      icon-color="grey"
      title="Sin términos"
      message="No se encontraron términos en esta categoría."
    />
  </v-list>
</template>

<script setup>
import EmptyState from '@/components/common/EmptyState.vue'

defineProps({
  terms: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style scoped>
.glossary-list {
  max-height: 600px;
  overflow-y: auto;
}

.glossary-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.glossary-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>