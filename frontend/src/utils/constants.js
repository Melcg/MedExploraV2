// src/utils/constants.js

// Regiones anatómicas
export const ANATOMICAL_REGIONS = {
  INSPECCION_GENERAL: 'inspeccion-general',
  CABEZA: 'cabeza',
  CUELLO: 'cuello',
  TORAX: 'torax',
  ABDOMEN: 'abdomen',
  GENITALES: 'genitales',
  MIEMBROS_SUPERIORES: 'miembros-superiores',
  MIEMBROS_INFERIORES: 'miembros-inferiores',
}

// Sistemas corporales
export const BODY_SYSTEMS = {
  CARDIOVASCULAR: 'cardiovascular',
  RESPIRATORIO: 'respiratorio',
  DIGESTIVO: 'digestivo',
  NEUROLOGICO: 'neurologico',
  OSTEOMUSCULAR: 'osteomuscular',
  ENDOCRINO: 'endocrino',
  GENERAL: 'general',
}

// Técnicas de exploración
export const EXPLORATION_TECHNIQUES = {
  INSPECCION: 'inspeccion',
  PALPACION: 'palpacion',
  PERCUSION: 'percusion',
  AUSCULTACION: 'auscultacion',
  MOVILIDAD: 'movilidad',
}

// Tipos de multimedia
export const MULTIMEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
}

// Colores por región (para UI)
export const REGION_COLORS = {
  [ANATOMICAL_REGIONS.INSPECCION_GENERAL]: '#9C27B0',
  [ANATOMICAL_REGIONS.CABEZA]: '#F44336',
  [ANATOMICAL_REGIONS.CUELLO]: '#FF9800',
  [ANATOMICAL_REGIONS.TORAX]: '#2196F3',
  [ANATOMICAL_REGIONS.ABDOMEN]: '#4CAF50',
  [ANATOMICAL_REGIONS.GENITALES]: '#E91E63',
  [ANATOMICAL_REGIONS.MIEMBROS_SUPERIORES]: '#00BCD4',
  [ANATOMICAL_REGIONS.MIEMBROS_INFERIORES]: '#3F51B5',
}

// Íconos por sistema
export const SYSTEM_ICONS = {
  [BODY_SYSTEMS.CARDIOVASCULAR]: 'mdi-heart-pulse',
  [BODY_SYSTEMS.RESPIRATORIO]: 'mdi-lungs',
  [BODY_SYSTEMS.DIGESTIVO]: 'mdi-stomach',
  [BODY_SYSTEMS.NEUROLOGICO]: 'mdi-brain',
  [BODY_SYSTEMS.OSTEOMUSCULAR]: 'mdi-bone',
  [BODY_SYSTEMS.ENDOCRINO]: 'mdi-flask',
  [BODY_SYSTEMS.GENERAL]: 'mdi-human',
}

// Íconos por técnica
export const TECHNIQUE_ICONS = {
  [EXPLORATION_TECHNIQUES.INSPECCION]: 'mdi-eye',
  [EXPLORATION_TECHNIQUES.PALPACION]: 'mdi-hand-back-right',
  [EXPLORATION_TECHNIQUES.PERCUSION]: 'mdi-hand-wave',
  [EXPLORATION_TECHNIQUES.AUSCULTACION]: 'mdi-stethoscope',
  [EXPLORATION_TECHNIQUES.MOVILIDAD]: 'mdi-run',
}

// Configuración de la app
export const APP_CONFIG = {
  NAME: 'MedExplora',
  VERSION: '1.0.0',
  DESCRIPTION: 'Guía Interactiva para Exploración Física Médica',
  MAX_TAPS_TO_CONTENT: 3,
  LOAD_TIME_TARGET: 2000, // ms
  VIDEO_START_TIME: 1500, // ms
}

// Mensajes de la aplicación
export const MESSAGES = {
  WELCOME: '¡Bienvenido a MedExplora!',
  LOGIN_SUCCESS: 'Sesión iniciada correctamente',
  LOGIN_ERROR: 'Error al iniciar sesión. Intenta de nuevo.',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  CHECKLIST_COMPLETED: '¡Checklist completada!',
  PROGRESS_SAVED: 'Progreso guardado',
  ERROR_LOADING: 'Error al cargar contenido',
  NO_CONNECTION: 'Sin conexión a internet',
}

// Configuración de localStorage
export const STORAGE_KEYS = {
  USER_DATA: 'medexplora_user',
  PROGRESS: 'medexplora_progress',
  CHECKLISTS: 'medexplora_checklists',
  SETTINGS: 'medexplora_settings',
  THEME: 'medexplora_theme',
}