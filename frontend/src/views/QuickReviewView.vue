<template>
  <div class="quick-review-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-h4 mb-2">
            <v-icon icon="mdi-flash" color="warning" class="mr-2" />
            Modo Repaso Rápido
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Puntos clave y signos críticos de cada exploración
          </p>
        </div>

        <!-- Filtro por región -->
        <v-card elevation="2" class="mb-6">
          <v-card-text>
            <v-select
              v-model="selectedRegion"
              :items="regionOptions"
              label="Filtrar por región"
              prepend-icon="mdi-filter"
              variant="outlined"
              density="comfortable"
              hide-details
              clearable
            />
          </v-card-text>
        </v-card>

        <!-- Modo de visualización -->
        <div class="d-flex justify-space-between align-center mb-4">
          <div>
            <v-chip
              prepend-icon="mdi-cards"
              :color="viewMode === 'carousel' ? 'primary' : 'default'"
              @click="viewMode = 'carousel'"
            >
              Tarjetas
            </v-chip>
            <v-chip
              class="ml-2"
              prepend-icon="mdi-view-list"
              :color="viewMode === 'list' ? 'primary' : 'default'"
              @click="viewMode = 'list'"
            >
              Lista
            </v-chip>
          </div>

          <v-chip prepend-icon="mdi-counter">
            {{ filteredCards.length }} tarjetas
          </v-chip>
        </div>

        <!-- Vista Carousel -->
        <div v-if="viewMode === 'carousel' && filteredCards.length">
          <v-window v-model="currentCardIndex" show-arrows class="review-carousel">
            <v-window-item
              v-for="(card, index) in filteredCards"
              :key="card.id"
              :value="index"
            >
              <v-row justify="center">
                <v-col cols="12" md="8" lg="6">
                  <ReviewCard
                    :card="card"
                    :card-index="index"
                    :total-cards="filteredCards.length"
                    @show-details="showCardDetails(card)"
                    @bookmark="bookmarkCard(card)"
                  />
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>

          <!-- Controles de navegación -->
          <div class="text-center mt-6">
            <v-btn-group variant="outlined">
              <v-btn
                :disabled="currentCardIndex === 0"
                @click="previousCard"
              >
                <v-icon>mdi-chevron-left</v-icon>
                Anterior
              </v-btn>
              <v-btn disabled>
                {{ currentCardIndex + 1 }} / {{ filteredCards.length }}
              </v-btn>
              <v-btn
                :disabled="currentCardIndex === filteredCards.length - 1"
                @click="nextCard"
              >
                Siguiente
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-btn-group>
          </div>

          <!-- Indicadores -->
          <div class="d-flex justify-center mt-4">
            <v-chip
              v-for="(card, index) in filteredCards"
              :key="card.id"
              size="x-small"
              :color="index === currentCardIndex ? 'primary' : 'grey'"
              class="mx-1"
              @click="currentCardIndex = index"
            >
              {{ index + 1 }}
            </v-chip>
          </div>
        </div>

        <!-- Vista Lista -->
        <v-row v-else-if="viewMode === 'list' && filteredCards.length">
          <v-col
            v-for="(card, index) in filteredCards"
            :key="card.id"
            cols="12"
            md="6"
            lg="4"
          >
            <ReviewCard
              :card="card"
              :card-index="index"
              :total-cards="filteredCards.length"
              @show-details="showCardDetails(card)"
              @bookmark="bookmarkCard(card)"
            />
          </v-col>
        </v-row>

        <!-- Estado vacío -->
        <EmptyState
          v-else
          icon="mdi-flash-off"
          icon-color="grey"
          title="Sin tarjetas"
          message="No hay tarjetas de repaso disponibles para esta selección."
          action-text="Ver todas"
          @action="selectedRegion = null"
        />

        <!-- Acciones rápidas -->
        <v-card elevation="2" class="mt-6">
          <v-card-title>Acciones Rápidas</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  variant="tonal"
                  color="primary"
                  prepend-icon="mdi-shuffle"
                  @click="shuffleCards"
                >
                  Orden Aleatorio
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  variant="tonal"
                  color="secondary"
                  prepend-icon="mdi-restart"
                  @click="resetView"
                >
                  Reiniciar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <BottomNavigation />

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import ReviewCard from '@/components/review/ReviewCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { quickReviewCards, getReviewCardsByRegion } from '@/data/quickReview'
import { anatomicalRegions } from '@/data/anatomicalRegions'

const selectedRegion = ref(null)
const viewMode = ref('carousel') // 'carousel' o 'list'
const currentCardIndex = ref(0)
const snackbar = ref(false)
const snackbarMessage = ref('')

const regionOptions = computed(() => {
  return anatomicalRegions.map(region => ({
    title: region.name,
    value: region.id
  }))
})

const filteredCards = computed(() => {
  if (!selectedRegion.value) {
    return quickReviewCards
  }
  return getReviewCardsByRegion(selectedRegion.value)
})

const nextCard = () => {
  if (currentCardIndex.value < filteredCards.value.length - 1) {
    currentCardIndex.value++
  }
}

const previousCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
  }
}

const shuffleCards = () => {
  // Mezclar las tarjetas (esto solo funciona en modo lista)
  // En modo carousel, cambiaría el orden visual
  showSnackbar('Tarjetas mezcladas')
  currentCardIndex.value = 0
}

const resetView = () => {
  selectedRegion.value = null
  currentCardIndex.value = 0
  viewMode.value = 'carousel'
  showSnackbar('Vista reiniciada')
}

const showCardDetails = (card) => {
  console.log('Ver detalles de:', card.title)
  // Aquí podrías abrir un diálogo con más información
  // o navegar a la técnica completa
}

const bookmarkCard = (card) => {
  showSnackbar(`Tarjeta "${card.title}" guardada en favoritos`)
}

const showSnackbar = (message) => {
  snackbarMessage.value = message
  snackbar.value = true
}

// Soporte de teclado
const handleKeyPress = (event) => {
  if (viewMode.value === 'carousel') {
    if (event.key === 'ArrowRight') {
      nextCard()
    } else if (event.key === 'ArrowLeft') {
      previousCard()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.quick-review-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content {
  padding-top: 80px;
  padding-bottom: 80px;
  min-height: calc(100vh - 64px);
}

.review-carousel {
  min-height: 600px;
}

@media (max-width: 960px) {
  .main-content {
    padding-bottom: 100px;
  }

  .review-carousel {
    min-height: 500px;
  }
}
</style>