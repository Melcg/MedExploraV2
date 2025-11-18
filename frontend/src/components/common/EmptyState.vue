<template>
  <div class="empty-state text-center pa-8">
    <v-icon
      :icon="icon"
      size="80"
      :color="iconColor"
      class="mb-4"
    />
    <h3 class="text-h6 mb-2">{{ title }}</h3>
    <p class="text-body-2 text-medium-emphasis mb-4">
      {{ message }}
    </p>
    <v-btn
      v-if="actionText"
      :color="actionColor"
      @click="$emit('action')"
    >
      {{ actionText }}
    </v-btn>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'mdi-inbox',
  },
  iconColor: {
    type: String,
    default: 'grey',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  actionText: {
    type: String,
    default: '',
  },
  actionColor: {
    type: String,
    default: 'primary',
  },
})

defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>