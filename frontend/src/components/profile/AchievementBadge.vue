<template>
  <v-card
    class="achievement-badge"
    :class="{ 'achievement-earned': earned }"
    elevation="2"
    @click="$emit('click', achievement)"
  >
    <v-card-text class="pa-4 text-center">
      <v-avatar
        :color="earned ? 'amber' : 'grey-lighten-2'"
        size="80"
        class="mb-3"
      >
        <v-icon
          :icon="achievement.icon"
          size="48"
          :color="earned ? 'white' : 'grey'"
        />
      </v-avatar>
      <h4 class="text-subtitle-1 font-weight-bold mb-1">
        {{ achievement.title }}
      </h4>
      <p class="text-caption text-medium-emphasis mb-2">
        {{ achievement.description }}
      </p>
      <v-chip
        v-if="earned"
        size="x-small"
        color="success"
        prepend-icon="mdi-check"
      >
        Desbloqueado
      </v-chip>
      <v-chip
        v-else
        size="x-small"
        variant="outlined"
      >
        Bloqueado
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  achievement: {
    type: Object,
    required: true
  },
  earned: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.achievement-badge {
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.achievement-badge.achievement-earned {
  opacity: 1;
  border: 2px solid #FFC107;
}

.achievement-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>