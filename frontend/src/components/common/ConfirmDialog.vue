<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon
          v-if="icon"
          :icon="icon"
          :color="iconColor"
          class="mr-2"
        />
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="handleCancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          :color="confirmColor"
          variant="elevated"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmar',
  },
  message: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'mdi-help-circle',
  },
  iconColor: {
    type: String,
    default: 'warning',
  },
  confirmText: {
    type: String,
    default: 'Confirmar',
  },
  cancelText: {
    type: String,
    default: 'Cancelar',
  },
  confirmColor: {
    type: String,
    default: 'primary',
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const dialog = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
})

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal)
})

const handleConfirm = () => {
  emit('confirm')
  dialog.value = false
}

const handleCancel = () => {
  emit('cancel')
  dialog.value = false
}
</script>