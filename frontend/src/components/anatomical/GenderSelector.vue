<template>
  <div class="gender-selector">
    <v-btn-toggle
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      mandatory
      color="primary"
      rounded="lg"
      elevation="2"
    >
      <v-btn value="male" size="small">
        <v-icon start>mdi-human-male</v-icon>
        Masculino
      </v-btn>
      <v-btn value="female" size="small">
        <v-icon start>mdi-human-female</v-icon>
        Femenino
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'male'
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.gender-selector {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

@media (max-width: 960px) {
  .gender-selector {
    top: 70px;
  }
}
</style>