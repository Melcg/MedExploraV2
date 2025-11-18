// src/data/techniques.js
import { EXPLORATION_TECHNIQUES, TECHNIQUE_ICONS } from '@/utils/constants'

export const techniques = {
  // INSPECCIÓN GENERAL
  'inspeccion-general': {
    general: [
      {
        id: 'inspeccion-general-basica',
        name: 'Inspección General',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación inicial del estado general del paciente',
        steps: [
          'Observar el nivel de conciencia del paciente',
          'Evaluar el estado nutricional (normonutrido, caquéctico, obeso)',
          'Verificar higiene y cuidado personal',
          'Identificar la fascies (normal, febril, hipocrática, cushingoide, mixedematosa, acromegálica)',
          'Observar la actitud o postura (indiferente, vigilante, ansiosa)',
          'Evaluar la posición (decúbito dorsal, lateral, prono, forzada)',
          'Observar la marcha (normal, claudicante, atáxica, parkinsoniana, hemipléjica)',
          'Evaluar piel y faneras: coloración, lesiones, hidratación'
        ],
        keyPoints: [
          'Primera impresión del paciente',
          'Signos de gravedad inmediatos',
          'Estado general de salud'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/inspeccion-general.jpg'],
          videos: ['/assets/multimedia/videos/inspeccion-general.mp4'],
        }
      }
    ]
  },

  // CABEZA
  'cabeza': {
    neurologico: [
      {
        id: 'cabeza-inspeccion',
        name: 'Inspección de Cabeza',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación visual de la cabeza y estructuras craneofaciales',
        steps: [
          'Observar forma y tamaño: normocéfalo, macrocefalia, microcefalia',
          'Evaluar simetría facial y craneal',
          'Inspeccionar piel y cuero cabelludo',
          'Buscar lesiones, cicatrices o deformidades',
          'Observar características faciales especiales'
        ],
        keyPoints: [
          'Proporciones craneofaciales',
          'Simetría bilateral',
          'Signos de trauma'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/cabeza-inspeccion.jpg'],
          videos: ['/assets/multimedia/videos/cabeza-inspeccion.mp4'],
        }
      },
      {
        id: 'cabeza-palpacion',
        name: 'Palpación de Cabeza',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Exploración táctil del cráneo y cuero cabelludo',
        steps: [
          'Palpar el cuero cabelludo buscando masas o sensibilidad',
          'Evaluar prominencias óseas del cráneo',
          'Buscar depresiones o dolor a la presión',
          'Examinar la articulación temporomandibular (ATM)',
          'Evaluar movimientos de la ATM y buscar chasquidos'
        ],
        keyPoints: [
          'Integridad ósea',
          'Función de ATM',
          'Presencia de masas'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/cabeza-palpacion.jpg'],
          videos: ['/assets/multimedia/videos/cabeza-palpacion.mp4'],
        }
      },
      {
        id: 'nervios-craneales',
        name: 'Exploración de Nervios Craneales',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: 'mdi-brain',
        description: 'Evaluación de los 12 pares craneales',
        steps: [
          'I. Olfatorio: Prueba de olores conocidos en cada fosa nasal',
          'II. Óptico: Agudeza visual, campos visuales, fondo de ojo',
          'III, IV, VI. Oculomotores: Movimientos oculares en "H", pupilas',
          'V. Trigémino: Sensibilidad facial, fuerza de maseteros',
          'VII. Facial: Expresiones faciales, simetría',
          'VIII. Vestibulococlear: Prueba del susurro, Rinne, Weber',
          'IX, X. Glosofaríngeo y Vago: Reflejo nauseoso, úvula',
          'XI. Accesorio: Fuerza de trapecio y esternocleidomastoideo',
          'XII. Hipogloso: Movimientos de la lengua'
        ],
        keyPoints: [
          'Función sensorial y motora',
          'Simetría de respuestas',
          'Signos de lesión neurológica'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/nervios-craneales.jpg'],
          videos: ['/assets/multimedia/videos/nervios-craneales.mp4'],
        }
      }
    ]
  },

  // CUELLO
  'cuello': {
    cardiovascular: [
      {
        id: 'cuello-pulsos',
        name: 'Pulsos Carotídeos',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Evaluación de pulsos carotídeos',
        steps: [
          'Localizar la arteria carótida a ambos lados del cuello',
          'Palpar cada pulso por separado (nunca simultáneamente)',
          'Evaluar intensidad, simetría y características',
          'Auscultar en busca de soplos carotídeos'
        ],
        keyPoints: [
          'Intensidad y simetría',
          'Presencia de soplos',
          'Signos de estenosis'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/pulsos-carotideos.jpg'],
          videos: ['/assets/multimedia/videos/pulsos-carotideos.mp4'],
        }
      },
      {
        id: 'cuello-auscultacion',
        name: 'Auscultación de Cuello',
        techniqueType: EXPLORATION_TECHNIQUES.AUSCULTACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.AUSCULTACION],
        description: 'Auscultación de arterias carótidas y tiroides',
        steps: [
          'Colocar el estetoscopio sobre la arteria carótida',
          'Auscultar en busca de soplos (estenosis arterial)',
          'Auscultar sobre la glándula tiroides',
          'Buscar soplos tiroideos en bocios hipervasculares'
        ],
        keyPoints: [
          'Soplos carotídeos',
          'Soplos tiroideos',
          'Signos de hipertiroidismo'
        ],
        multimedia: {
          audios: ['/assets/multimedia/audios/soplo-carotideo.mp3'],
          images: ['/assets/multimedia/imagenes/auscultacion-cuello.jpg'],
        }
      }
    ],
    endocrino: [
      {
        id: 'tiroides-palpacion',
        name: 'Palpación de Tiroides',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Exploración de la glándula tiroides',
        steps: [
          'Posicionarse detrás del paciente',
          'Localizar el cartílago tiroides y cricoides',
          'Palpar los lóbulos tiroideos con ambas manos',
          'Evaluar tamaño, consistencia y presencia de nódulos',
          'Pedir al paciente que degluta para evaluar movilidad'
        ],
        keyPoints: [
          'Tamaño y simetría',
          'Presencia de nódulos',
          'Consistencia'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/tiroides-palpacion.jpg'],
          videos: ['/assets/multimedia/videos/tiroides-palpacion.mp4'],
        }
      }
    ]
  },

  // TÓRAX
  'torax': {
    cardiovascular: [
      {
        id: 'torax-inspeccion-cardiaca',
        name: 'Inspección Cardíaca',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Inspección de la región precordial',
        steps: [
          'Observar la forma del tórax',
          'Buscar deformidades o asimetrías',
          'Identificar el latido de la punta (ápex)',
          'Observar pulsaciones visibles',
          'Evaluar frecuencia y ritmo respiratorio'
        ],
        keyPoints: [
          'Forma del tórax',
          'Latido apical visible',
          'Pulsaciones anormales'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/inspeccion-cardiaca.jpg'],
        }
      },
      {
        id: 'torax-palpacion-cardiaca',
        name: 'Palpación Cardíaca',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Palpación de la región precordial',
        steps: [
          'Localizar el choque de la punta (ápex) en 5° espacio intercostal',
          'Evaluar características del latido apical',
          'Palpar en busca de frémitos (vibraciones)',
          'Evaluar pulsos supraventriculares',
          'Buscar signos de crecimiento ventricular'
        ],
        keyPoints: [
          'Ubicación del ápex',
          'Presencia de frémitos',
          'Características del latido'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/palpacion-cardiaca.jpg'],
          videos: ['/assets/multimedia/videos/palpacion-cardiaca.mp4'],
        }
      },
      {
        id: 'torax-auscultacion-cardiaca',
        name: 'Auscultación Cardíaca',
        techniqueType: EXPLORATION_TECHNIQUES.AUSCULTACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.AUSCULTACION],
        description: 'Auscultación de los focos cardíacos',
        steps: [
          'Auscultar foco aórtico (2° espacio intercostal derecho)',
          'Auscultar foco pulmonar (2° espacio intercostal izquierdo)',
          'Auscultar foco tricuspídeo (4° espacio intercostal izquierdo)',
          'Auscultar foco mitral (ápex)',
          'Identificar R1 y R2, buscar soplos y ruidos adicionales'
        ],
        keyPoints: [
          'Ruidos cardíacos normales',
          'Soplos patológicos',
          'Ruidos adicionales (R3, R4)'
        ],
        multimedia: {
          audios: [
            '/assets/multimedia/audios/ruidos-cardiacos-normales.mp3',
            '/assets/multimedia/audios/soplo-sistolico.mp3',
            '/assets/multimedia/audios/soplo-diastolico.mp3'
          ],
          images: ['/assets/multimedia/imagenes/focos-cardiacos.jpg'],
          videos: ['/assets/multimedia/videos/auscultacion-cardiaca.mp4'],
        }
      }
    ],
    respiratorio: [
      {
        id: 'torax-inspeccion-respiratoria',
        name: 'Inspección Respiratoria',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación visual del tórax y patrón respiratorio',
        steps: [
          'Observar la forma del tórax (normal, en tonel, excavatum)',
          'Evaluar simetría torácica',
          'Contar frecuencia respiratoria',
          'Identificar el tipo de respiración (torácica, abdominal, mixta)',
          'Observar uso de músculos accesorios',
          'Buscar retracciones intercostales'
        ],
        keyPoints: [
          'Forma del tórax',
          'Patrón respiratorio',
          'Signos de dificultad respiratoria'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/inspeccion-respiratoria.jpg'],
          videos: ['/assets/multimedia/videos/inspeccion-respiratoria.mp4'],
        }
      },
      {
        id: 'torax-palpacion-respiratoria',
        name: 'Palpación Respiratoria',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Evaluación táctil del tórax y vibraciones vocales',
        steps: [
          'Evaluar expansión torácica (amplexión y amplexación)',
          'Palpar en busca de crepitaciones o masas',
          'Evaluar frémito vocal (pedir al paciente decir "33")',
          'Comparar simetría bilateral',
          'Palpar apófisis espinosas'
        ],
        keyPoints: [
          'Expansión simétrica',
          'Vibraciones vocales',
          'Presencia de crepitaciones'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/fremito-vocal.jpg'],
          videos: ['/assets/multimedia/videos/palpacion-respiratoria.mp4'],
        }
      },
      {
        id: 'torax-percusion-respiratoria',
        name: 'Percusión Respiratoria',
        techniqueType: EXPLORATION_TECHNIQUES.PERCUSION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PERCUSION],
        description: 'Percusión del tórax para evaluar campos pulmonares',
        steps: [
          'Realizar percusión sistemática en campos pulmonares',
          'Comparar ambos hemitórax',
          'Identificar sonoridad normal (resonante)',
          'Detectar matidez (consolidación, derrame)',
          'Detectar hiperresonancia (neumotórax, enfisema)',
          'Evaluar excursión de bases pulmonares'
        ],
        keyPoints: [
          'Sonoridad normal vs anormal',
          'Simetría bilateral',
          'Límites de matidez'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/percusion-toracica.jpg'],
          videos: ['/assets/multimedia/videos/percusion-respiratoria.mp4'],
        }
      },
      {
        id: 'torax-auscultacion-respiratoria',
        name: 'Auscultación Respiratoria',
        techniqueType: EXPLORATION_TECHNIQUES.AUSCULTACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.AUSCULTACION],
        description: 'Auscultación de ruidos respiratorios',
        steps: [
          'Auscultar sistemáticamente ambos campos pulmonares',
          'Pedir al paciente respirar profundamente por la boca',
          'Identificar ruidos respiratorios normales (vesicular, broncovesicular)',
          'Buscar ruidos adventicios (estertores, sibilancias, roncus)',
          'Evaluar broncofonia y pectoriloquia',
          'Comparar ambos hemitórax'
        ],
        keyPoints: [
          'Ruidos respiratorios normales',
          'Ruidos adventicios',
          'Simetría bilateral'
        ],
        multimedia: {
          audios: [
            '/assets/multimedia/audios/respiracion-normal.mp3',
            '/assets/multimedia/audios/sibilancias.mp3',
            '/assets/multimedia/audios/estertores.mp3',
            '/assets/multimedia/audios/roncus.mp3'
          ],
          images: ['/assets/multimedia/imagenes/auscultacion-respiratoria.jpg'],
          videos: ['/assets/multimedia/videos/auscultacion-respiratoria.mp4'],
        }
      }
    ]
  },

  // ABDOMEN
  'abdomen': {
    digestivo: [
      {
        id: 'abdomen-inspeccion',
        name: 'Inspección Abdominal',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación visual del abdomen',
        steps: [
          'Observar forma y volumen (plano, excavado, globoso)',
          'Evaluar simetría',
          'Observar movimientos respiratorios',
          'Buscar peristaltismo visible',
          'Identificar cicatrices quirúrgicas',
          'Evaluar coloración de la piel',
          'Buscar circulación colateral, estrías o equimosis'
        ],
        keyPoints: [
          'Forma del abdomen',
          'Cicatrices',
          'Signos de patología'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/abdomen-inspeccion.jpg'],
        }
      },
      {
        id: 'abdomen-auscultacion',
        name: 'Auscultación Abdominal',
        techniqueType: EXPLORATION_TECHNIQUES.AUSCULTACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.AUSCULTACION],
        description: 'Auscultación de ruidos intestinales y vasculares',
        steps: [
          'Auscultar ANTES de palpar o percutir',
          'Evaluar ruidos hidroaéreos en los 4 cuadrantes',
          'Clasificar como normales, aumentados o disminuidos',
          'Buscar soplos sobre aorta',
          'Auscultar arterias renales e ilíacas',
          'Evaluar frote peritoneal si hay inflamación'
        ],
        keyPoints: [
          'Ruidos intestinales',
          'Soplos vasculares',
          'Siempre auscultar primero'
        ],
        multimedia: {
          audios: [
            '/assets/multimedia/audios/ruidos-intestinales-normales.mp3',
            '/assets/multimedia/audios/ruidos-intestinales-aumentados.mp3'
          ],
          images: ['/assets/multimedia/imagenes/auscultacion-abdominal.jpg'],
        }
      },
      {
        id: 'abdomen-percusion',
        name: 'Percusión Abdominal',
        techniqueType: EXPLORATION_TECHNIQUES.PERCUSION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PERCUSION],
        description: 'Percusión para evaluar órganos y líquido',
        steps: [
          'Realizar percusión en los 4 cuadrantes',
          'Identificar timpanismo (gas intestinal)',
          'Identificar matidez (vísceras sólidas, líquido)',
          'Delimitar matidez hepática',
          'Evaluar espacio de Traube (bazo)',
          'Buscar líquido libre (matidez desplazable)'
        ],
        keyPoints: [
          'Timpanismo vs matidez',
          'Límites de órganos',
          'Líquido libre'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/percusion-abdominal.jpg'],
          videos: ['/assets/multimedia/videos/percusion-abdominal.mp4'],
        }
      },
      {
        id: 'abdomen-palpacion',
        name: 'Palpación Abdominal',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Palpación superficial y profunda del abdomen',
        steps: [
          'Iniciar con palpación superficial en los 4 cuadrantes',
          'Evaluar tono muscular y defensa',
          'Realizar palpación profunda',
          'Palpar hígado y bazo',
          'Buscar masas o visceromegalias',
          'Realizar maniobras especiales: Murphy, Blumberg, McBurney, Giordano'
        ],
        keyPoints: [
          'Palpación superficial primero',
          'Características de órganos',
          'Signos de peritonitis'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/palpacion-abdominal.jpg'],
          videos: ['/assets/multimedia/videos/palpacion-abdominal.mp4'],
        }
      }
    ]
  },

  // MIEMBROS SUPERIORES
  'miembros-superiores': {
    osteomuscular: [
      {
        id: 'mmss-inspeccion',
        name: 'Inspección de Miembros Superiores',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación visual de brazos, manos y articulaciones',
        steps: [
          'Observar simetría bilateral',
          'Evaluar coloración y temperatura de la piel',
          'Buscar edema, masas o deformidades',
          'Observar trofia muscular',
          'Evaluar postura y alineación',
          'Inspeccionar manos: pliegues, uñas, dedos'
        ],
        keyPoints: [
          'Simetría',
          'Deformidades',
          'Signos vasculares'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/mmss-inspeccion.jpg'],
        }
      },
      {
        id: 'mmss-palpacion',
        name: 'Palpación de Miembros Superiores',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Exploración táctil de estructuras',
        steps: [
          'Palpar temperatura y textura de la piel',
          'Evaluar pulsos (radial, cubital, braquial)',
          'Palpar ganglios axilares y epitrocleares',
          'Evaluar tono y fuerza muscular',
          'Palpar articulaciones buscando dolor o derrame',
          'Evaluar llenado capilar en dedos'
        ],
        keyPoints: [
          'Pulsos periféricos',
          'Fuerza muscular',
          'Integridad articular'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/mmss-palpacion.jpg'],
          videos: ['/assets/multimedia/videos/mmss-palpacion.mp4'],
        }
      },
      {
        id: 'mmss-movilidad',
        name: 'Evaluación de Movilidad',
        techniqueType: EXPLORATION_TECHNIQUES.MOVILIDAD,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.MOVILIDAD],
        description: 'Evaluación de rangos de movimiento',
        steps: [
          'Evaluar movilidad activa de hombro',
          'Evaluar movilidad de codo (flexión, extensión)',
          'Evaluar pronosupinación del antebrazo',
          'Evaluar movimientos de muñeca',
          'Evaluar movimientos de dedos',
          'Realizar pruebas de fuerza en cada articulación'
        ],
        keyPoints: [
          'Rango de movimiento completo',
          'Dolor durante el movimiento',
          'Limitaciones funcionales'
        ],
        multimedia: {
          videos: ['/assets/multimedia/videos/mmss-movilidad.mp4'],
        }
      }
    ]
  },

  // MIEMBROS INFERIORES
  'miembros-inferiores': {
    osteomuscular: [
      {
        id: 'mmii-inspeccion',
        name: 'Inspección de Miembros Inferiores',
        techniqueType: EXPLORATION_TECHNIQUES.INSPECCION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.INSPECCION],
        description: 'Evaluación visual de piernas y pies',
        steps: [
          'Observar simetría y alineación',
          'Evaluar marcha del paciente',
          'Buscar deformidades (genu varo, valgo)',
          'Observar coloración y temperatura',
          'Evaluar volumen (edema, atrofia)',
          'Inspeccionar pies y dedos',
          'Buscar úlceras o cambios tróficos'
        ],
        keyPoints: [
          'Marcha',
          'Deformidades',
          'Signos vasculares'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/mmii-inspeccion.jpg'],
          videos: ['/assets/multimedia/videos/marcha.mp4'],
        }
      },
      {
        id: 'mmii-palpacion',
        name: 'Palpación de Miembros Inferiores',
        techniqueType: EXPLORATION_TECHNIQUES.PALPACION,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.PALPACION],
        description: 'Exploración táctil de estructuras',
        steps: [
          'Palpar temperatura comparativa',
          'Evaluar pulsos (femoral, poplíteo, tibial posterior, pedio)',
          'Buscar edema y evaluar grado (Godet)',
          'Palpar articulaciones (cadera, rodilla, tobillo)',
          'Evaluar tono y fuerza muscular',
          'Buscar dolor o crepitación'
        ],
        keyPoints: [
          'Pulsos distales',
          'Edema',
          'Integridad articular'
        ],
        multimedia: {
          images: ['/assets/multimedia/imagenes/mmii-palpacion.jpg'],
          videos: ['/assets/multimedia/videos/mmii-palpacion.mp4'],
        }
      },
      {
        id: 'mmii-movilidad',
        name: 'Evaluación de Movilidad',
        techniqueType: EXPLORATION_TECHNIQUES.MOVILIDAD,
        icon: TECHNIQUE_ICONS[EXPLORATION_TECHNIQUES.MOVILIDAD],
        description: 'Evaluación de rangos de movimiento',
        steps: [
          'Evaluar movilidad de cadera (flexión, extensión, rotación)',
          'Evaluar movimientos de rodilla',
          'Evaluar dorsiflexión y flexión plantar del tobillo',
          'Evaluar inversión y eversión del pie',
          'Evaluar movimientos de dedos',
          'Realizar pruebas de fuerza'
        ],
        keyPoints: [
          'Rango de movimiento',
          'Limitaciones',
          'Dolor articular'
        ],
        multimedia: {
          videos: ['/assets/multimedia/videos/mmii-movilidad.mp4'],
        }
      }
    ]
  }
}

// Función helper para obtener técnicas por región y sistema
export const getTechniquesByRegionAndSystem = (regionId, systemId) => {
  return techniques[regionId]?.[systemId] || []
}

// Función helper para obtener una técnica específica
export const getTechniqueById = (techniqueId) => {
  for (const region in techniques) {
    for (const system in techniques[region]) {
      const technique = techniques[region][system].find(t => t.id === techniqueId)
      if (technique) return technique
    }
  }
  return null
}

export default techniques