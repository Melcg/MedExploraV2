<template>
  <v-alert
    v-if="show"
    :type="type"
    :title="title"
    :text="message"
    closable
    @click:close="$emit('close')"
    class="mb-4"
  >
    <template v-if="action" v-slot:append>
      <v-btn
        size="small"
        variant="text"
        @click="$emit('action')"
      >
        {{ actionText }}
      </v-btn>
    </template>
  </v-alert>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  action: {
    type: Boolean,
    default: false,
  },
  actionText: {
    type: String,
    default: 'Reintentar',
  },
})

defineEmits(['close', 'action'])
</script>