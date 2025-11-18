<template>
  <div class="profile-view">
    <AppBar />
    
    <v-main class="main-content">
      <v-container>
        <!-- Header con info del usuario -->
        <v-card class="mb-6" elevation="4">
          <v-card-text class="pa-6">
            <div class="d-flex align-center">
              <v-avatar size="80" class="mr-4">
                <v-img
                  v-if="authStore.userPhoto"
                  :src="authStore.userPhoto"
                  :alt="authStore.userName"
                />
                <v-icon v-else icon="mdi-account-circle" size="64" />
              </v-avatar>
              <div class="flex-grow-1">
                <h1 class="text-h4 mb-1">{{ authStore.userName }}</h1>
                <p class="text-body-2 text-medium-emphasis mb-2">
                  {{ authStore.userEmail }}
                </p>
                <v-chip
                  :color="levelColor"
                  prepend-icon="mdi-shield-star"
                >
                  {{ stats.level.name }}
                </v-chip>
              </div>
              <v-btn
                icon="mdi-cog"
                variant="text"
                @click="showSettings = true"
              />
            </div>
          </v-card-text>
        </v-card>

        <!-- Tabs -->
        <v-tabs v-model="activeTab" class="mb-6">
          <v-tab value="overview">Resumen</v-tab>
          <v-tab value="achievements">Logros</v-tab>
          <v-tab value="activity">Actividad</v-tab>
        </v-tabs>

        <!-- Resumen -->
        <div v-show="activeTab === 'overview'">
          <v-row>
            <v-col cols="12" lg="8">
              <!-- Estadísticas -->
              <StatisticsCard :stats="stats" class="mb-6" />

              <!-- Progreso -->
              <ProgressChart
                :progress-percentage="stats.progressPercentage"
                :level="stats.level"
                :progress-data="progressData"
              />
            </v-col>

            <v-col cols="12" lg="4">
              <!-- Actividad reciente -->
              <v-card elevation="2">
                <v-card-title>Actividad Reciente</v-card-title>
                <v-divider />
                <v-card-text>
                  <v-timeline density="compact" side="end">
                    <v-timeline-item
                      v-for="(activity, index) in recentActivity"
                      :key="index"
                      :dot-color="activity.color"
                      size="small"
                    >
                      <div class="mb-3">
                        <div class="d-flex align-center mb-1">
                          <v-icon :icon="activity.icon" size="small" class="mr-1" />
                          <strong class="text-body-2">{{ activity.title }}</strong>
                        </div>
                        <div class="text-caption text-medium-emphasis">
                          {{ formatTimeAgo(activity.timestamp) }}
                        </div>
                      </div>
                    </v-timeline-item>
                  </v-timeline>

                  <EmptyState
                    v-if="recentActivity.length === 0"
                    icon="mdi-history"
                    icon-color="grey"
                    title="Sin actividad"
                    message="Aún no has realizado ninguna actividad."
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Logros -->
        <div v-show="activeTab === 'achievements'">
          <v-row>
            <v-col
              v-for="achievement in allAchievements"
              :key="achievement.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <AchievementBadge
                :achievement="achievement"
                :earned="hasAchievement(achievement.id)"
                @click="showAchievementDetails"
              />
            </v-col>
          </v-row>

          <EmptyState
            v-if="allAchievements.length === 0"
            icon="mdi-medal"
            icon-color="grey"
            title="Sin logros"
            message="Los logros aparecerán aquí a medida que progreses."
          />
        </div>

        <!-- Actividad -->
        <div v-show="activeTab === 'activity'">
          <v-card elevation="2">
            <v-card-title>Historial de Actividad</v-card-title>
            <v-divider />
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="(activity, index) in recentActivity"
                  :key="index"
                  :prepend-icon="activity.icon"
                  :title="activity.title"
                  :subtitle="formatTimeAgo(activity.timestamp)"
                />
              </v-list>

              <EmptyState
                v-if="recentActivity.length === 0"
                icon="mdi-clipboard-list"
                icon-color="grey"
                title="Sin actividad registrada"
                message="Tu actividad aparecerá aquí."
              />
            </v-card-text>
          </v-card>
        </div>

        <!-- Acciones -->
        <v-card elevation="2" class="mt-6">
          <v-card-title>Acciones</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-download"
                  @click="exportData"
                >
                  Exportar progreso
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  block
                  color="error"
                  variant="tonal"
                  prepend-icon="mdi-delete"
                  @click="showResetDialog = true"
                >
                  Resetear progreso
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <BottomNavigation />

    <!-- Dialog de reset -->
    <ConfirmDialog
      v-model="showResetDialog"
      title="Resetear Progreso"
      message="¿Estás seguro de que deseas eliminar todo tu progreso? Esta acción no se puede deshacer."
      icon="mdi-alert"
      icon-color="error"
      confirm-text="Resetear"
      confirm-color="error"
      @confirm="handleReset"
    />

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProgressStore } from '@/stores/progress'
import AppBar from '@/components/layout/AppBar.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import StatisticsCard from '@/components/profile/StatisticsCard.vue'
import ProgressChart from '@/components/profile/ProgressChart.vue'
import AchievementBadge from '@/components/profile/AchievementBadge.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useProgress } from '@/composables/useProgress'

