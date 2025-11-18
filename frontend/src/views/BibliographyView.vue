<template>
  <div class="bibliography-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-h4 mb-2">
            <v-icon icon="mdi-book-open-page-variant" class="mr-2" />
            Bibliografía
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Referencias y recursos recomendados para el estudio de la exploración física
          </p>
        </div>

        <!-- Barra de búsqueda -->
        <v-text-field
          v-model="searchQuery"
          variant="outlined"
          density="comfortable"
          placeholder="Buscar por título, autor o tema..."
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          class="mb-6"
          @update:model-value="handleSearch"
        >
          <template v-slot:append-inner>
            <v-chip
              v-if="filteredReferences.length > 0"
              size="small"
              color="primary"
            >
              {{ filteredReferences.length }} resultado{{ filteredReferences.length !== 1 ? 's' : '' }}
            </v-chip>
          </template>
        </v-text-field>

        <v-row>
          <!-- Sidebar con filtros -->
          <v-col cols="12" md="3">
            <CategoryFilter
              :categories="categories"
              :selected-category="selectedCategory"
              :selected-type="selectedType"
              :selected-relevance="selectedRelevance"
              @update:category="selectedCategory = $event"
              @update:type="selectedType = $event"
              @update:relevance="selectedRelevance = $event"
              @clear="clearFilters"
            />

            <!-- Estadísticas -->
            <v-card elevation="2" class="mt-4">
              <v-card-title>Estadísticas</v-card-title>
              <v-divider />
              <v-card-text>
                <div class="stat-item">
                  <v-icon icon="mdi-book-multiple" color="primary" />
                  <div>
                    <div class="text-h6">{{ stats.totalBooks }}</div>
                    <div class="text-caption">Libros</div>
                  </div>
                </div>
                <v-divider class="my-2" />
                <div class="stat-item">
                  <v-icon icon="mdi-file-document" color="green" />
                  <div>
                    <div class="text-h6">{{ stats.totalArticles }}</div>
                    <div class="text-caption">Artículos</div>
                  </div>
                </div>
                <v-divider class="my-2" />
                <div class="stat-item">
                  <v-icon icon="mdi-video-box" color="purple" />
                  <div>
                    <div class="text-h6">{{ stats.totalMultimedia }}</div>
                    <div class="text-caption">Multimedia</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Lista de referencias -->
          <v-col cols="12" md="9">
            <!-- Resultados -->
            <div v-if="filteredReferences.length">
              <!-- Ordenamiento -->
              <div class="d-flex justify-end mb-4">
                <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  label="Ordenar por"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="max-width: 200px;"
                />
              </div>

              <!-- Grid de referencias -->
              <v-row>
                <v-col
                  v-for="reference in sortedReferences"
                  :key="reference.id"
                  cols="12"
                >
                  <ReferenceCard
                    :reference="reference"
                    @share="handleShare"
                    @bookmark="handleBookmark"
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Estado vacío -->
            <EmptyState
              v-else
              icon="mdi-book-off"
              icon-color="grey"
              title="Sin resultados"
              :message="searchQuery ? `No se encontraron referencias para '${searchQuery}'` : 'No hay referencias disponibles con estos filtros.'"
              action-text="Limpiar filtros"
              @action="clearAll"
            />
          </v-col>
        </v-row>

        <!-- Snackbar -->
        <v-snackbar
          v-model="snackbar"
          :timeout="2000"
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-container>
    </v-main>

    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import ReferenceCard from '@/components/bibliography/ReferenceCard.vue'
import CategoryFilter from '@/components/bibliography/CategoryFilter.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import {
  bibliographyReferences,
  getCategories,
  searchReferences,
  getReferencesByCategory,
  getReferencesByType,
  getReferencesByRelevance
} from '@/data/bibliography'

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedType = ref('all')
const selectedRelevance = ref('all')
const sortBy = ref('relevance')
const snackbar = ref(false)
const snackbarMessage = ref('')

const categories = computed(() => getCategories())

const sortOptions = [
  { title: 'Relevancia', value: 'relevance' },
  { title: 'Año (más reciente)', value: 'year-desc' },
  { title: 'Año (más antiguo)', value: 'year-asc' },
  { title: 'Título (A-Z)', value: 'title-asc' },
  { title: 'Título (Z-A)', value: 'title-desc' },
]

// Filtrar referencias
const filteredReferences = computed(() => {
  let results = bibliographyReferences

  // Búsqueda
  if (searchQuery.value) {
    results = searchReferences(searchQuery.value)
  }

  // Filtro por categoría
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    results = results.filter(ref => ref.category === selectedCategory.value)
  }

  // Filtro por tipo
  if (selectedType.value && selectedType.value !== 'all') {
    results = results.filter(ref => ref.type === selectedType.value)
  }

  // Filtro por relevancia
  if (selectedRelevance.value && selectedRelevance.value !== 'all') {
    results = results.filter(ref => ref.relevance === selectedRelevance.value)
  }

  return results
})

// Ordenar referencias
const sortedReferences = computed(() => {
  const refs = [...filteredReferences.value]

  switch (sortBy.value) {
    case 'relevance':
      return refs.sort((a, b) => {
        const relevanceOrder = { high: 0, medium: 1, low: 2 }
        return (relevanceOrder[a.relevance] || 3) - (relevanceOrder[b.relevance] || 3)
      })
    case 'year-desc':
      return refs.sort((a, b) => (b.year || 0) - (a.year || 0))
    case 'year-asc':
      return refs.sort((a, b) => (a.year || 0) - (b.year || 0))
    case 'title-asc':
      return refs.sort((a, b) => a.title.localeCompare(b.title))
    case 'title-desc':
      return refs.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return refs
  }
})

// Estadísticas
const stats = computed(() => ({
  totalBooks: bibliographyReferences.filter(ref => ref.type === 'book').length,
  totalArticles: bibliographyReferences.filter(ref => ref.type === 'article').length,
  totalMultimedia: bibliographyReferences.filter(ref => ref.type === 'multimedia').length,
}))

const handleSearch = (query) => {
  searchQuery.value = query
}

const clearFilters = () => {
  selectedCategory.value = 'all'
  selectedType.value = 'all'
  selectedRelevance.value = 'all'
}

const clearAll = () => {
  searchQuery.value = ''
  clearFilters()
}

const handleShare = (reference) => {
  if (navigator.share) {
    navigator.share({
      title: reference.title,
      text: reference.description,
      url: reference.url
    }).catch(() => {
      showSnackbar('Error al compartir')
    })
  } else {
    // Copiar al portapapeles
    const text = `${reference.title}\n${reference.url || ''}`
    navigator.clipboard.writeText(text)
    showSnackbar('Copiado al portapapeles')
  }
}

const handleBookmark = (reference) => {
  showSnackbar(`Referencia "${reference.title}" guardada en favoritos`)
}

const showSnackbar = (message) => {
  snackbarMessage.value = message
  snackbar.value = true
}
</script>

<style scoped>
.bibliography-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  padding-top: 80px;
  padding-bottom: 80px;
  min-height: calc(100vh - 64px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 960px) {
  .main-content {
    padding-bottom: 100px;
  }
}
</style>