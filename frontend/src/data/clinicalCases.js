// src/data/clinicalCases.js

export const clinicalCases = [
  {
    id: 'case-001',
    title: 'Dolor abdominal agudo',
    difficulty: 'intermediate',
    category: 'Abdomen',
    estimatedTime: 15, // minutos
    description: 'Paciente con dolor abdominal agudo que requiere evaluación sistemática.',
    objectives: [
      'Realizar exploración abdominal completa',
      'Identificar signos de irritación peritoneal',
      'Determinar localización del dolor'
    ],
    patient: {
      name: 'Juan Pérez',
      age: 35,
      gender: 'Masculino',
      chiefComplaint: 'Dolor abdominal de 6 horas de evolución'
    },
    history: {
      present: 'Paciente masculino de 35 años que acude por dolor abdominal de 6 horas de evolución, localizado inicialmente en epigastrio, posteriormente migró a fosa ilíaca derecha. El dolor es constante, intensidad 8/10, se acompaña de náusea y un episodio de vómito. Niega fiebre.',
      past: 'Sin antecedentes de importancia. No cirugías previas.',
      medications: 'Ninguno',
      allergies: 'Ninguna conocida'
    },
    vitalSigns: {
      temperature: '37.8°C',
      heartRate: '95 lpm',
      bloodPressure: '130/80 mmHg',
      respiratoryRate: '20 rpm',
      oxygenSaturation: '98%'
    },
    physicalExam: {
      general: 'Paciente consciente, orientado, ansioso por el dolor. Posición antálgica.',
      steps: [
        {
          id: 'step-1',
          region: 'abdomen',
          technique: 'inspeccion',
          instruction: 'Observa el abdomen del paciente',
          findings: [
            {
              id: 'finding-1',
              text: 'Abdomen plano',
              correct: true,
              points: 10
            },
            {
              id: 'finding-2',
              text: 'Abdomen distendido',
              correct: false,
              points: 0
            }
          ],
          correctFinding: 'Abdomen plano, sin distensión ni masas visibles'
        },
        {
          id: 'step-2',
          region: 'abdomen',
          technique: 'auscultacion',
          instruction: 'Ausculta los ruidos intestinales',
          findings: [
            {
              id: 'finding-3',
              text: 'Ruidos hidroaéreos disminuidos',
              correct: true,
              points: 10
            },
            {
              id: 'finding-4',
              text: 'Ruidos hidroaéreos normales',
              correct: false,
              points: 0
            }
          ],
          correctFinding: 'Ruidos hidroaéreos disminuidos'
        },
        {
          id: 'step-3',
          region: 'abdomen',
          technique: 'palpacion',
          instruction: 'Realiza palpación abdominal',
          findings: [
            {
              id: 'finding-5',
              text: 'Dolor en punto de McBurney',
              correct: true,
              points: 15
            },
            {
              id: 'finding-6',
              text: 'Dolor difuso',
              correct: false,
              points: 0
            }
          ],
          correctFinding: 'Dolor intenso en punto de McBurney con defensa muscular'
        },
        {
          id: 'step-4',
          region: 'abdomen',
          technique: 'signos-especiales',
          instruction: 'Evalúa signos de irritación peritoneal',
          findings: [
            {
              id: 'finding-7',
              text: 'Signo de Blumberg positivo',
              correct: true,
              points: 20
            },
            {
              id: 'finding-8',
              text: 'Signo de Blumberg negativo',
              correct: false,
              points: 0
            }
          ],
          correctFinding: 'Signo de Blumberg positivo, Rovsing positivo'
        }
      ]
    },
    diagnosis: {
      most_likely: 'Apendicitis aguda',
      differential: [
        'Gastroenteritis aguda',
        'Enfermedad inflamatoria intestinal',
        'Cálculo renal'
      ],
      explanation: 'Los hallazgos clínicos de dolor en fosa ilíaca derecha, migración del dolor desde epigastrio, náusea, vómito, dolor en punto de McBurney y signos de Blumberg y Rovsing positivos son altamente sugestivos de apendicitis aguda.'
    },
    learning_points: [
      'La migración del dolor de epigastrio a fosa ilíaca derecha es característica de apendicitis',
      'El signo de Blumberg es altamente específico para irritación peritoneal',
      'La auscultación debe realizarse ANTES de la palpación en abdomen agudo',
      'El punto de McBurney es un landmark anatómico clave en apendicitis'
    ],
    completed: false,
    score: 0
  },

  {
    id: 'case-002',
    title: 'Disnea y dolor torácico',
    difficulty: 'advanced',
    category: 'Tórax',
    estimatedTime: 20,
    description: 'Evaluación de paciente con disnea y dolor torácico.',
    objectives: [
      'Realizar exploración cardiopulmonar completa',
      'Identificar signos de insuficiencia cardíaca',
      'Evaluar soplos cardíacos'
    ],
    patient: {
      name: 'María González',
      age: 68,
      gender: 'Femenino',
      chiefComplaint: 'Dificultad para respirar y dolor en el pecho'
    },
    history: {
      present: 'Paciente femenina de 68 años con disnea de moderados esfuerzos de 3 semanas de evolución, progresiva hasta disnea de reposo. Refiere ortopnea (3 almohadas). Dolor torácico opresivo ocasional. Edema en miembros inferiores de reciente aparición.',
      past: 'Hipertensión arterial de 10 años de evolución, en tratamiento irregular. Diabetes mellitus tipo 2 de 5 años.',
      medications: 'Enalapril 10mg/día, Metformina 850mg c/12h (toma irregular)',
      allergies: 'Ninguna conocida'
    },
    vitalSigns: {
      temperature: '36.5°C',
      heartRate: '105 lpm',
      bloodPressure: '150/95 mmHg',
      respiratoryRate: '24 rpm',
      oxygenSaturation: '92% aire ambiente'
    },
    physicalExam: {
      general: 'Paciente en posición semisentada, taquipneica, ansiosa.',
      steps: [
        {
          id: 'step-1',
          region: 'torax',
          technique: 'inspeccion',
          instruction: 'Observa el tórax y patrón respiratorio',
          findings: [
            {
              id: 'finding-1',
              text: 'Taquipnea con uso de músculos accesorios',
              correct: true,
              points: 10
            },
            {
              id: 'finding-2',
              text: 'Respiración normal',
              correct: false,
              points: 0
            }
          ]
        },
        {
          id: 'step-2',
          region: 'torax',
          technique: 'auscultacion-pulmonar',
          instruction: 'Ausculta los campos pulmonares',
          findings: [
            {
              id: 'finding-3',
              text: 'Estertores crepitantes bibasales',
              correct: true,
              points: 15
            },
            {
              id: 'finding-4',
              text: 'Murmullo vesicular normal',
              correct: false,
              points: 0
            }
          ]
        },
        {
          id: 'step-3',
          region: 'torax',
          technique: 'auscultacion-cardiaca',
          instruction: 'Ausculta los focos cardíacos',
          findings: [
            {
              id: 'finding-5',
              text: 'R3 audible (galope)',
              correct: true,
              points: 20
            },
            {
              id: 'finding-6',
              text: 'Ruidos cardíacos normales',
              correct: false,
              points: 0
            }
          ]
        },
        {
          id: 'step-4',
          region: 'miembros-inferiores',
          technique: 'palpacion',
          instruction: 'Evalúa miembros inferiores',
          findings: [
            {
              id: 'finding-7',
              text: 'Edema con fóvea bilateral 3+',
              correct: true,
              points: 15
            },
            {
              id: 'finding-8',
              text: 'Sin edema',
              correct: false,
              points: 0
            }
          ]
        }
      ]
    },
    diagnosis: {
      most_likely: 'Insuficiencia cardíaca congestiva descompensada',
      differential: [
        'Neumonía bilateral',
        'EPOC exacerbado',
        'Síndrome coronario agudo'
      ],
      explanation: 'Los hallazgos de ortopnea, disnea progresiva, taquicardia, estertores crepitantes bibasales, presencia de R3 (galope ventricular) y edema bilateral con fóvea son clásicos de insuficiencia cardíaca congestiva.'
    },
    learning_points: [
      'El R3 (galope ventricular) es un hallazgo característico de insuficiencia cardíaca',
      'La ortopnea es un signo específico de insuficiencia cardíaca izquierda',
      'Los estertores crepitantes bibasales indican edema pulmonar',
      'El edema bilateral sugiere insuficiencia cardíaca derecha'
    ],
    completed: false,
    score: 0
  },

  {
    id: 'case-003',
    title: 'Cefalea y alteración del estado mental',
    difficulty: 'basic',
    category: 'Neurológico',
    estimatedTime: 10,
    description: 'Evaluación neurológica básica de paciente con cefalea.',
    objectives: [
      'Realizar exploración de nervios craneales',
      'Evaluar nivel de conciencia',
      'Identificar signos de irritación meníngea'
    ],
    patient: {
      name: 'Carlos Ramírez',
      age: 22,
      gender: 'Masculino',
      chiefComplaint: 'Dolor de cabeza intenso y fiebre'
    },
    history: {
      present: 'Paciente de 22 años con cefalea intensa de 12 horas de evolución, holocraneana, continua, intensidad 9/10. Refiere fotofobia, fonofobia y náusea. Fiebre de 39°C. Niega traumatismos.',
      past: 'Previamente sano',
      medications: 'Ninguno',
      allergies: 'Ninguna'
    },
    vitalSigns: {
      temperature: '39.2°C',
      heartRate: '110 lpm',
      bloodPressure: '120/70 mmHg',
      respiratoryRate: '20 rpm',
      oxygenSaturation: '98%'
    },
    physicalExam: {
      general: 'Paciente consciente, orientado, irritable, fotofobia evidente.',
      steps: [
        {
          id: 'step-1',
          region: 'cabeza',
          technique: 'inspeccion',
          instruction: 'Evalúa el estado general y nivel de conciencia',
          findings: [
            {
              id: 'finding-1',
              text: 'Paciente consciente, orientado pero irritable',
              correct: true,
              points: 10
            }
          ]
        },
        {
          id: 'step-2',
          region: 'cuello',
          technique: 'signos-meningeos',
          instruction: 'Evalúa rigidez de nuca',
          findings: [
            {
              id: 'finding-2',
              text: 'Rigidez de nuca presente',
              correct: true,
              points: 20
            },
            {
              id: 'finding-3',
              text: 'Sin rigidez de nuca',
              correct: false,
              points: 0
            }
          ]
        }
      ]
    },
    diagnosis: {
      most_likely: 'Meningitis bacteriana aguda',
      differential: [
        'Meningitis viral',
        'Hemorragia subaracnoidea',
        'Encefalitis'
      ],
      explanation: 'La tríada clásica de meningitis (cefalea, fiebre, rigidez de nuca) está presente. La fotofobia y el estado irritable son hallazgos adicionales característicos.'
    },
    learning_points: [
      'La rigidez de nuca es un signo cardinal de irritación meníngea',
      'La tríada de meningitis incluye fiebre, cefalea y rigidez de nuca',
      'La fotofobia es común en meningitis',
      'La meningitis bacteriana es una emergencia médica'
    ],
    completed: false,
    score: 0
  }
]

// Funciones helper
export const getCaseById = (id) => {
  return clinicalCases.find(c => c.id === id)
}

export const getCasesByDifficulty = (difficulty) => {
  return clinicalCases.filter(c => c.difficulty === difficulty)
}

export const getCasesByCategory = (category) => {
  return clinicalCases.filter(c => c.category === category)
}

export const getCompletedCases = () => {
  return clinicalCases.filter(c => c.completed)
}

export const getTotalScore = () => {
  return clinicalCases.reduce((sum, c) => sum + c.score, 0)
}

export default clinicalCases