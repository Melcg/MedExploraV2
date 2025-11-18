<template>
  <div class="search-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-h4 mb-4">
            <v-icon icon="mdi-magnify" class="mr-2" />
            Búsqueda
          </h1>

          <!-- Barra de búsqueda -->
          <SearchBar
            v-model="query"
            :loading="isSearching"
            :result-count="resultCount"
            @clear="clearSearch"
          />

          <!-- Filtros -->
          <div class="mt-4">
            <v-chip-group
              v-model="selectedFilters"
              multiple
              column
            >
              <v-chip
                v-for="type in contentTypes"
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
        </div>

        <!-- Resultados -->
        <SearchResults
          :results="allResults"
          :query="query"
          @select="handleSelect"
          @show-term="showTermDetail"
        />

        <!-- Glosario completo (si no hay búsqueda) -->
        <div v-if="!query && showGlossary" class="mt-6">
          <v-card elevation="2">
            <v-card-title class="d-flex align-center justify-space-between">
              <span>
                <v-icon icon="mdi-book-alphabet" class="mr-2" />
                Glosario Médico
              </span>
              <v-btn
                icon="mdi-close"
                variant="text"
                size="small"
                @click="showGlossary = false"
              />
            </v-card-title>
            <v-divider />
            <v-card-text>
              <!-- Categorías -->
              <v-tabs v-model="selectedCategory" class="mb-4">
                <v-tab value="all">Todos</v-tab>
                <v-tab
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </v-tab>
              </v-tabs>

              <!-- Lista de términos -->
              <GlossaryList
                :terms="filteredGlossaryTerms"
                @select="showTermDetail"
              />
            </v-card-text>
          </v-card>
        </div>

        <!-- Botón para mostrar glosario -->
        <div v-if="!query && !showGlossary" class="text-center mt-6">
          <v-btn
            color="primary"
            variant="tonal"
            size="large"
            prepend-icon="mdi-book-open-variant"
            @click="showGlossary = true"
          >
            Ver Glosario Completo
          </v-btn>
        </div>
      </v-container>
    </v-main>

    <BottomNavigation />

    <!-- Dialog de término del glosario -->
    <GlossaryTerm
      v-model:show="showTermDialog"
      :term="selectedTerm"
      @select-term="showTermDetail"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import SearchResults from '@/components/search/SearchResults.vue'
import GlossaryTerm from '@/components/search/GlossaryTerm.vue'
import GlossaryList from '@/components/search/GlossaryList.vue'
import { useSearch } from '@/composables/useSearch'
import { getTermById, getCategories, getTermsByCategory, glossaryTerms } from '@/data/glossary'

const {
  query,
  selectedFilters,
  isSearching,
  contentTypes,
  allResults,
  resultCount,
  clearSearch,
} = useSearch()

const showGlossary = ref(false)
const showTermDialog = ref(false)
const selectedTerm = ref(null)
const selectedCategory = ref('all')

const categories = computed(() => getCategories())

const filteredGlossaryTerms = computed(() => {
  if (selectedCategory.value === 'all') {
    return glossaryTerms
  }
  return getTermsByCategory(selectedCategory.value)
})

const handleSelect = (result) => {
  console.log('Resultado seleccionado:', result)
}

const showTermDetail = (termId) => {
  const term = getTermById(termId)
  if (term) {
    selectedTerm.value = term
    showTermDialog.value = true
  }
}

// Watch query para ocultar glosario cuando se busca
watch(query, (newQuery) => {
  if (newQuery) {
    showGlossary.value = false
  }
})
</script>

<style scoped>
.search-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.main-content {
  padding-top: 80px;
  padding-bottom: 80px;
  min-height: calc(100vh - 64px);
}

@media (max-width: 960px) {
  .main-content {
    padding-bottom: 100px;
  }
}
</style>