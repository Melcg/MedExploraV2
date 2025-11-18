<template>
  <v-alert
    type="error"
    variant="tonal"
    density="compact"
    class="signs-highlight"
  >
    <ul class="mb-0 pl-4">
      <li
        v-for="(sign, index) in signs"
        :key="index"
        class="mb-2"
      >
        <strong>{{ sign }}</strong>
      </li>
    </ul>
  </v-alert>
</template>

<script setup>
defineProps({
  signs: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.signs-highlight ul {
  list-style-type: none;
  padding-left: 0;
}

.signs-highlight li {
  position: relative;
  padding-left: 24px;
}

.signs-highlight li::before {
  content: '⚠️';
  position: absolute;
  left: 0;
}
</style>