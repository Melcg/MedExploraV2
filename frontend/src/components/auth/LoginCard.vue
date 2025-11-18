<template>
  <v-card
    class="mx-auto pa-8"
    max-width="450"
    elevation="8"
    rounded="lg"
  >
    <!-- Logo y título -->
    <div class="text-center mb-6">
      <v-icon
        icon="mdi-stethoscope"
        size="64"
        color="primary"
        class="mb-4"
      />
      <h1 class="text-h4 font-weight-bold text-primary mb-2">
        MedExplora
      </h1>
      <p class="text-subtitle-1 text-medium-emphasis">
        Guía Interactiva para Exploración Física Médica
      </p>
    </div>

    <v-divider class="my-6" />

    <!-- Descripción -->
    <div class="text-center mb-6">
      <p class="text-body-2 text-medium-emphasis">
        Inicia sesión con tu cuenta de Google para acceder a la plataforma
      </p>
      <v-alert
        type="info"
        variant="tonal"
        density="compact"
        class="mt-3"
      >
        <div class="text-caption">
          🎓 Solo correos institucionales <strong>@uabc.edu.mx</strong>
        </div>
      </v-alert>
    </div>

    <!-- Verificación de Client ID -->
    <v-alert
      v-if="!hasClientId"
      type="error"
      variant="tonal"
      class="mb-4"
    >
      <v-alert-title>Configuración pendiente</v-alert-title>
      <div class="text-caption">
        El Google Client ID no está configurado. Por favor, configura la variable de entorno VITE_GOOGLE_CLIENT_ID en tu archivo .env
      </div>
    </v-alert>

    <!-- Botón de Google -->
    <div v-if="hasClientId" class="d-flex justify-center mb-4">
      <div id="google-signin-button"></div>
    </div>

    <!-- Loading -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mt-4"
    />

    <!-- Error -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mt-4"
    >
      {{ error }}
    </v-alert>

    <!-- Features -->
    <v-divider class="my-6" />
    
    <div class="text-left">
      <v-list density="compact" class="bg-transparent">
        <v-list-item
          v-for="feature in features"
          :key="feature.text"
          :prepend-icon="feature.icon"
          class="px-0"
        >
          <v-list-item-title class="text-body-2">
            {{ feature.text }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { handleGoogleLogin, initializeGoogleSignIn, renderGoogleButton, googleLoading } = useAuth()

const loading = ref(false)
const error = ref(null)

const features = [
  { icon: 'mdi-human', text: 'Modelo anatómico interactivo' },
  { icon: 'mdi-book-open-variant', text: 'Guías detalladas por sistema' },
  { icon: 'mdi-video', text: 'Videos y audios demostrativos' },
  { icon: 'mdi-checkbox-marked', text: 'Checklists interactivas' },
]

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const hasClientId = computed(() => {
  return clientId && clientId.length > 0 && !clientId.includes('TU_CLIENT_ID')
})

const initGoogle = () => {
  if (!hasClientId.value) {
    error.value = 'Google Client ID no configurado'
    return
  }

  // Verificar si ya existe el script
  if (document.querySelector('script[src*="accounts.google.com"]')) {
    console.log('Script de Google ya cargado')
    setTimeout(() => {
      if (window.google) {
        initializeGoogleSignIn(handleGoogleLogin)
        setTimeout(() => {
          renderGoogleButton('google-signin-button')
        }, 100)
      }
    }, 500)
    return
  }

  // Cargar script de Google Sign-In
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  
  script.onload = () => {
    console.log('Script de Google cargado correctamente')
    loading.value = true
    
    // Esperar a que window.google esté disponible
    const checkGoogle = setInterval(() => {
      if (window.google) {
        clearInterval(checkGoogle)
        console.log('Google API disponible')
        
        try {
          initializeGoogleSignIn(handleGoogleLogin)
          setTimeout(() => {
            const button = document.getElementById('google-signin-button')
            if (button) {
              renderGoogleButton('google-signin-button')
              loading.value = false
            } else {
              console.error('Elemento google-signin-button no encontrado')
              error.value = 'Error al renderizar botón de Google'
              loading.value = false
            }
          }, 100)
        } catch (err) {
          console.error('Error al inicializar Google:', err)
          error.value = 'Error al inicializar Google Sign-In'
          loading.value = false
        }
      }
    }, 100)
    
    // Timeout después de 5 segundos
    setTimeout(() => {
      clearInterval(checkGoogle)
      if (loading.value) {
        error.value = 'Timeout al cargar Google Sign-In'
        loading.value = false
      }
    }, 5000)
  }
  
  script.onerror = (err) => {
    console.error('Error al cargar script de Google:', err)
    error.value = 'No se pudo cargar el script de Google Sign-In'
    loading.value = false
  }
  
  document.head.appendChild(script)
}

onMounted(() => {
  console.log('LoginCard montado')
  console.log('Client ID configurado:', hasClientId.value)
  console.log('Client ID:', clientId)
  
  if (hasClientId.value) {
    initGoogle()
  }
})
</script>

<style scoped>
.v-card {
  backdrop-filter: blur(10px);
}
</style>