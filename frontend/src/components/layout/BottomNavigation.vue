<template>
  <v-bottom-navigation
    v-if="$vuetify.display.mobile"
    v-model="activeTab"
    color="primary"
    grow
    class="bottom-nav-custom"
  >
    <v-btn
      value="home"
      @click="goTo('Home')"
    >
      <v-icon>mdi-home</v-icon>
      <span>Inicio</span>
    </v-btn>

    <v-btn
      value="cases"
      @click="goTo('ClinicalCases')"
    >
      <v-icon>mdi-clipboard-text</v-icon>
      <span>Casos</span>
    </v-btn>

    <v-btn
      value="review"
      @click="goTo('QuickReview')"
    >
      <v-icon>mdi-flash</v-icon>
      <span>Repaso</span>
    </v-btn>

    <v-btn
      value="profile"
      @click="goTo('Profile')"
    >
      <v-icon>mdi-account</v-icon>
      <span>Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeTab = ref('home')

// Actualizar tab activo según la ruta
watch(() => route.name, (newRoute) => {
  const routeMap = {
    'Home': 'home',
    'ClinicalCases': 'cases',
    'CaseDetail': 'cases',
    'QuickReview': 'review',
    'Profile': 'profile',
  }
  activeTab.value = routeMap[newRoute] || 'home'
}, { immediate: true })

const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
.bottom-nav-custom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.v-btn {
  min-width: 0 !important;
  flex: 1;
}
</style>