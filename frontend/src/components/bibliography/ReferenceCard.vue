<template>
  <v-card class="reference-card" elevation="2">
    <v-card-text class="pa-4">
      <!-- Header con tipo -->
      <div class="d-flex align-center mb-3">
        <v-icon :icon="getTypeIcon(reference.type)" :color="getTypeColor(reference.type)" class="mr-2" />
        <v-chip size="small" :color="getTypeColor(reference.type)" variant="tonal">
          {{ getTypeLabel(reference.type) }}
        </v-chip>
        <v-spacer />
        <v-chip
          v-if="reference.relevance"
          size="x-small"
          :color="getRelevanceColor(reference.relevance)"
        >
          {{ getRelevanceLabel(reference.relevance) }}
        </v-chip>
      </div>

      <!-- Título -->
      <h3 class="text-h6 mb-2">{{ reference.title }}</h3>

      <!-- Autores -->
      <p class="text-body-2 text-medium-emphasis mb-2">
        <v-icon icon="mdi-account" size="small" class="mr-1" />
        {{ formatAuthors(reference.authors) }}
      </p>

      <!-- Detalles de publicación -->
      <div class="mb-3">
        <!-- Libro -->
        <p v-if="reference.type === 'book'" class="text-caption mb-1">
          <strong>Editorial:</strong> {{ reference.publisher }}, {{ reference.year }}
          <span v-if="reference.edition"> • {{ reference.edition }}</span>
        </p>

        <!-- Artículo -->
        <p v-if="reference.type === 'article'" class="text-caption mb-1">
          <strong>{{ reference.journal }}</strong> {{ reference.year }}
          <span v-if="reference.volume">; {{ reference.volume }}</span><span v-if="reference.issue">({{ reference.issue }})</span><span v-if="reference.pages">: {{ reference.pages }}</span>
        </p>

        <!-- Guía -->
        <p v-if="reference.type === 'guideline'" class="text-caption mb-1">
          <strong>Año:</strong> {{ reference.year }}
        </p>

        <!-- ISBN/DOI -->
        <p v-if="reference.isbn" class="text-caption">
          <strong>ISBN:</strong> {{ reference.isbn }}
        </p>
        <p v-if="reference.doi" class="text-caption">
          <strong>DOI:</strong> {{ reference.doi }}
        </p>
      </div>

      <!-- Descripción -->
      <p v-if="reference.description" class="text-body-2 mb-3">
        {{ reference.description }}
      </p>

      <!-- Temas -->
      <div v-if="reference.topics && reference.topics.length" class="mb-3">
        <v-chip
          v-for="topic in reference.topics"
          :key="topic"
          size="x-small"
          variant="outlined"
          class="mr-1 mb-1"
        >
          {{ topic }}
        </v-chip>
      </div>

      <!-- Acciones -->
      <div class="d-flex gap-2">
        <v-btn
          v-if="reference.url"
          size="small"
          color="primary"
          variant="tonal"
          prepend-icon="mdi-open-in-new"
          :href="reference.url"
          target="_blank"
        >
          Abrir recurso
        </v-btn>
        <v-btn
          size="small"
          variant="text"
          icon="mdi-share-variant"
          @click="$emit('share', reference)"
        />
        <v-btn
          size="small"
          variant="text"
          icon="mdi-bookmark-outline"
          @click="$emit('bookmark', reference)"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  reference: {
    type: Object,
    required: true
  }
})

defineEmits(['share', 'bookmark'])

const getTypeIcon = (type) => {
  const icons = {
    book: 'mdi-book-open-variant',
    article: 'mdi-file-document',
    guideline: 'mdi-clipboard-text',
    multimedia: 'mdi-video-box',
    app: 'mdi-cellphone'
  }
  return icons[type] || 'mdi-file'
}

const getTypeColor = (type) => {
  const colors = {
    book: 'blue',
    article: 'green',
    guideline: 'orange',
    multimedia: 'purple',
    app: 'teal'
  }
  return colors[type] || 'grey'
}

const getTypeLabel = (type) => {
  const labels = {
    book: 'Libro',
    article: 'Artículo',
    guideline: 'Guía',
    multimedia: 'Multimedia',
    app: 'App'
  }
  return labels[type] || type
}

const getRelevanceColor = (relevance) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'info'
  }
  return colors[relevance] || 'grey'
}

const getRelevanceLabel = (relevance) => {
  const labels = {
    high: 'Alta relevancia',
    medium: 'Media',
    low: 'Baja'
  }
  return labels[relevance] || relevance
}

const formatAuthors = (authors) => {
  if (!authors || authors.length === 0) return ''
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return authors.join(' y ')
  return `${authors[0]} et al.`
}
</script>

<style scoped>
.reference-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.reference-card .v-card-text {
  flex: 1;
}

.gap-2 {
  gap: 8px;
}
</style>