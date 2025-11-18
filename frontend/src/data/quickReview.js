// src/data/quickReview.js
import { ANATOMICAL_REGIONS } from '@/utils/constants'

export const quickReviewCards = [
  // Inspección General
  {
    id: 'review-inspeccion-general',
    regionId: ANATOMICAL_REGIONS.INSPECCION_GENERAL,
    title: 'Inspección General',
    keyPoints: [
      'Nivel de conciencia',
      'Estado nutricional',
      'Fascies característica',
      'Postura y marcha',
      'Piel y faneras'
    ],
    criticalSigns: [
      'Fascies hipocrática (gravedad extrema)',
      'Cianosis central',
      'Diaforesis profusa',
      'Signos de shock'
    ],
    color: '#9C27B0'
  },

  // Cabeza
  {
    id: 'review-cabeza',
    regionId: ANATOMICAL_REGIONS.CABEZA,
    title: 'Exploración de Cabeza',
    keyPoints: [
      'Forma: normocéfalo, macro/microcefalia',
      'Simetría facial',
      'Palpación del cráneo',
      '12 pares craneales',
      'ATM: movilidad y chasquidos'
    ],
    criticalSigns: [
      'Asimetría facial súbita (EVC)',
      'Pupilas anisocóricas',
      'Pérdida de reflejo corneal',
      'Diplopía'
    ],
    color: '#F44336'
  },

  // Cuello
  {
    id: 'review-cuello',
    regionId: ANATOMICAL_REGIONS.CUELLO,
    title: 'Exploración de Cuello',
    keyPoints: [
      'Simetría y movilidad',
      'Posición traqueal',
      'Tiroides: tamaño y nódulos',
      'Ganglios cervicales',
      'Pulsos carotídeos'
    ],
    criticalSigns: [
      'Desviación traqueal (neumotórax)',
      'Ingurgitación yugular',
      'Soplo carotídeo',
      'Rigidez de nuca'
    ],
    color: '#FF9800'
  },

  // Tórax - Cardiovascular
  {
    id: 'review-torax-cardiovascular',
    regionId: ANATOMICAL_REGIONS.TORAX,
    title: 'Sistema Cardiovascular',
    keyPoints: [
      'Ápex: 5° espacio intercostal, línea medioclavicular',
      'Focos de auscultación: aórtico, pulmonar, tricuspídeo, mitral',
      'R1 (sístole) y R2 (diástole)',
      'Identificar soplos',
      'Pulsos periféricos'
    ],
    criticalSigns: [
      'Soplo diastólico (siempre patológico)',
      'Galope (R3 o R4)',
      'Frémito palpable',
      'Pulsos asimétricos'
    ],
    color: '#F44336'
  },

  // Tórax - Respiratorio
  {
    id: 'review-torax-respiratorio',
    regionId: ANATOMICAL_REGIONS.TORAX,
    title: 'Sistema Respiratorio',
    keyPoints: [
      'Frecuencia: 12-20 rpm',
      'Expansión simétrica',
      'Frémito vocal (33)',
      'Percusión: matidez vs resonancia',
      'Ruidos adventicios'
    ],
    criticalSigns: [
      'Hiperresonancia (neumotórax)',
      'Matidez y ausencia de ruidos (derrame)',
      'Sibilancias difusas (broncoespasmo)',
      'Uso de músculos accesorios'
    ],
    color: '#2196F3'
  },

  // Abdomen
  {
    id: 'review-abdomen',
    regionId: ANATOMICAL_REGIONS.ABDOMEN,
    title: 'Exploración Abdominal',
    keyPoints: [
      'Orden: Inspección → Auscultación → Percusión → Palpación',
      'Ruidos hidroaéreos en 4 cuadrantes',
      'Matidez hepática',
      'Palpación superficial y profunda',
      'Signos de irritación peritoneal'
    ],
    criticalSigns: [
      'Blumberg positivo (peritonitis)',
      'Abdomen en tabla (defensa muscular)',
      'Murphy positivo (colecistitis)',
      'Masa pulsátil (aneurisma)'
    ],
    color: '#4CAF50'
  },

  // Miembros Superiores
  {
    id: 'review-mmss',
    regionId: ANATOMICAL_REGIONS.MIEMBROS_SUPERIORES,
    title: 'Miembros Superiores',
    keyPoints: [
      'Pulsos: radial, cubital, braquial',
      'Llenado capilar < 2 segundos',
      'Fuerza muscular 5/5',
      'Sensibilidad táctil',
      'Reflejos osteotendinosos'
    ],
    criticalSigns: [
      'Ausencia de pulsos',
      'Acropaquia (enfermedad crónica)',
      'Temblor fino (hipertiroidismo)',
      'Fasciculaciones (neurológico)'
    ],
    color: '#00BCD4'
  },

  // Miembros Inferiores
  {
    id: 'review-mmii',
    regionId: ANATOMICAL_REGIONS.MIEMBROS_INFERIORES,
    title: 'Miembros Inferiores',
    keyPoints: [
      'Marcha: normal, claudicante, atáxica',
      'Pulsos: femoral, poplíteo, tibial, pedio',
      'Edema: signo de Godet',
      'Fuerza y sensibilidad',
      'Reflejos: patelar, aquíleo'
    ],
    criticalSigns: [
      'Edema asimétrico (TVP)',
      'Ausencia de pulsos distales',
      'Úlceras venosas',
      'Marcha hemipléjica (EVC)'
    ],
    color: '#3F51B5'
  },

  // Nervios Craneales
  {
    id: 'review-nervios-craneales',
    regionId: ANATOMICAL_REGIONS.CABEZA,
    title: 'Nervios Craneales - Resumen',
    keyPoints: [
      'I: Olfatorio → Olores',
      'II: Óptico → Visión, campos visuales',
      'III, IV, VI: Motores oculares',
      'V: Trigémino → Sensibilidad facial',
      'VII: Facial → Expresión',
      'VIII: Auditivo → Audición',
      'IX, X: Deglución, reflejo nauseoso',
      'XI: Esternocleidomastoideo',
      'XII: Lengua'
    ],
    criticalSigns: [
      'Parálisis facial periférica vs central',
      'Anisocoria',
      'Pérdida de campo visual',
      'Disartria'
    ],
    color: '#FF9800'
  },

  // Signos Vitales
  {
    id: 'review-signos-vitales',
    regionId: ANATOMICAL_REGIONS.INSPECCION_GENERAL,
    title: 'Signos Vitales - Valores Normales',
    keyPoints: [
      'FC: 60-100 lpm (adulto)',
      'FR: 12-20 rpm',
      'PA: < 120/80 mmHg',
      'Temperatura: 36.5-37.5°C',
      'SpO2: > 95%'
    ],
    criticalSigns: [
      'Bradicardia < 60 lpm',
      'Taquicardia > 100 lpm',
      'Hipotensión < 90/60',
      'Fiebre > 38°C'
    ],
    color: '#E91E63'
  }
]

// Función para obtener cards por región
export const getReviewCardsByRegion = (regionId) => {
  return quickReviewCards.filter(card => card.regionId === regionId)
}

// Función para obtener una card por ID
export const getReviewCardById = (id) => {
  return quickReviewCards.find(card => card.id === id)
}

export default quickReviewCards