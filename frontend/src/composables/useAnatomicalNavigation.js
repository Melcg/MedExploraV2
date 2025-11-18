// src/composables/useAnatomicalNavigation.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import { getRegionById } from '@/data/anatomicalRegions'

export function useAnatomicalNavigation() {
  const router = useRouter()
  const navigationStore = useNavigationStore()

  const hoveredRegion = ref(null)
  const selectedGender = ref('male') // 'male' o 'female'

  // Región actualmente seleccionada
  const currentRegion = computed(() => navigationStore.selectedRegion)

  // Navegar a una región
  const navigateToRegion = (regionId) => {
    const region = getRegionById(regionId)
    if (!region) return

    navigationStore.setRegion(region)
    router.push({
      name: 'RegionDetail',
      params: { regionId: region.id }
    })
  }

  // Hover sobre una región
  const onRegionHover = (regionId) => {
    hoveredRegion.value = getRegionById(regionId)
  }

  // Dejar de hacer hover
  const onRegionLeave = () => {
    hoveredRegion.value = null
  }

  // Cambiar género del modelo
  const toggleGender = () => {
    selectedGender.value = selectedGender.value === 'male' ? 'female' : 'male'
  }

  // Obtener información de tooltip
  const getTooltipInfo = (regionId) => {
    const region = getRegionById(regionId)
    if (!region) return null

    return {
      name: region.name,
      description: region.description,
      color: region.color
    }
  }

  return {
    hoveredRegion,
    selectedGender,
    currentRegion,
    navigateToRegion,
    onRegionHover,
    onRegionLeave,
    toggleGender,
    getTooltipInfo,
  }
}