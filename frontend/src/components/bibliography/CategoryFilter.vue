<template>
  <v-card elevation="2">
    <v-card-title>
      <v-icon icon="mdi-filter" class="mr-2" />
      Filtros
    </v-card-title>
    <v-divider />
    <v-card-text>
      <!-- Filtro por categoría -->
      <div class="mb-4">
        <h4 class="text-subtitle-2 mb-2">Categoría</h4>
        <v-chip-group
          :model-value="selectedCategory"
          column
          @update:model-value="$emit('update:category', $event)"
        >
          <v-chip
            value="all"
            filter
            variant="outlined"
          >
            Todas
          </v-chip>
          <v-chip
            v-for="category in categories"
            :key="category"
            :value="category"
            filter
            variant="outlined"
          >
            {{ category }}
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Filtro por tipo -->
      <div class="mb-4">
        <h4 class="text-subtitle-2 mb-2">Tipo de recurso</h4>
        <v-chip-group
          :model-value="selectedType"
          column
          @update:model-value="$emit('update:type', $event)"
        >
          <v-chip value="all" filter variant="outlined">
            Todos
          </v-chip>
          <v-chip
            v-for="type in types"
            :key="type.value"
            :value="type.value"
            :prepend-icon="type.icon"
            filter
            variant="outlined"
          >
            {{ type.label }}
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Filtro por relevancia -->
      <div>
        <h4 class="text-subtitle-2 mb-2">Relevancia</h4>
        <v-chip-group
          :model-value="selectedRelevance"
          column
          @update:model-value="$emit('update:relevance', $event)"
        >
          <v-chip value="all" filter variant="outlined">
            Todas
          </v-chip>
          <v-chip value="high" filter variant="outlined" color="error">
            Alta
          </v-chip>
          <v-chip value="medium" filter variant="outlined" color="warning">
            Media
          </v-chip>
          <v-chip value="low" filter variant="outlined" color="info">
            Baja
          </v-chip>
        </v-chip-group>
      </div>

      <!-- Botón limpiar -->
      <v-btn
        block
        variant="text"
        prepend-icon="mdi-filter-off"
        class="mt-4"
        @click="$emit('clear')"
      >
        Limpiar filtros
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: String,
    default: 'all'
  },
  selectedType: {
    type: String,
    default: 'all'
  },
  selectedRelevance: {
    type: String,
    default: 'all'
  }
})

defineEmits(['update:category', 'update:type', 'update:relevance', 'clear'])

const types = [
  { value: 'book', label: 'Libros', icon: 'mdi-book' },
  { value: 'article', label: 'Artículos', icon: 'mdi-file-document' },
  { value: 'guideline', label: 'Guías', icon: 'mdi-clipboard-text' },
  { value: 'multimedia', label: 'Multimedia', icon: 'mdi-video' },
  { value: 'app', label: 'Apps', icon: 'mdi-cellphone' },
]
</script>