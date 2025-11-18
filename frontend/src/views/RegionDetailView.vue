<template>
  <div class="region-detail-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Cabecera de la región -->
        <v-card class="mb-6" elevation="4">
          <v-card-text class="pa-6">
            <div class="d-flex align-center">
              <v-avatar
                :color="region?.color"
                size="80"
                class="mr-4"
              >
                <v-icon :icon="region?.icon" size="48" color="white" />
              </v-avatar>
              <div class="flex-grow-1">
                <h1 class="text-h4 mb-2">{{ region?.name }}</h1>
                <p class="text-body-1 text-medium-emphasis mb-0">
                  {{ region?.description }}
                </p>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Selector de sistema (si hay más de uno) -->
        <div v-if="availableSystems.length > 1" class="mb-6">
          <h2 class="text-h5 mb-4">Selecciona un sistema</h2>
          <v-row>
            <v-col
              v-for="system in availableSystems"
              :key="system.id"
              cols="12"
              md="6"
            >
              <SystemCard
                :system="system"
                :region-id="regionId"
                @click="selectSystem(system)"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Lista de técnicas (si solo hay un sistema o ya se seleccionó) -->
        <div v-if="selectedSystem || availableSystems.length === 1">
          <v-card elevation="2">
            <v-card-title class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-icon
                  :icon="currentSystem?.icon"
                  :color="currentSystem?.color"
                  class="mr-2"
                />
                <span>{{ currentSystem?.name }}</span>
              </div>
              <v-btn
                v-if="availableSystems.length > 1"
                variant="text"
                size="small"
                @click="selectedSystem = null"
              >
                Cambiar sistema
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <TechniqueList
                :techniques="currentTechniques"
                @select="navigateToTechnique"
              />
            </v-card-text>
          </v-card>
        </div>

        <!-- Estado vacío -->
        <EmptyState
          v-if="availableSystems.length === 0"
          icon="mdi-information-outline"
          icon-color="info"
          title="Sin sistemas disponibles"
          message="No hay sistemas configurados para esta región."
          action-text="Volver"
          @action="$router.back()"
        />
      </v-container>
    </v-main>

    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import SystemCard from '@/components/region/SystemCard.vue'
import TechniqueList from '@/components/region/TechniqueList.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { getRegionById } from '@/data/anatomicalRegions'
import { getSystemsByRegion } from '@/data/systems'
import { getTechniquesByRegionAndSystem } from '@/data/techniques'

const router = useRouter()
const route = useRoute()
const navigationStore = useNavigationStore()

const props = defineProps({
  regionId: {
    type: String,
    required: true
  }
})

const region = ref(null)
const availableSystems = ref([])
const selectedSystem = ref(null)

// Sistema actual (seleccionado o el único disponible)
const currentSystem = computed(() => {
  if (selectedSystem.value) return selectedSystem.value
  if (availableSystems.value.length === 1) return availableSystems.value[0]
  return null
})

// Técnicas del sistema actual
const currentTechniques = computed(() => {
  if (!currentSystem.value) return []
  return getTechniquesByRegionAndSystem(props.regionId, currentSystem.value.id)
})

// Cargar datos de la región
const loadRegionData = () => {
  region.value = getRegionById(props.regionId)
  
  if (!region.value) {
    console.error('Región no encontrada:', props.regionId)
    router.push({ name: 'Home' })
    return
  }

  // Cargar sistemas disponibles
  availableSystems.value = getSystemsByRegion(props.regionId)

  // Actualizar store de navegación
  navigationStore.setRegion(region.value)
}

// Seleccionar sistema
const selectSystem = (system) => {
  selectedSystem.value = system
  navigationStore.setSystem(system)
}

// Navegar a técnica
const navigateToTechnique = (technique) => {
  navigationStore.setTechnique(technique)
  router.push({
    name: 'Technique',
    params: {
      regionId: props.regionId,
      systemId: currentSystem.value.id,
      techniqueId: technique.id
    }
  })
}

// Watch para cambios en regionId
watch(() => props.regionId, () => {
  selectedSystem.value = null
  loadRegionData()
}, { immediate: true })

onMounted(() => {
  loadRegionData()
})
</script>

<style scoped>
.region-detail-view {
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