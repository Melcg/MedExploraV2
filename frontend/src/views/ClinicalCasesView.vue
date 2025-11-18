<template>
  <div class="clinical-cases-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-h4 mb-2">
            <v-icon icon="mdi-clipboard-text" class="mr-2" />
            Casos Clínicos
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Practica con casos simulados para mejorar tus habilidades diagnósticas
          </p>
        </div>

        <!-- Estadísticas -->
        <v-row class="mb-6">
          <v-col cols="6" sm="3">
            <v-card variant="tonal" color="primary">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ clinicalCases.length }}</div>
                <div class="text-caption">Total casos</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card variant="tonal" color="success">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ completedCases.length }}</div>
                <div class="text-caption">Completados</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card variant="tonal" color="warning">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ pendingCases }}</div>
                <div class="text-caption">Pendientes</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" sm="3">
            <v-card variant="tonal" color="amber">
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold">{{ totalScore }}</div>
                <div class="text-caption">Puntos totales</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Filtros -->
        <v-card elevation="2" class="mb-6">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedDifficulty"
                  :items="difficultyOptions"
                  label="Dificultad"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedCategory"
                  :items="categoryOptions"
                  label="Categoría"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Lista de casos -->
        <v-row>
          <v-col
            v-for="clinicalCase in filteredCases"
            :key="clinicalCase.id"
            cols="12"
            md="6"
            lg="4"
          >
            <CaseCard
              :clinical-case="clinicalCase"
              @select="selectCase"
            />
          </v-col>
        </v-row>

        <!-- Estado vacío -->
        <EmptyState
          v-if="filteredCases.length === 0"
          icon="mdi-clipboard-off"
          icon-color="grey"
          title="Sin casos disponibles"
          message="No hay casos clínicos que coincidan con los filtros seleccionados."
          action-text="Limpiar filtros"
          @action="clearFilters"
        />
      </v-container>
    </v-main>

    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import CaseCard from '@/components/cases/CaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { clinicalCases, getCompletedCases, getTotalScore } from '@/data/clinicalCases'

const router = useRouter()

const selectedDifficulty = ref(null)
const selectedCategory = ref(null)

const difficultyOptions = [
  { title: 'Básico', value: 'basic' },
  { title: 'Intermedio', value: 'intermediate' },
  { title: 'Avanzado', value: 'advanced' },
]

const categoryOptions = computed(() => {
  const categories = [...new Set(clinicalCases.map(c => c.category))]
  return categories.map(cat => ({ title: cat, value: cat }))
})

const completedCases = computed(() => getCompletedCases())
const pendingCases = computed(() => clinicalCases.length - completedCases.value.length)
const totalScore = computed(() => getTotalScore())

const filteredCases = computed(() => {
  let cases = clinicalCases

  if (selectedDifficulty.value) {
    cases = cases.filter(c => c.difficulty === selectedDifficulty.value)
  }

  if (selectedCategory.value) {
    cases = cases.filter(c => c.category === selectedCategory.value)
  }

  return cases
})

const selectCase = (clinicalCase) => {
  router.push({
    name: 'CaseDetail',
    params: { caseId: clinicalCase.id }
  })
}

const clearFilters = () => {
  selectedDifficulty.value = null
  selectedCategory.value = null
}
</script>

<style scoped>
.clinical-cases-view {
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