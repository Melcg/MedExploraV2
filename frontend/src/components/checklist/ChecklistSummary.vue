<template>
  <v-dialog
    :model-value="show"
    max-width="500"
    persistent
  >
    <v-card>
      <!-- Confetti animation -->
      <div class="confetti-container">
        <div v-for="i in 50" :key="i" class="confetti" :style="getConfettiStyle(i)" />
      </div>

      <v-card-text class="text-center pa-8">
        <!-- Icon -->
        <v-avatar color="success" size="100" class="mb-4">
          <v-icon icon="mdi-check-circle" size="64" />
        </v-avatar>

        <!-- Title -->
        <h2 class="text-h4 mb-2">¡Checklist Completada!</h2>
        <p class="text-body-1 text-medium-emphasis mb-6">
          Has completado exitosamente la exploración
        </p>

        <!-- Stats -->
        <v-card variant="tonal" color="success" class="mb-6">
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <div class="stat-item">
                  <v-icon icon="mdi-clipboard-check" class="mb-2" />
                  <div class="text-h6">{{ data.itemsCompleted }}</div>
                  <div class="text-caption">Pasos completados</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="stat-item">
                  <v-icon icon="mdi-clock" class="mb-2" />
                  <div class="text-h6">{{ data.timeMinutes }} min</div>
                  <div class="text-caption">Tiempo total</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Technique name -->
        <p class="text-body-2 mb-6">
          <strong>Técnica:</strong> {{ data.technique?.name }}
        </p>

        <!-- Actions -->
        <v-btn
          color="primary"
          size="large"
          block
          prepend-icon="mdi-share-variant"
          class="mb-2"
          @click="$emit('share')"
        >
          Compartir resultado
        </v-btn>
        <v-btn
          variant="text"
          block
          @click="$emit('close')"
        >
          Cerrar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'share'])

const getConfettiStyle = (index) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    backgroundColor: colors[index % colors.length],
    animationDuration: `${3 + Math.random() * 2}s`
  }
}
</script>

<style scoped>
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -10px;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(600px) rotate(360deg);
  }
}

.stat-item {
  text-align: center;
  padding: 16px;
}

.v-card-text {
  position: relative;
  z-index: 2;
}
</style>