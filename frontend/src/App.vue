<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useChecklistStore } from '@/stores/checklist'
import { useProgressStore } from '@/stores/progress'

const authStore = useAuthStore()
const checklistStore = useChecklistStore()
const progressStore = useProgressStore()

onMounted(() => {
  try {
    // Intentar restaurar sesión desde localStorage
    authStore.restoreSession()
    
    // Cargar checklists guardadas
    checklistStore.loadFromLocalStorage()
    
    // Cargar progreso
    progressStore.loadFromLocalStorage()
    
    // Actualizar racha
    progressStore.updateStreak()
  } catch (error) {
    console.error('Error al inicializar:', error)
  }
})
</script>

<style>
/* Estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow-x: hidden;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Personalización de scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>