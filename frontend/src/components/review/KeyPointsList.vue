<template>
  <v-list density="compact" class="key-points-list bg-transparent">
    <v-list-item
      v-for="(point, index) in points"
      :key="index"
      class="px-0"
    >
      <template v-slot:prepend>
        <v-avatar
          color="primary"
          size="24"
          class="mr-3"
        >
          <span class="text-caption">{{ index + 1 }}</span>
        </v-avatar>
      </template>
      <v-list-item-title class="text-body-2">
        {{ point }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
defineProps({
  points: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.key-points-list .v-list-item {
  min-height: 40px;
}
</style>