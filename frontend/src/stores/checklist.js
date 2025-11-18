// src/stores/checklist.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS } from '@/utils/constants'

export const useChecklistStore = defineStore('checklist', () => {
  // State
  const activeChecklists = ref({}) // { techniqueId: { items: [], startTime, completedTime } }
  const checklistHistory = ref([]) // Array de checklists completadas

  // Getters
  const getChecklistByTechnique = computed(() => {
    return (techniqueId) => activeChecklists.value[techniqueId] || null
  })

  const getCompletionPercentage = computed(() => {
    return (techniqueId) => {
      const checklist = activeChecklists.value[techniqueId]
      if (!checklist || !checklist.items.length) return 0

      const completed = checklist.items.filter(item => item.completed).length
      return Math.round((completed / checklist.items.length) * 100)
    }
  })

  const getTotalCompletedChecklists = computed(() => {
    return checklistHistory.value.length
  })

  const getRecentChecklists = computed(() => {
    return checklistHistory.value
      .sort((a, b) => new Date(b.completedTime) - new Date(a.completedTime))
      .slice(0, 10)
  })

  // Actions
  const createChecklist = (techniqueId, steps) => {
    const items = steps.map((step, index) => ({
      id: `${techniqueId}-step-${index}`,
      text: step,
      completed: false,
      completedAt: null,
      notes: ''
    }))

    activeChecklists.value[techniqueId] = {
      techniqueId,
      items,
      startTime: new Date().toISOString(),
      completedTime: null,
      notes: ''
    }

    saveToLocalStorage()
    return activeChecklists.value[techniqueId]
  }

  const toggleItem = (techniqueId, itemId) => {
    const checklist = activeChecklists.value[techniqueId]
    if (!checklist) return

    const item = checklist.items.find(i => i.id === itemId)
    if (item) {
      item.completed = !item.completed
      item.completedAt = item.completed ? new Date().toISOString() : null
    }

    saveToLocalStorage()
  }

  const setItemNote = (techniqueId, itemId, note) => {
    const checklist = activeChecklists.value[techniqueId]
    if (!checklist) return

    const item = checklist.items.find(i => i.id === itemId)
    if (item) {
      item.notes = note
    }

    saveToLocalStorage()
  }

  const setChecklistNote = (techniqueId, note) => {
    const checklist = activeChecklists.value[techniqueId]
    if (checklist) {
      checklist.notes = note
      saveToLocalStorage()
    }
  }

  const completeChecklist = (techniqueId) => {
    const checklist = activeChecklists.value[techniqueId]
    if (!checklist) return

    checklist.completedTime = new Date().toISOString()

    // Agregar a historial
    checklistHistory.value.push({ ...checklist })

    // Remover de activas
    delete activeChecklists.value[techniqueId]

    saveToLocalStorage()
    return checklist
  }

  const resetChecklist = (techniqueId) => {
    const checklist = activeChecklists.value[techniqueId]
    if (!checklist) return

    checklist.items.forEach(item => {
      item.completed = false
      item.completedAt = null
      item.notes = ''
    })

    checklist.notes = ''
    saveToLocalStorage()
  }

  const deleteChecklist = (techniqueId) => {
    delete activeChecklists.value[techniqueId]
    saveToLocalStorage()
  }

  const clearHistory = () => {
    checklistHistory.value = []
    saveToLocalStorage()
  }

  // Persistencia
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CHECKLISTS,
        JSON.stringify({
          active: activeChecklists.value,
          history: checklistHistory.value
        })
      )
    } catch (error) {
      console.error('Error al guardar checklists:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKLISTS)
      if (saved) {
        const data = JSON.parse(saved)
        activeChecklists.value = data.active || {}
        checklistHistory.value = data.history || []
      }
    } catch (error) {
      console.error('Error al cargar checklists:', error)
    }
  }

  // Estadísticas
  const getStats = computed(() => {
    const total = checklistHistory.value.length
    const totalItems = checklistHistory.value.reduce(
      (sum, checklist) => sum + checklist.items.length,
      0
    )

    // Calcular tiempo promedio
    const timesInMinutes = checklistHistory.value
      .filter(c => c.startTime && c.completedTime)
      .map(c => {
        const start = new Date(c.startTime)
        const end = new Date(c.completedTime)
        return (end - start) / 1000 / 60 // minutos
      })

    const avgTime = timesInMinutes.length
      ? timesInMinutes.reduce((a, b) => a + b, 0) / timesInMinutes.length
      : 0

    return {
      totalCompleted: total,
      totalItems,
      averageTimeMinutes: Math.round(avgTime),
      activeCount: Object.keys(activeChecklists.value).length
    }
  })

  return {
    // State
    activeChecklists,
    checklistHistory,
    // Getters
    getChecklistByTechnique,
    getCompletionPercentage,
    getTotalCompletedChecklists,
    getRecentChecklists,
    getStats,
    // Actions
    createChecklist,
    toggleItem,
    setItemNote,
    setChecklistNote,
    completeChecklist,
    resetChecklist,
    deleteChecklist,
    clearHistory,
    loadFromLocalStorage,
  }
})