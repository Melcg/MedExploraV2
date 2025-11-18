// src/data/anatomicalRegions.js
import { ANATOMICAL_REGIONS, REGION_COLORS } from '@/utils/constants'

export const anatomicalRegions = [
  {
    id: ANATOMICAL_REGIONS.INSPECCION_GENERAL,
    name: 'Inspección General',
    shortName: 'Inspección',
    description: 'Evaluación inicial del estado general del paciente',
    color: REGION_COLORS[ANATOMICAL_REGIONS.INSPECCION_GENERAL],
    icon: 'mdi-eye-outline',
    position: {
      top: '10%',
      left: '50%',
      width: '100%',
      height: '100%',
    },
    systems: ['general'],
    order: 1,
  },
  {
    id: ANATOMICAL_REGIONS.CABEZA,
    name: 'Cabeza',
    shortName: 'Cabeza',
    description: 'Examen de cráneo, cara y nervios craneales',
    color: REGION_COLORS[ANATOMICAL_REGIONS.CABEZA],
    icon: 'mdi-head',
    position: {
      top: '5%',
      left: '50%',
      width: '15%',
      height: '15%',
    },
    systems: ['neurologico', 'general'],
    order: 2,
  },
  {
    id: ANATOMICAL_REGIONS.CUELLO,
    name: 'Cuello',
    shortName: 'Cuello',
    description: 'Exploración de estructuras cervicales, tiroides y ganglios',
    color: REGION_COLORS[ANATOMICAL_REGIONS.CUELLO],
    icon: 'mdi-skull-scan',
    position: {
      top: '20%',
      left: '50%',
      width: '12%',
      height: '8%',
    },
    systems: ['cardiovascular', 'respiratorio', 'endocrino'],
    order: 3,
  },
  {
    id: ANATOMICAL_REGIONS.TORAX,
    name: 'Tórax',
    shortName: 'Tórax',
    description: 'Examen cardiopulmonar y estructuras torácicas',
    color: REGION_COLORS[ANATOMICAL_REGIONS.TORAX],
    icon: 'mdi-lungs',
    position: {
      top: '28%',
      left: '50%',
      width: '25%',
      height: '20%',
    },
    systems: ['cardiovascular', 'respiratorio', 'osteomuscular'],
    order: 4,
  },
  {
    id: ANATOMICAL_REGIONS.ABDOMEN,
    name: 'Abdomen',
    shortName: 'Abdomen',
    description: 'Exploración de órganos abdominales y digestivos',
    color: REGION_COLORS[ANATOMICAL_REGIONS.ABDOMEN],
    icon: 'mdi-stomach',
    position: {
      top: '48%',
      left: '50%',
      width: '22%',
      height: '15%',
    },
    systems: ['digestivo', 'general'],
    order: 5,
  },
  {
    id: ANATOMICAL_REGIONS.GENITALES,
    name: 'Genitales',
    shortName: 'Genitales',
    description: 'Examen genital masculino y femenino',
    color: REGION_COLORS[ANATOMICAL_REGIONS.GENITALES],
    icon: 'mdi-human-male-female',
    position: {
      top: '63%',
      left: '50%',
      width: '15%',
      height: '10%',
    },
    systems: ['general'],
    order: 6,
  },
  {
    id: ANATOMICAL_REGIONS.MIEMBROS_SUPERIORES,
    name: 'Miembros Superiores',
    shortName: 'M. Superiores',
    description: 'Exploración de brazos, manos y articulaciones superiores',
    color: REGION_COLORS[ANATOMICAL_REGIONS.MIEMBROS_SUPERIORES],
    icon: 'mdi-arm-flex',
    position: {
      top: '30%',
      left: '25%', // Brazo izquierdo
      width: '15%',
      height: '30%',
    },
    positionRight: {
      top: '30%',
      left: '75%', // Brazo derecho
      width: '15%',
      height: '30%',
    },
    systems: ['osteomuscular', 'cardiovascular', 'neurologico'],
    order: 7,
  },
  {
    id: ANATOMICAL_REGIONS.MIEMBROS_INFERIORES,
    name: 'Miembros Inferiores',
    shortName: 'M. Inferiores',
    description: 'Exploración de piernas, pies y articulaciones inferiores',
    color: REGION_COLORS[ANATOMICAL_REGIONS.MIEMBROS_INFERIORES],
    icon: 'mdi-run',
    position: {
      top: '73%',
      left: '40%',
      width: '20%',
      height: '27%',
    },
    systems: ['osteomuscular', 'cardiovascular', 'neurologico'],
    order: 8,
  },
]

// Función helper para obtener una región por ID
export const getRegionById = (id) => {
  return anatomicalRegions.find(region => region.id === id)
}

// Función helper para obtener todas las regiones ordenadas
export const getOrderedRegions = () => {
  return [...anatomicalRegions].sort((a, b) => a.order - b.order)
}

export default anatomicalRegions