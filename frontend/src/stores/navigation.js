// src/stores/navigation.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const selectedRegion = ref(null)
  const selectedSystem = ref(null)
  const selectedTechnique = ref(null)
  const breadcrumbs = ref([])
  const drawerOpen = ref(false)

  // Getters
  const hasSelection = computed(() => {
    return selectedRegion.value !== null
  })

  const currentPath = computed(() => {
    const path = []
    if (selectedRegion.value) path.push(selectedRegion.value)
    if (selectedSystem.value) path.push(selectedSystem.value)
    if (selectedTechnique.value) path.push(selectedTechnique.value)
    return path
  })

  // Actions
  const setRegion = (region) => {
    selectedRegion.value = region
    selectedSystem.value = null
    selectedTechnique.value = null
    updateBreadcrumbs()
  }

  const setSystem = (system) => {
    selectedSystem.value = system
    selectedTechnique.value = null
    updateBreadcrumbs()
  }

  const setTechnique = (technique) => {
    selectedTechnique.value = technique
    updateBreadcrumbs()
  }

  const clearSelection = () => {
    selectedRegion.value = null
    selectedSystem.value = null
    selectedTechnique.value = null
    breadcrumbs.value = []
  }

  const updateBreadcrumbs = () => {
    const crumbs = [
      { text: 'Inicio', to: '/', icon: 'mdi-home' }
    ]

    if (selectedRegion.value) {
      crumbs.push({
        text: selectedRegion.value.name,
        to: `/region/${selectedRegion.value.id}`,
        icon: selectedRegion.value.icon,
      })
    }

    if (selectedSystem.value) {
      crumbs.push({
        text: selectedSystem.value.name,
        icon: selectedSystem.value.icon,
      })
    }

    if (selectedTechnique.value) {
      crumbs.push({
        text: selectedTechnique.value.name,
        icon: selectedTechnique.value.icon,
      })
    }

    breadcrumbs.value = crumbs
  }

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value
  }

  const closeDrawer = () => {
    drawerOpen.value = false
  }

  return {
    // State
    selectedRegion,
    selectedSystem,
    selectedTechnique,
    breadcrumbs,
    drawerOpen,
    // Getters
    hasSelection,
    currentPath,
    // Actions
    setRegion,
    setSystem,
    setTechnique,
    clearSelection,
    updateBreadcrumbs,
    toggleDrawer,
    closeDrawer,
  }
})