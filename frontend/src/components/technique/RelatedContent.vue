<template>
  <v-card elevation="2" class="related-content">
    <v-card-title>
      <v-icon icon="mdi-link-variant" class="mr-2" />
      Contenido relacionado
    </v-card-title>
    
    <v-divider />
    
    <v-card-text class="pa-4">
      <!-- Otras técnicas de la misma región -->
      <div v-if="relatedTechniques.length" class="mb-4">
        <h4 class="text-subtitle-2 mb-2">Otras técnicas</h4>
        <v-list density="compact" class="bg-transparent">
          <v-list-item
            v-for="technique in relatedTechniques"
            :key="technique.id"
            :prepend-icon="technique.icon"
            :title="technique.name"
            @click="$emit('navigate-to', technique)"
          >
            <template v-slot:append>
              <v-icon icon="mdi-chevron-right" />
            </template>
          </v-list-item>
        </v-list>
      </div>

      <!-- Acción rápida: Checklist -->
      <v-btn
        block
        color="primary"
        variant="tonal"
        prepend-icon="mdi-clipboard-check"
        class="mb-2"
        @click="$emit('open-checklist')"
      >
        Ver Checklist de esta técnica
      </v-btn>

      <!-- Acción rápida: Modo repaso -->
      <v-btn
        block
        color="secondary"
        variant="tonal"
        prepend-icon="mdi-flash"
        @click="$emit('quick-review')"
      >
        Modo Repaso Rápido
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  relatedTechniques: {
    type: Array,
    default: () => []
  }
})

defineEmits(['navigate-to', 'open-checklist', 'quick-review'])
</script>

<style scoped>
.related-content .v-list-item {
  cursor: pointer;
}

.related-content .v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>