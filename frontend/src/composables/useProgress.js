// src/composables/useProgress.js
import { computed } from 'vue'
import { useProgressStore } from '@/stores/progress'
import { useChecklistStore } from '@/stores/checklist'

export function useProgress() {
  const progressStore = useProgressStore()
  const checklistStore = useChecklistStore()

  // Estadísticas combinadas
  const stats = computed(() => {
    const checklistStats = checklistStore.getStats.value

    return {
      regionsVisited: progressStore.totalRegionsVisited,
      techniquesVisited: progressStore.totalTechniquesVisited,
      checklistsCompleted: checklistStats.totalCompleted,
      studyTime: progressStore.studyTimeFormatted,
      studyTimeMinutes: progressStore.studyTime,
      streak: progressStore.streak,
      achievements: progressStore.achievements.length,
      level: progressStore.currentLevel,
      progressPercentage: progressStore.progressPercentage,
    }
  })

  // Actividad reciente
  const recentActivity = computed(() => {
    const recent = []

    // Últimas checklists completadas
    const recentChecklists = checklistStore.getRecentChecklists.value.slice(0, 5)
    recentChecklists.forEach(checklist => {
      recent.push({
        type: 'checklist',
        title: 'Checklist completada',
        description: checklist.techniqueId,
        timestamp: checklist.completedTime,
        icon: 'mdi-checkbox-marked-circle',
        color: 'success'
      })
    })

    // Ordenar por fecha
    return recent.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    ).slice(0, 10)
  })

  // Logros recientes
  const recentAchievements = computed(() => {
    return progressStore.achievements
      .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
      .slice(0, 5)
  })

  // Gráficos de progreso
  const progressData = computed(() => {
    return {
      labels: ['Regiones', 'Técnicas', 'Checklists'],
      values: [
        (progressStore.totalRegionsVisited / 8) * 100,
        (progressStore.totalTechniquesVisited / 50) * 100,
        (progressStore.totalChecklistsCompleted / 20) * 100,
      ]
    }
  })

  // Formato de tiempo relativo
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.round(diffMs / 1000 / 60)

    if (diffMins < 1) return 'Hace un momento'
    if (diffMins < 60) return `Hace ${diffMins} min`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `Hace ${diffHours}h`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
    
    return date.toLocaleDateString()
  }

  return {
    stats,
    recentActivity,
    recentAchievements,
    progressData,
    formatTimeAgo,
  }
}