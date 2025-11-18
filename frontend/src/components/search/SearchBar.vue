<template>
  <v-text-field
    :model-value="modelValue"
    :loading="loading"
    variant="outlined"
    density="comfortable"
    placeholder="Buscar regiones, técnicas, términos..."
    prepend-inner-icon="mdi-magnify"
    clearable
    hide-details
    class="search-bar"
    @update:model-value="$emit('update:modelValue', $event)"
    @click:clear="$emit('clear')"
    @keyup.enter="$emit('search')"
  >
    <template v-slot:append-inner>
      <v-fade-transition>
        <v-chip
          v-if="resultCount > 0"
          size="small"
          color="primary"
          class="mr-2"
        >
          {{ resultCount }} resultado{{ resultCount !== 1 ? 's' : '' }}
        </v-chip>
      </v-fade-transition>
    </template>
  </v-text-field>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  resultCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['update:modelValue', 'clear', 'search'])
</script>

<style scoped>
.search-bar {
  background: white;
  border-radius: 12px;
}
</style>