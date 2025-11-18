<template>
  <div class="search-results">
    <!-- Resultados -->
    <v-list v-if="results.length" class="bg-transparent">
      <v-list-item
        v-for="result in results"
        :key="`${result.type}-${result.id}`"
        :prepend-icon="result.icon"
        :title="result.title"
        :subtitle="result.description"
        class="result-item mb-2"
        @click="handleSelect(result)"
      >
        <template v-slot:prepend>
          <v-avatar :color="result.color || 'primary'">
            <v-icon :icon="result.icon" />
          </v-avatar>
        </template>

        <template v-slot:append>
          <!-- Tipo de resultado -->
          <v-chip
            size="small"
            :color="getTypeColor(result.type)"
            variant="tonal"
            class="mr-2"
          >
            {{ getTypeLabel(result.type) }}
          </v-chip>
          <v-icon icon="mdi-chevron-right" />
        </template>
      </v-list-item>
    </v-list>

    <!-- Sin resultados -->
    <EmptyState
      v-else-if="query"
      icon="mdi-magnify"
      icon-color="grey"
      title="Sin resultados"
      :message="`No se encontraron resultados para '${query}'`"
    />

    <!-- Instrucciones iniciales -->
    <EmptyState
      v-else
      icon="mdi-text-search"
      icon-color="primary"
      title="Buscar en MedExplora"
      message="Escribe para buscar regiones anatómicas, técnicas de exploración, sistemas o términos del glosario."
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import EmptyState from '@/components/common/EmptyState.vue'

const props = defineProps({
  results: {
    type: Array,
    default: () => []
  },
  query: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select'])

const router = useRouter()

const getTypeLabel = (type) => {
  const labels = {
    region: 'Región',
    system: 'Sistema',
    technique: 'Técnica',
    glossary: 'Glosario'
  }
  return labels[type] || type
}

const getTypeColor = (type) => {
  const colors = {
    region: 'blue',
    system: 'green',
    technique: 'purple',
    glossary: 'orange'
  }
  return colors[type] || 'grey'
}

const handleSelect = (result) => {
  emit('select', result)
  
  if (result.route) {
    router.push(result.route)
  } else if (result.type === 'glossary') {
    // Emitir evento para mostrar detalles del término
    emit('show-term', result.id)
  }
}
</script>

<style scoped>
.search-results {
  min-height: 300px;
}

.result-item {
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>