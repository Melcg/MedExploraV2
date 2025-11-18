<template>
  <v-card
    class="review-card"
    :style="{ borderTopColor: card.color }"
    elevation="4"
    height="100%"
  >
    <v-card-title class="pa-6 pb-4">
      <div class="d-flex align-center">
        <v-avatar
          :color="card.color"
          size="48"
          class="mr-3"
        >
          <v-icon icon="mdi-flash" size="28" />
        </v-avatar>
        <div>
          <h3 class="text-h6 mb-1">{{ card.title }}</h3>
          <v-chip size="x-small" :color="card.color" variant="tonal">
            {{ cardIndex + 1 }} / {{ totalCards }}
          </v-chip>
        </div>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-6">
      <!-- Puntos clave -->
      <div class="mb-6">
        <h4 class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-lightbulb-on" color="amber" class="mr-2" />
          Puntos Clave
        </h4>
        <KeyPointsList :points="card.keyPoints" />
      </div>

      <!-- Signos críticos -->
      <div v-if="card.criticalSigns && card.criticalSigns.length">
        <h4 class="text-subtitle-1 font-weight-bold mb-3 d-flex align-center">
          <v-icon icon="mdi-alert" color="error" class="mr-2" />
          Signos de Alerta
        </h4>
        <SignsHighlight :signs="card.criticalSigns" />
      </div>
    </v-card-text>

    <v-divider />

    <!-- Acciones -->
    <v-card-actions class="pa-4">
      <v-btn
        variant="text"
        prepend-icon="mdi-information"
        @click="$emit('show-details')"
      >
        Ver más
      </v-btn>
      <v-spacer />
      <v-btn
        icon="mdi-bookmark-outline"
        variant="text"
        @click="$emit('bookmark')"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import KeyPointsList from './KeyPointsList.vue'
import SignsHighlight from './SignsHighlight.vue'

defineProps({
  card: {
    type: Object,
    required: true
  },
  cardIndex: {
    type: Number,
    default: 0
  },
  totalCards: {
    type: Number,
    default: 1
  }
})

defineEmits(['show-details', 'bookmark'])
</script>

<style scoped>
.review-card {
  border-top: 4px solid;
  display: flex;
  flex-direction: column;
}

.v-card-text {
  flex: 1;
  overflow-y: auto;
}
</style>