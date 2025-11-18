<template>
  <div class="checklist-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header -->
        <div class="mb-6">
          <v-btn
            variant="text"
            prepend-icon="mdi-arrow-left"
            class="mb-4"
            @click="goBack"
          >
            Volver
          </v-btn>
          
          <h1 class="text-h4 mb-2">
            <v-icon icon="mdi-clipboard-check-outline" class="mr-2" />
            Checklist de Exploración
          </h1>
          <p v-if="technique" class="text-h6 text-medium-emphasis">
            {{ technique.name }}
          </p>
        </div>

        <v-row>
          <!-- Lista de items -->
          <v-col cols="12" lg="8">
            <!-- Instrucciones -->
            <v-alert
              v-if="!checklist"
              type="info"
              variant="tonal"
              class="mb-4"
            >
              <v-alert-title>Instrucciones</v-alert-title>
              Marca cada paso a medida que lo completes durante la exploración física.
              Puedes agregar notas u observaciones en cada paso.
            </v-alert>

            <!-- Items del checklist -->
            <div v-if="checklist">
              <ChecklistItem
                v-for="item in checklist.items"
                :key="item.id"
                :item="item"
                @toggle="handleToggle"
                @update-note="handleUpdateNote"
              />

              <!-- Notas generales -->
              <v-card elevation="2" class="mt-4">
                <v-card-title>
                  <v-icon icon="mdi-note-text" class="mr-2" />
                  Notas Generales
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <v-textarea
                    :model-value="checklist.notes"
                    label="Observaciones generales de la exploración"
                    variant="outlined"
                    rows="4"
                    auto-grow
                    placeholder="Escribe aquí tus observaciones generales..."
                    @update:model-value="handleUpdateChecklistNote"
                  />
                </v-card-text>
              </v-card>
            </div>

            <!-- Crear checklist si no existe -->
            <v-card v-else elevation="2">
              <v-card-text class="text-center pa-8">
                <v-icon icon="mdi-clipboard-plus" size="64" color="primary" class="mb-4" />
                <h3 class="text-h6 mb-4">Iniciar Checklist</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  Comienza una nueva checklist para esta técnica de exploración
                </p>
                <v-btn
                  color="primary"
                  size="large"
                  prepend-icon="mdi-play"
                  @click="startChecklist"
                >
                  Comenzar
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Sidebar con progreso -->
          <v-col cols="12" lg="4">
            <ChecklistProgress
              v-if="checklist"
              :progress="progress"
              :completed-items="completedItems"
              :total-items="totalItems"
              :elapsed-time="elapsedTime"
              @reset="handleReset"
              @complete="handleComplete"
            />

            <!-- Acciones rápidas -->
            <v-card v-if="checklist" elevation="2" class="mt-4">
              <v-card-title>Acciones Rápidas</v-card-title>
              <v-divider />
              <v-card-text>
                <v-btn
                  block
                  variant="tonal"
                  prepend-icon="mdi-book-open-variant"
                  class="mb-2"
                  @click="viewTechnique"
                >
                  Ver guía de técnica
                </v-btn>
                <v-btn
                  block
                  variant="tonal"
                  prepend-icon="mdi-image-multiple"
                  class="mb-2"
                  @click="viewMultimedia"
                >
                  Ver multimedia
                </v-btn>
                <v-btn
                  block
                  variant="tonal"
                  color="error"
                  prepend-icon="mdi-delete"
                  @click="showDeleteDialog = true"
                >
                  Eliminar checklist
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog de completación -->
        <ChecklistSummary
          :show="showCompletionDialog"
          :data="completionData || {}"
          @close="handleCloseSummary"
          @share="handleShare"
        />

        <!-- Dialog de confirmación de reset -->
        <ConfirmDialog
          v-model="showResetDialog"
          title="Reiniciar Checklist"
          message="¿Estás seguro de que deseas reiniciar esta checklist? Se perderán todas las marcas y notas."
          icon="mdi-refresh"
          icon-color="warning"
          confirm-text="Reiniciar"
          confirm-color="warning"
          @confirm="confirmReset"
        />

        <!-- Dialog de confirmación de eliminación -->
        <ConfirmDialog
          v-model="showDeleteDialog"
          title="Eliminar Checklist"
          message="¿Estás seguro de que deseas eliminar esta checklist? Esta acción no se puede deshacer."
          icon="mdi-delete"
          icon-color="error"
          confirm-text="Eliminar"
          confirm-color="error"
          @confirm="confirmDelete"
        />

        <!-- Snackbar -->
        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="3000"
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-container>
    </v-main>

    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import ChecklistItem from '@/components/checklist/ChecklistItem.vue'
import ChecklistProgress from '@/components/checklist/ChecklistProgress.vue'
import ChecklistSummary from '@/components/checklist/ChecklistSummary.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useChecklist } from '@/composables/useChecklist'
import { getTechniqueById } from '@/data/techniques'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  techniqueId: {
    type: String,
    required: true
  }
})

const technique = ref(null)
const showResetDialog = ref(false)
const showDeleteDialog = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const {
  checklist,
  progress,
  completedItems,
  totalItems,
  isComplete,
  showCompletionDialog,
  completionData,
  elapsedTime,
  initializeChecklist,
  toggleItem,
  addItemNote,
  addChecklistNote,
  reset,
  remove,
} = useChecklist(props.techniqueId)

const startChecklist = () => {
  initializeChecklist()
  showSnackbar('Checklist iniciada', 'success')
}

const handleToggle = (itemId) => {
  toggleItem(itemId)
}

const handleUpdateNote = (itemId, note) => {
  addItemNote(itemId, note)
}

const handleUpdateChecklistNote = (note) => {
  addChecklistNote(note)
}

const handleReset = () => {
  showResetDialog.value = true
}

const confirmReset = () => {
  reset()
  showSnackbar('Checklist reiniciada', 'info')
}

const handleComplete = () => {
  if (isComplete.value) {
    // El composable ya maneja la lógica de completación
  } else {
    showSnackbar('Completa todos los pasos primero', 'warning')
  }
}

const handleCloseSummary = () => {
  showCompletionDialog.value = false
  goBack()
}

const handleShare = () => {
  // Implementar funcionalidad de compartir
  if (navigator.share) {
    navigator.share({
      title: 'Checklist Completada - MedExplora',
      text: `He completado la checklist de ${technique.value?.name}`,
    })
  } else {
    showSnackbar('Función de compartir no disponible', 'info')
  }
}

const confirmDelete = () => {
  remove()
  showSnackbar('Checklist eliminada', 'success')
  goBack()
}

const viewTechnique = () => {
  router.back()
}

const viewMultimedia = () => {
  if (technique.value?.multimedia?.images?.length) {
    router.push({
      name: 'MultimediaPlayer',
      params: {
        type: 'image',
        id: props.techniqueId
      }
    })
  } else {
    showSnackbar('No hay multimedia disponible', 'info')
  }
}

const goBack = () => {
  router.back()
}

const showSnackbar = (message, color = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

onMounted(() => {
  technique.value = getTechniqueById(props.techniqueId)
  
  if (!technique.value) {
    console.error('Técnica no encontrada:', props.techniqueId)
    router.push({ name: 'Home' })
  }
})
</script>

<style scoped>
.checklist-view {
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