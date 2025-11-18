<template>
  <div class="technique-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Cabecera con chip de tipo de técnica -->
        <div class="mb-4">
          <v-chip
            :color="techniqueColor"
            variant="elevated"
            prepend-icon="mdi-tag"
            class="mb-2"
          >
            {{ techniqueTypeLabel }}
          </v-chip>
          <h1 class="text-h4">{{ technique?.name }}</h1>
        </div>

        <v-row>
          <!-- Columna principal -->
          <v-col cols="12" lg="8">
            <!-- Descripción de la técnica -->
            <TechniqueDescription
              v-if="technique"
              :technique="technique"
              class="mb-4"
            />

            <!-- Botones multimedia -->
            <MultimediaButtons
              v-if="technique?.multimedia"
              :multimedia="technique.multimedia"
              class="mb-4"
              @open-images="openMultimedia('image', 0)"
              @open-videos="openMultimedia('video', 0)"
              @open-audios="openMultimedia('audio', 0)"
            />

            <!-- Lista de pasos interactiva -->
            <v-card v-if="technique?.steps" elevation="2" class="mb-4">
              <v-card-title>
                Pasos detallados
                <v-chip
                  v-if="progress.percentage > 0"
                  size="small"
                  :color="progress.percentage === 100 ? 'success' : 'primary'"
                  class="ml-2"
                >
                  {{ progress.percentage }}%
                </v-chip>
              </v-card-title>
              <v-divider />
              <v-card-text class="pa-0">
                <StepsList
                  :steps="technique.steps"
                  @progress-update="handleProgressUpdate"
                />
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" lg="4">
            <!-- Contenido relacionado -->
            <RelatedContent
              :related-techniques="relatedTechniques"
              @navigate-to="navigateToTechnique"
              @open-checklist="openChecklist"
              @quick-review="goToQuickReview"
            />
          </v-col>
        </v-row>

        <!-- Diálogo de confirmación para checklist -->
        <ConfirmDialog
          v-model="showChecklistDialog"
          title="Abrir Checklist"
          message="¿Deseas abrir la checklist interactiva para esta técnica?"
          icon="mdi-clipboard-check"
          icon-color="primary"
          confirm-text="Abrir"
          @confirm="navigateToChecklist"
        />

        <!-- Snackbar de progreso -->
        <v-snackbar
          v-model="showProgressSnackbar"
          :timeout="2000"
          color="success"
        >
          <v-icon icon="mdi-check-circle" class="mr-2" />
          ¡Técnica completada al {{ progress.percentage }}%!
        </v-snackbar>
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
import TechniqueDescription from '@/components/technique/TechniqueDescription.vue'
import MultimediaButtons from '@/components/technique/MultimediaButtons.vue'
import StepsList from '@/components/technique/StepsList.vue'
import RelatedContent from '@/components/technique/RelatedContent.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { getTechniqueById, getTechniquesByRegionAndSystem } from '@/data/techniques'
import { EXPLORATION_TECHNIQUES } from '@/utils/constants'

const router = useRouter()
const route = useRoute()
const navigationStore = useNavigationStore()

const props = defineProps({
  regionId: {
    type: String,
    required: true
  },
  systemId: {
    type: String,
    required: true
  },
  techniqueId: {
    type: String,
    required: true
  }
})

const technique = ref(null)
const progress = ref({ completed: 0, total: 0, percentage: 0 })
const showChecklistDialog = ref(false)
const showProgressSnackbar = ref(false)

// Color según tipo de técnica
const techniqueColor = computed(() => {
  const colors = {
    [EXPLORATION_TECHNIQUES.INSPECCION]: 'blue',
    [EXPLORATION_TECHNIQUES.PALPACION]: 'green',
    [EXPLORATION_TECHNIQUES.PERCUSION]: 'orange',
    [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'purple',
    [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'teal',
  }
  return colors[technique.value?.techniqueType] || 'primary'
})

// Label del tipo de técnica
const techniqueTypeLabel = computed(() => {
  const labels = {
    [EXPLORATION_TECHNIQUES.INSPECCION]: 'Inspección',
    [EXPLORATION_TECHNIQUES.PALPACION]: 'Palpación',
    [EXPLORATION_TECHNIQUES.PERCUSION]: 'Percusión',
    [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'Auscultación',
    [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'Movilidad',
  }
  return labels[technique.value?.techniqueType] || 'Técnica'
})

// Técnicas relacionadas (misma región y sistema)
const relatedTechniques = computed(() => {
  const techniques = getTechniquesByRegionAndSystem(props.regionId, props.systemId)
  return techniques.filter(t => t.id !== props.techniqueId)
})

// Cargar técnica
const loadTechnique = () => {
  technique.value = getTechniqueById(props.techniqueId)
  
  if (!technique.value) {
    console.error('Técnica no encontrada:', props.techniqueId)
    router.push({ name: 'Home' })
    return
  }

  navigationStore.setTechnique(technique.value)
}

// Manejar actualización de progreso
const handleProgressUpdate = (progressData) => {
  progress.value = progressData
  
  if (progressData.percentage === 100) {
    showProgressSnackbar.value = true
  }
}

// Abrir multimedia
const openMultimedia = (type, index) => {
  router.push({
    name: 'MultimediaPlayer',
    params: {
      type,
      id: props.techniqueId
    },
    query: { index }
  })
}

// Navegar a otra técnica
const navigateToTechnique = (newTechnique) => {
  router.push({
    name: 'Technique',
    params: {
      regionId: props.regionId,
      systemId: props.systemId,
      techniqueId: newTechnique.id
    }
  })
}

// Abrir checklist
const openChecklist = () => {
  showChecklistDialog.value = true
}

// Navegar a checklist
const navigateToChecklist = () => {
  router.push({
    name: 'Checklist',
    params: {
      techniqueId: props.techniqueId
    }
  })
}

// Ir a modo repaso
const goToQuickReview = () => {
  router.push({ name: 'QuickReview' })
}

// Watch para cambios de técnica
watch(() => props.techniqueId, () => {
  loadTechnique()
  progress.value = { completed: 0, total: 0, percentage: 0 }
}, { immediate: true })

onMounted(() => {
  loadTechnique()
})
</script>

<style scoped>
.technique-view {
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