<template>
  <div class="home-view">
    <AppBar />
    
    <v-main class="main-content">
      <!-- Selector de género -->
      <GenderSelector v-model="selectedGender" />

      <!-- Modelo 3D -->
      <div class="model-wrapper">
        <AnatomicalModel
          ref="modelRef"
          :gender="selectedGender"
          :hovered-region="hoveredRegion"
          @region-click="handleRegionClick"
          @region-hover="handleRegionHover"
          @model-loaded="handleModelLoaded"
        />
      </div>

      <!-- Controles de zoom -->
      <ZoomControls
        :zoom="modelZoom"
        @zoom-in="zoomIn"
        @zoom-out="zoomOut"
        @reset="resetView"
      />

      <!-- Lista de regiones (opcional, acceso rápido) -->
      <v-card
        v-if="showRegionsList"
        class="regions-list-card"
        elevation="4"
      >
        <v-card-title class="d-flex align-center justify-space-between">
          <span>Regiones Anatómicas</span>
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click="showRegionsList = false"
          />
        </v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="region in orderedRegions"
              :key="region.id"
              :title="region.name"
              :subtitle="region.description"
              :prepend-icon="region.icon"
              @click="navigateToRegion(region.id)"
            >
              <template v-slot:append>
                <v-icon icon="mdi-chevron-right" />
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <!-- Botón para mostrar lista -->
      <v-btn
        v-else
        icon="mdi-format-list-bulleted"
        color="primary"
        size="large"
        elevation="4"
        class="regions-list-toggle"
        @click="showRegionsList = true"
      />

      <!-- Instrucciones -->
      <v-card
        v-if="showInstructions"
        class="instructions-card"
        elevation="4"
      >
        <v-card-text class="pa-4">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-information" color="primary" class="mr-2" />
            <strong>Cómo usar:</strong>
          </div>
          <ul class="text-caption">
            <li>Arrastra para rotar el modelo</li>
            <li>Rueda del mouse o pellizca para zoom</li>
            <li>Haz clic en una región para explorar</li>
          </ul>
          <v-btn
            size="small"
            variant="text"
            @click="showInstructions = false"
            class="mt-2"
          >
            Entendido
          </v-btn>
        </v-card-text>
      </v-card>

      <!-- Snackbar de éxito -->
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        color="success"
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </v-main>

    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import AnatomicalModel from '@/components/anatomical/AnatomicalModel.vue'
import ZoomControls from '@/components/anatomical/ZoomControls.vue'
import GenderSelector from '@/components/anatomical/GenderSelector.vue'
import { useAnatomicalNavigation } from '@/composables/useAnatomicalNavigation'
import { getOrderedRegions } from '@/data/anatomicalRegions'

const {
  selectedGender,
  hoveredRegion,
  navigateToRegion,
  onRegionHover,
  toggleGender,
} = useAnatomicalNavigation()

const modelRef = ref(null)
const modelZoom = ref(1)
const showRegionsList = ref(false)
const showInstructions = ref(true)
const snackbar = ref(false)
const snackbarMessage = ref('')

const orderedRegions = computed(() => getOrderedRegions())

const handleRegionClick = (regionId) => {
  console.log('Región clickeada:', regionId)
  navigateToRegion(regionId)
}

const handleRegionHover = (regionId) => {
  onRegionHover(regionId)
}

const handleModelLoaded = (model) => {
  console.log('Modelo cargado:', model)
  snackbarMessage.value = 'Modelo 3D cargado correctamente'
  snackbar.value = true
}

const zoomIn = () => {
  if (modelRef.value) {
    modelRef.value.zoomIn()
    modelZoom.value = modelRef.value.zoom
  }
}

const zoomOut = () => {
  if (modelRef.value) {
    modelRef.value.zoomOut()
    modelZoom.value = modelRef.value.zoom
  }
}

const resetView = () => {
  if (modelRef.value) {
    modelRef.value.rotation = { x: 0, y: 0 }
    modelRef.value.zoom = 1
    modelZoom.value = 1
  }
}

onMounted(() => {
  // Ocultar instrucciones después de 10 segundos
  setTimeout(() => {
    showInstructions.value = false
  }, 10000)
})
</script>

<style scoped>
.home-view {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  padding-top: 64px;
  height: calc(100vh - 64px);
  position: relative;
}

.model-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.regions-list-card {
  position: fixed;
  top: 80px;
  left: 20px;
  width: 300px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  z-index: 100;
}

.regions-list-toggle {
  position: fixed;
  top: 140px;
  left: 20px;
  z-index: 100;
}

.instructions-card {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  z-index: 100;
}

@media (max-width: 960px) {
  .main-content {
    padding-bottom: 56px;
    height: calc(100vh - 64px - 56px);
  }

  .regions-list-card {
    top: 70px;
    left: 10px;
    right: 10px;
    width: auto;
  }

  .regions-list-toggle {
    top: 130px;
    left: 10px;
  }

  .instructions-card {
    bottom: 120px;
    left: 10px;
    right: 10px;
    max-width: none;
    transform: none;
  }
}
</style>