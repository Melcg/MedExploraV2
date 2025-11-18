<template>
  <v-app-bar
    elevation="2"
    color="primary"
    dark
  >
    <!-- Botón de menú (móvil) -->
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mobile"
      @click="navigationStore.toggleDrawer()"
    />

    <!-- Logo y título -->
    <v-toolbar-title class="d-flex align-center cursor-pointer" @click="goHome">
      <v-icon icon="mdi-stethoscope" size="32" class="mr-2" />
      <span class="font-weight-bold">MedExplora</span>
    </v-toolbar-title>

    <!-- Breadcrumbs (desktop) -->
    <v-breadcrumbs
      v-if="!$vuetify.display.mobile && navigationStore.breadcrumbs.length > 1"
      :items="navigationStore.breadcrumbs"
      class="ml-4"
    >
      <template v-slot:prepend>
        <v-icon icon="mdi-chevron-right" size="small" />
      </template>
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right" size="small" />
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.to"
          :disabled="!item.to"
          class="text-white"
        >
          <v-icon v-if="item.icon" :icon="item.icon" size="small" class="mr-1" />
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-spacer />

    <!-- Botón de búsqueda -->
    <v-btn
      icon="mdi-magnify"
      @click="goToSearch"
    />

    <!-- Menú de usuario -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-avatar size="36">
            <v-img
              v-if="authStore.userPhoto"
              :src="authStore.userPhoto"
              :alt="authStore.userName"
            />
            <v-icon v-else icon="mdi-account-circle" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <!-- Info del usuario -->
        <v-list-item>
          <v-list-item-title class="font-weight-bold">
            {{ authStore.userName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ authStore.userEmail }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-divider />

        <!-- Opciones del menú -->
        <v-list-item
          prepend-icon="mdi-account"
          title="Mi Perfil"
          @click="goToProfile"
        />
        <v-list-item
          prepend-icon="mdi-cog"
          title="Configuración"
          @click="openSettings"
        />
        
        <v-divider />

        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar Sesión"
          @click="handleLogout"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNavigationStore } from '@/stores/navigation'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const authStore = useAuthStore()
const navigationStore = useNavigationStore()
const { handleLogout } = useAuth()

const goHome = () => {
  navigationStore.clearSelection()
  router.push({ name: 'Home' })
}

const goToSearch = () => {
  router.push({ name: 'Search' })
}

const goToProfile = () => {
  router.push({ name: 'Profile' })
}

const openSettings = () => {
  // TODO: Implementar modal de configuración
  console.log('Abrir configuración')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.v-breadcrumbs :deep(.v-breadcrumbs-item) {
  color: rgba(255, 255, 255, 0.9);
}

.v-breadcrumbs :deep(.v-breadcrumbs-item--disabled) {
  color: rgba(255, 255, 255, 0.7);
}
</style>