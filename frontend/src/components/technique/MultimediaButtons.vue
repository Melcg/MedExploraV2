<template>
  <v-card elevation="2" class="multimedia-buttons">
    <v-card-title>
      <v-icon icon="mdi-multimedia" class="mr-2" />
      Recursos Multimedia
    </v-card-title>
    
    <v-divider />
    
    <v-card-text class="pa-4">
      <v-row>
        <!-- Imágenes -->
        <v-col
          v-if="hasImages"
          cols="12"
          sm="6"
          md="4"
        >
          <v-btn
            block
            size="large"
            color="blue"
            variant="elevated"
            prepend-icon="mdi-image-multiple"
            @click="$emit('open-images')"
          >
            Imágenes
            <v-chip
              size="small"
              class="ml-2"
              color="white"
              text-color="blue"
            >
              {{ imageCount }}
            </v-chip>
          </v-btn>
        </v-col>

        <!-- Videos -->
        <v-col
          v-if="hasVideos"
          cols="12"
          sm="6"
          md="4"
        >
          <v-btn
            block
            size="large"
            color="red"
            variant="elevated"
            prepend-icon="mdi-video-box"
            @click="$emit('open-videos')"
          >
            Videos
            <v-chip
              size="small"
              class="ml-2"
              color="white"
              text-color="red"
            >
              {{ videoCount }}
            </v-chip>
          </v-btn>
        </v-col>

        <!-- Audios -->
        <v-col
          v-if="hasAudios"
          cols="12"
          sm="6"
          md="4"
        >
          <v-btn
            block
            size="large"
            color="purple"
            variant="elevated"
            prepend-icon="mdi-volume-high"
            @click="$emit('open-audios')"
          >
            Audios
            <v-chip
              size="small"
              class="ml-2"
              color="white"
              text-color="purple"
            >
              {{ audioCount }}
            </v-chip>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Mensaje si no hay multimedia -->
      <v-alert
        v-if="!hasAnyMultimedia"
        type="info"
        variant="tonal"
        class="mt-2"
      >
        No hay recursos multimedia disponibles para esta técnica.
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  multimedia: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['open-images', 'open-videos', 'open-audios'])

const hasImages = computed(() => {
  return props.multimedia?.images?.length > 0
})

const hasVideos = computed(() => {
  return props.multimedia?.videos?.length > 0
})

const hasAudios = computed(() => {
  return props.multimedia?.audios?.length > 0
})

const hasAnyMultimedia = computed(() => {
  return hasImages.value || hasVideos.value || hasAudios.value
})

const imageCount = computed(() => props.multimedia?.images?.length || 0)
const videoCount = computed(() => props.multimedia?.videos?.length || 0)
const audioCount = computed(() => props.multimedia?.audios?.length || 0)
</script>

<style scoped>
.multimedia-buttons .v-btn {
  text-transform: none;
}
</style>