// src/composables/useSearch.js
import { ref, computed } from 'vue'
import { searchGlossary } from '@/data/glossary'
import { anatomicalRegions } from '@/data/anatomicalRegions'
import { bodySystems } from '@/data/systems'
import techniques from '@/data/techniques'

export function useSearch() {
  const query = ref('')
  const selectedFilters = ref([])
  const isSearching = ref(false)

  // Tipos de contenido disponibles
  const contentTypes = [
    { value: 'regions', label: 'Regiones', icon: 'mdi-human' },
    { value: 'systems', label: 'Sistemas', icon: 'mdi-heart-pulse' },
    { value: 'techniques', label: 'Técnicas', icon: 'mdi-clipboard-text' },
    { value: 'glossary', label: 'Glosario', icon: 'mdi-book-alphabet' },
  ]

  // Filtros activos
  const hasFilters = computed(() => selectedFilters.value.length > 0)

  // Buscar en regiones
  const searchRegions = (searchQuery) => {
    if (!searchQuery) return []
    
    const lowerQuery = searchQuery.toLowerCase()
    return anatomicalRegions.filter(region =>
      region.name.toLowerCase().includes(lowerQuery) ||
      region.description.toLowerCase().includes(lowerQuery)
    ).map(region => ({
      type: 'region',
      id: region.id,
      title: region.name,
      description: region.description,
      icon: region.icon,
      color: region.color,
      route: { name: 'RegionDetail', params: { regionId: region.id } }
    }))
  }

  // Buscar en sistemas
  const searchSystems = (searchQuery) => {
    if (!searchQuery) return []
    
    const lowerQuery = searchQuery.toLowerCase()
    return bodySystems.filter(system =>
      system.name.toLowerCase().includes(lowerQuery) ||
      system.description.toLowerCase().includes(lowerQuery)
    ).map(system => ({
      type: 'system',
      id: system.id,
      title: system.name,
      description: system.description,
      icon: system.icon,
      color: system.color,
    }))
  }

  // Buscar en técnicas
  const searchTechniques = (searchQuery) => {
    if (!searchQuery) return []
    
    const lowerQuery = searchQuery.toLowerCase()
    const results = []

    for (const regionId in techniques) {
      for (const systemId in techniques[regionId]) {
        const systemTechniques = techniques[regionId][systemId]
        
        systemTechniques.forEach(technique => {
          if (
            technique.name.toLowerCase().includes(lowerQuery) ||
            technique.description.toLowerCase().includes(lowerQuery) ||
            technique.steps?.some(step => step.toLowerCase().includes(lowerQuery))
          ) {
            results.push({
              type: 'technique',
              id: technique.id,
              title: technique.name,
              description: technique.description,
              icon: technique.icon,
              regionId,
              systemId,
              route: {
                name: 'Technique',
                params: { regionId, systemId, techniqueId: technique.id }
              }
            })
          }
        })
      }
    }

    return results
  }

  // Buscar en glosario
  const searchInGlossary = (searchQuery) => {
    if (!searchQuery) return []
    
    return searchGlossary(searchQuery).map(term => ({
      type: 'glossary',
      id: term.id,
      title: term.term,
      description: term.definition,
      icon: 'mdi-book-alphabet',
      category: term.category,
    }))
  }

  // Buscar en todo
  const searchAll = (searchQuery) => {
    isSearching.value = true

    const results = {
      regions: [],
      systems: [],
      techniques: [],
      glossary: []
    }

    if (!searchQuery || searchQuery.length < 2) {
      isSearching.value = false
      return results
    }

    // Si hay filtros, solo buscar en esos tipos
    const typesToSearch = hasFilters.value 
      ? selectedFilters.value 
      : ['regions', 'systems', 'techniques', 'glossary']

    if (typesToSearch.includes('regions')) {
      results.regions = searchRegions(searchQuery)
    }

    if (typesToSearch.includes('systems')) {
      results.systems = searchSystems(searchQuery)
    }

    if (typesToSearch.includes('techniques')) {
      results.techniques = searchTechniques(searchQuery)
    }

    if (typesToSearch.includes('glossary')) {
      results.glossary = searchInGlossary(searchQuery)
    }

    isSearching.value = false
    return results
  }

  // Resultados combinados
  const allResults = computed(() => {
    if (!query.value || query.value.length < 2) return []
    
    const results = searchAll(query.value)
    
    return [
      ...results.regions,
      ...results.systems,
      ...results.techniques,
      ...results.glossary,
    ]
  })

  // Contar resultados
  const resultCount = computed(() => allResults.value.length)

  // Limpiar búsqueda
  const clearSearch = () => {
    query.value = ''
    selectedFilters.value = []
  }

  // Toggle filtro
  const toggleFilter = (filterValue) => {
    const index = selectedFilters.value.indexOf(filterValue)
    if (index > -1) {
      selectedFilters.value.splice(index, 1)
    } else {
      selectedFilters.value.push(filterValue)
    }
  }

  return {
    query,
    selectedFilters,
    isSearching,
    contentTypes,
    hasFilters,
    allResults,
    resultCount,
    searchAll,
    clearSearch,
    toggleFilter,
  }
}