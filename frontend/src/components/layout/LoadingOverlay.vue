<template>
  <v-overlay
    :model-value="loading"
    class="align-center justify-center"
    persistent
  >
    <div class="text-center">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      />
      <p v-if="message" class="mt-4 text-h6 text-white">
        {{ message }}
      </p>
    </div>
  </v-overlay>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
})
</script>