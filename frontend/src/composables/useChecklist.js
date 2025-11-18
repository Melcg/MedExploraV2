// src/composables/useChecklist.js
import { computed, ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist'
import { getTechniqueById } from '@/data/techniques'

export function useChecklist(techniqueId) {
  const checklistStore = useChecklistStore()
  const showCompletionDialog = ref(false)
  const completionData = ref(null)

  // Checklist actual
  const checklist = computed(() => {
    return checklistStore.getChecklistByTechnique.value(techniqueId)
  })

  // Progreso
  const progress = computed(() => {
    if (!checklist.value) return 0
    return checklistStore.getCompletionPercentage.value(techniqueId)
  })

  // Items completados
  const completedItems = computed(() => {
    if (!checklist.value) return 0
    return checklist.value.items.filter(item => item.completed).length
  })

  // Total de items
  const totalItems = computed(() => {
    return checklist.value?.items.length || 0
  })

  // Está completa
  const isComplete = computed(() => {
    return progress.value === 100
  })

  // Inicializar checklist
  const initializeChecklist = () => {
    if (checklist.value) return checklist.value

    const technique = getTechniqueById(techniqueId)
    if (!technique || !technique.steps) {
      console.error('No se encontraron pasos para la técnica:', techniqueId)
      return null
    }

    return checklistStore.createChecklist(techniqueId, technique.steps)
  }

  // Toggle item
  const toggleItem = (itemId) => {
    checklistStore.toggleItem(techniqueId, itemId)

    // Verificar si se completó
    if (isComplete.value) {
      handleCompletion()
    }
  }

  // Agregar nota a item
  const addItemNote = (itemId, note) => {
    checklistStore.setItemNote(techniqueId, itemId, note)
  }

  // Agregar nota general
  const addChecklistNote = (note) => {
    checklistStore.setChecklistNote(techniqueId, note)
  }

  // Manejar completación
  const handleCompletion = () => {
    const completed = checklistStore.completeChecklist(techniqueId)
    
    if (completed) {
      // Calcular tiempo tomado
      const startTime = new Date(completed.startTime)
      const endTime = new Date(completed.completedTime)
      const minutes = Math.round((endTime - startTime) / 1000 / 60)

      completionData.value = {
        technique: getTechniqueById(techniqueId),
        timeMinutes: minutes,
        itemsCompleted: completed.items.length,
        date: completed.completedTime
      }

      showCompletionDialog.value = true
    }
  }

  // Resetear
  const reset = () => {
    checklistStore.resetChecklist(techniqueId)
  }

  // Eliminar
  const remove = () => {
    checklistStore.deleteChecklist(techniqueId)
  }

  // Formato de tiempo
  const getElapsedTime = computed(() => {
    if (!checklist.value?.startTime) return '0 min'

    const start = new Date(checklist.value.startTime)
    const now = new Date()
    const minutes = Math.round((now - start) / 1000 / 60)

    if (minutes < 60) {
      return `${minutes} min`
    } else {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}h ${mins}min`
    }
  })

  return {
    checklist,
    progress,
    completedItems,
    totalItems,
    isComplete,
    showCompletionDialog,
    completionData,
    getElapsedTime,
    initializeChecklist,
    toggleItem,
    addItemNote,
    addChecklistNote,
    reset,
    remove,
  }
}