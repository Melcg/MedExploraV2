<template>
  <v-card elevation="2">
    <v-card-title>Estadísticas</v-card-title>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="6" sm="3">
          <div class="stat-box">
            <v-avatar color="blue" size="48" class="mb-2">
              <v-icon icon="mdi-map-marker" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ stats.regionsVisited }}</div>
            <div class="text-caption">Regiones visitadas</div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="stat-box">
            <v-avatar color="green" size="48" class="mb-2">
              <v-icon icon="mdi-clipboard-text" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ stats.techniquesVisited }}</div>
            <div class="text-caption">Técnicas exploradas</div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="stat-box">
            <v-avatar color="orange" size="48" class="mb-2">
              <v-icon icon="mdi-checkbox-marked" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ stats.checklistsCompleted }}</div>
            <div class="text-caption">Checklists completadas</div>
          </div>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="stat-box">
            <v-avatar color="purple" size="48" class="mb-2">
              <v-icon icon="mdi-clock" />
            </v-avatar>
            <div class="text-h5 font-weight-bold">{{ stats.studyTime }}</div>
            <div class="text-caption">Tiempo de estudio</div>
          </div>
        </v-col>
      </v-row>

      <!-- Racha -->
      <v-alert
        v-if="stats.streak > 0"
        type="warning"
        variant="tonal"
        class="mt-4"
        prominent
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-fire" size="large" />
        </template>
        <v-alert-title>Racha activa</v-alert-title>
        <div>¡Llevas <strong>{{ stats.streak }} día{{ stats.streak > 1 ? 's' : '' }}</strong> consecutivo{{ stats.streak > 1 ? 's' : '' }} estudiando!</div>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.stat-box {
  text-align: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}
</style>