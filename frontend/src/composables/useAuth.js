// src/composables/useAuth.js
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  const googleLoading = ref(false)
  const error = ref(null)

  // Dominios permitidos
  const ALLOWED_DOMAINS = ['uabc.edu.mx']

  // Verificar si el correo es del dominio permitido
  const isAllowedDomain = (email) => {
    if (!email) return false
    const domain = email.split('@')[1]
    return ALLOWED_DOMAINS.includes(domain)
  }

  // Callback para Google Sign-In
  const handleGoogleLogin = async (response) => {
    googleLoading.value = true
    error.value = null

    try {
      // Decodificar el JWT de Google
      const credential = response.credential
      const payload = JSON.parse(atob(credential.split('.')[1]))

      console.log('Usuario intentando iniciar sesión:', payload.email)

      // Verificar dominio
      if (!isAllowedDomain(payload.email)) {
        error.value = `Acceso denegado. Solo se permiten correos @uabc.edu.mx`
        console.error('Dominio no permitido:', payload.email)
        
        // Mostrar alerta al usuario
        alert(`❌ Acceso Denegado\n\nSolo se permite el acceso con correos institucionales de UABC (@uabc.edu.mx).\n\nTu correo: ${payload.email}`)
        
        googleLoading.value = false
        return
      }

      console.log('Dominio verificado. Iniciando sesión...')

      // Iniciar sesión en el store
      const result = await authStore.login(payload)

      if (result.success) {
        console.log('Sesión iniciada correctamente')
        // Redirigir a Home
        router.push({ name: 'Home' })
      } else {
        error.value = result.message
      }
    } catch (err) {
      console.error('Error en Google Login:', err)
      error.value = 'Error al iniciar sesión con Google'
    } finally {
      googleLoading.value = false
    }
  }

  // Inicializar Google Sign-In
  const initializeGoogleSignIn = (callback) => {
    if (window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: callback,
          auto_select: false,
          cancel_on_tap_outside: true,
        })
        console.log('Google Sign-In inicializado correctamente')
      } catch (err) {
        console.error('Error al inicializar Google Sign-In:', err)
        error.value = 'Error al inicializar Google Sign-In'
      }
    }
  }

  // Renderizar botón de Google
  const renderGoogleButton = (elementId) => {
    if (window.google) {
      try {
        window.google.accounts.id.renderButton(
          document.getElementById(elementId),
          {
            theme: 'outline',
            size: 'large',
            width: 300,
            text: 'signin_with',
            locale: 'es',
            logo_alignment: 'left',
          }
        )
        console.log('Botón de Google renderizado')
      } catch (err) {
        console.error('Error al renderizar botón:', err)
      }
    }
  }

  // Logout
  const handleLogout = async () => {
    authStore.logout()
    router.push({ name: 'Login' })
  }

  return {
    googleLoading,
    error,
    handleGoogleLogin,
    initializeGoogleSignIn,
    renderGoogleButton,
    handleLogout,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  }
}