const router = useRouter()
const authStore = useAuthStore()
const progressStore = useProgressStore()

const { stats, recentActivity, recentAchievements, progressData, formatTimeAgo } = useProgress()

const activeTab = ref('overview')
const showSettings = ref(false)
const showResetDialog = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const levelColor = computed(() => {
  const level = stats.value.level.level
  if (level >= 5) return 'purple'
  if (level >= 4) return 'primary'
  if (level >= 3) return 'success'
  if (level >= 2) return 'warning'
  return 'grey'
})

// Todos los logros posibles
const allAchievements = [
  {
    id: 'first-region',
    title: 'Primer Paso',
    description: 'Visitaste tu primera región anatómica',
    icon: 'mdi-map-marker'
  },
  {
    id: 'all-regions',
    title: 'Explorador Completo',
    description: 'Visitaste todas las regiones anatómicas',
    icon: 'mdi-map-check'
  },
  {
    id: 'first-checklist',
    title: 'Primer Logro',
    description: 'Completaste tu primera checklist',
    icon: 'mdi-checkbox-marked-circle'
  },
  {
    id: 'ten-checklists',
    title: 'Persistente',
    description: 'Completaste 10 checklists',
    icon: 'mdi-medal'
  },
  {
    id: 'five-day-streak',
    title: 'Constancia',
    description: 'Estudiaste 5 días consecutivos',
    icon: 'mdi-fire'
  },
  {
    id: 'ten-hours',
    title: 'Dedicado',
    description: 'Acumulaste 10 horas de estudio',
    icon: 'mdi-clock-check'
  }
]

const hasAchievement = (achievementId) => {
  return progressStore.hasAchievement(achievementId)
}

const showAchievementDetails = (achievement) => {
  console.log('Mostrar detalles de logro:', achievement)
}

const exportData = () => {
  const data = {
    user: {
      name: authStore.userName,
      email: authStore.userEmail
    },
    progress: {
      regionsVisited: stats.value.regionsVisited,
      techniquesVisited: stats.value.techniquesVisited,
      checklistsCompleted: stats.value.checklistsCompleted,
      studyTime: stats.value.studyTimeMinutes,
      level: stats.value.level,
      achievements: progressStore.achievements
    },
    exportDate: new Date().toISOString()
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `medexplora-progress-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)

  showSnackbar('Progreso exportado correctamente', 'success')
}

const handleReset = () => {
  progressStore.resetProgress()
  showSnackbar('Progreso reseteado', 'info')
}

const showSnackbar = (message, color = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}
</script>

<style scoped>
.profile-view {
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