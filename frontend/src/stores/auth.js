// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS, MESSAGES } from '@/utils/constants'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')
  const userPhoto = computed(() => user.value?.picture || '')

  // Actions
  const login = async (googleUser) => {
    loading.value = true
    error.value = null

    try {
      // Extraer datos del usuario de Google
      const userData = {
        id: googleUser.sub,
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        loginDate: new Date().toISOString(),
      }

      user.value = userData
      isAuthenticated.value = true

      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))

      return { success: true, message: MESSAGES.LOGIN_SUCCESS }
    } catch (err) {
      error.value = err.message
      return { success: false, message: MESSAGES.LOGIN_ERROR }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    error.value = null

    // Limpiar localStorage
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)

    return { success: true, message: MESSAGES.LOGOUT_SUCCESS }
  }

  const restoreSession = () => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)
      
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        user.value = userData
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (err) {
      console.error('Error al restaurar sesión:', err)
      return false
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    // Getters
    userName,
    userEmail,
    userPhoto,
    // Actions
    login,
    logout,
    restoreSession,
  }
})