// src/stores/progress.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS } from '@/utils/constants'

export const useProgressStore = defineStore('progress', () => {
  // State
  const visitedRegions = ref(new Set())
  const visitedTechniques = ref(new Set())
  const completedChecklists = ref([])
  const studyTime = ref(0) // en minutos
  const achievements = ref([])
  const lastActivity = ref(null)
  const streak = ref(0) // días consecutivos
  const preferences = ref({
    theme: 'light',
    notifications: true,
    autoSaveProgress: true,
  })

  // Getters
  const totalRegionsVisited = computed(() => visitedRegions.value.size)
  const totalTechniquesVisited = computed(() => visitedTechniques.value.size)
  const totalChecklistsCompleted = computed(() => completedChecklists.value.length)

  const studyTimeFormatted = computed(() => {
    const hours = Math.floor(studyTime.value / 60)
    const mins = studyTime.value % 60
    if (hours === 0) return `${mins} min`
    return `${hours}h ${mins}min`
  })

  const progressPercentage = computed(() => {
    // Calcular progreso basado en diferentes métricas
    const totalRegions = 8 // Total de regiones anatómicas
    const totalTechniques = 50 // Estimado de técnicas totales
    
    const regionProgress = (totalRegionsVisited.value / totalRegions) * 30
    const techniqueProgress = (totalTechniquesVisited.value / totalTechniques) * 40
    const checklistProgress = Math.min((totalChecklistsCompleted.value / 20) * 30, 30)
    
    return Math.round(regionProgress + techniqueProgress + checklistProgress)
  })

  const currentLevel = computed(() => {
    const percentage = progressPercentage.value
    if (percentage >= 90) return { level: 5, name: 'Experto' }
    if (percentage >= 70) return { level: 4, name: 'Avanzado' }
    if (percentage >= 50) return { level: 3, name: 'Intermedio' }
    if (percentage >= 25) return { level: 2, name: 'Principiante' }
    return { level: 1, name: 'Novato' }
  })

  // Actions
  const visitRegion = (regionId) => {
    visitedRegions.value.add(regionId)
    updateLastActivity('region', regionId)
    saveToLocalStorage()
    checkAchievements()
  }

  const visitTechnique = (techniqueId) => {
    visitedTechniques.value.add(techniqueId)
    updateLastActivity('technique', techniqueId)
    saveToLocalStorage()
    checkAchievements()
  }

  const addCompletedChecklist = (checklistData) => {
    completedChecklists.value.push({
      ...checklistData,
      completedAt: new Date().toISOString()
    })
    saveToLocalStorage()
    checkAchievements()
  }

  const addStudyTime = (minutes) => {
    studyTime.value += minutes
    saveToLocalStorage()
  }

  const updateLastActivity = (type, id) => {
    lastActivity.value = {
      type,
      id,
      timestamp: new Date().toISOString()
    }
  }

  const updateStreak = () => {
    const today = new Date().toDateString()
    const lastActivityDate = lastActivity.value 
      ? new Date(lastActivity.value.timestamp).toDateString()
      : null

    if (lastActivityDate === today) {
      // Ya estudió hoy
      return
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toDateString()

    if (lastActivityDate === yesterdayStr) {
      // Continuó la racha
      streak.value += 1
    } else if (lastActivityDate !== today) {
      // Rompió la racha
      streak.value = 1
    }

    saveToLocalStorage()
  }

  const checkAchievements = () => {
    const newAchievements = []

    // Logro: Primera región
    if (totalRegionsVisited.value === 1 && !hasAchievement('first-region')) {
      newAchievements.push({
        id: 'first-region',
        title: 'Primer Paso',
        description: 'Visitaste tu primera región anatómica',
        icon: 'mdi-map-marker',
        earnedAt: new Date().toISOString()
      })
    }

    // Logro: Todas las regiones
    if (totalRegionsVisited.value === 8 && !hasAchievement('all-regions')) {
      newAchievements.push({
        id: 'all-regions',
        title: 'Explorador Completo',
        description: 'Visitaste todas las regiones anatómicas',
        icon: 'mdi-map-check',
        earnedAt: new Date().toISOString()
      })
    }

    // Logro: Primera checklist
    if (totalChecklistsCompleted.value === 1 && !hasAchievement('first-checklist')) {
      newAchievements.push({
        id: 'first-checklist',
        title: 'Primer Logro',
        description: 'Completaste tu primera checklist',
        icon: 'mdi-checkbox-marked-circle',
        earnedAt: new Date().toISOString()
      })
    }

    // Logro: 10 checklists
    if (totalChecklistsCompleted.value === 10 && !hasAchievement('ten-checklists')) {
      newAchievements.push({
        id: 'ten-checklists',
        title: 'Persistente',
        description: 'Completaste 10 checklists',
        icon: 'mdi-medal',
        earnedAt: new Date().toISOString()
      })
    }

    // Logro: 5 días consecutivos
    if (streak.value === 5 && !hasAchievement('five-day-streak')) {
      newAchievements.push({
        id: 'five-day-streak',
        title: 'Constancia',
        description: 'Estudiaste 5 días consecutivos',
        icon: 'mdi-fire',
        earnedAt: new Date().toISOString()
      })
    }

    // Logro: 10 horas de estudio
    if (studyTime.value >= 600 && !hasAchievement('ten-hours')) {
      newAchievements.push({
        id: 'ten-hours',
        title: 'Dedicado',
        description: 'Acumulaste 10 horas de estudio',
        icon: 'mdi-clock-check',
        earnedAt: new Date().toISOString()
      })
    }

    if (newAchievements.length > 0) {
      achievements.value.push(...newAchievements)
      saveToLocalStorage()
    }

    return newAchievements
  }

  const hasAchievement = (achievementId) => {
    return achievements.value.some(a => a.id === achievementId)
  }

  const updatePreferences = (newPreferences) => {
    preferences.value = { ...preferences.value, ...newPreferences }
    saveToLocalStorage()
  }

  const resetProgress = () => {
    visitedRegions.value = new Set()
    visitedTechniques.value = new Set()
    completedChecklists.value = []
    studyTime.value = 0
    achievements.value = []
    streak.value = 0
    lastActivity.value = null
    saveToLocalStorage()
  }

  // Persistencia
  const saveToLocalStorage = () => {
    try {
      const data = {
        visitedRegions: Array.from(visitedRegions.value),
        visitedTechniques: Array.from(visitedTechniques.value),
        completedChecklists: completedChecklists.value,
        studyTime: studyTime.value,
        achievements: achievements.value,
        lastActivity: lastActivity.value,
        streak: streak.value,
        preferences: preferences.value,
      }
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data))
    } catch (error) {
      console.error('Error al guardar progreso:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS)
      if (saved) {
        const data = JSON.parse(saved)
        visitedRegions.value = new Set(data.visitedRegions || [])
        visitedTechniques.value = new Set(data.visitedTechniques || [])
        completedChecklists.value = data.completedChecklists || []
        studyTime.value = data.studyTime || 0
        achievements.value = data.achievements || []
        lastActivity.value = data.lastActivity || null
        streak.value = data.streak || 0
        preferences.value = data.preferences || preferences.value
      }
    } catch (error) {
      console.error('Error al cargar progreso:', error)
    }
  }

  return {
    // State
    visitedRegions,
    visitedTechniques,
    completedChecklists,
    studyTime,
    achievements,
    lastActivity,
    streak,
    preferences,
    // Getters
    totalRegionsVisited,
    totalTechniquesVisited,
    totalChecklistsCompleted,
    studyTimeFormatted,
    progressPercentage,
    currentLevel,
    // Actions
    visitRegion,
    visitTechnique,
    addCompletedChecklist,
    addStudyTime,
    updateStreak,
    updatePreferences,
    resetProgress,
    loadFromLocalStorage,
    hasAchievement,
  }
})