// src/data/systems.js
import { BODY_SYSTEMS, SYSTEM_ICONS } from '@/utils/constants'

export const bodySystems = [
  {
    id: BODY_SYSTEMS.GENERAL,
    name: 'General',
    description: 'Evaluación general del paciente',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.GENERAL],
    color: '#9C27B0',
  },
  {
    id: BODY_SYSTEMS.CARDIOVASCULAR,
    name: 'Cardiovascular',
    description: 'Sistema circulatorio: corazón y vasos sanguíneos',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.CARDIOVASCULAR],
    color: '#F44336',
  },
  {
    id: BODY_SYSTEMS.RESPIRATORIO,
    name: 'Respiratorio',
    description: 'Sistema respiratorio: pulmones y vías aéreas',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.RESPIRATORIO],
    color: '#2196F3',
  },
  {
    id: BODY_SYSTEMS.DIGESTIVO,
    name: 'Digestivo',
    description: 'Sistema digestivo y órganos abdominales',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.DIGESTIVO],
    color: '#4CAF50',
  },
  {
    id: BODY_SYSTEMS.NEUROLOGICO,
    name: 'Neurológico',
    description: 'Sistema nervioso: cerebro, nervios y reflejos',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.NEUROLOGICO],
    color: '#FF9800',
  },
  {
    id: BODY_SYSTEMS.OSTEOMUSCULAR,
    name: 'Osteomuscular',
    description: 'Sistema musculoesquelético: huesos, músculos y articulaciones',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.OSTEOMUSCULAR],
    color: '#00BCD4',
  },
  {
    id: BODY_SYSTEMS.ENDOCRINO,
    name: 'Endocrino',
    description: 'Sistema endocrino: glándulas y hormonas',
    icon: SYSTEM_ICONS[BODY_SYSTEMS.ENDOCRINO],
    color: '#E91E63',
  },
]

// Mapeo de sistemas disponibles por región
export const systemsByRegion = {
  'inspeccion-general': ['general'],
  'cabeza': ['neurologico', 'general'],
  'cuello': ['cardiovascular', 'respiratorio', 'endocrino'],
  'torax': ['cardiovascular', 'respiratorio', 'osteomuscular'],
  'abdomen': ['digestivo', 'general'],
  'genitales': ['general'],
  'miembros-superiores': ['osteomuscular', 'cardiovascular', 'neurologico'],
  'miembros-inferiores': ['osteomuscular', 'cardiovascular', 'neurologico'],
}

// Función helper para obtener sistemas de una región
export const getSystemsByRegion = (regionId) => {
  const systemIds = systemsByRegion[regionId] || []
  return bodySystems.filter(system => systemIds.includes(system.id))
}

// Función helper para obtener un sistema por ID
export const getSystemById = (id) => {
  return bodySystems.find(system => system.id === id)
}

export default bodySystems