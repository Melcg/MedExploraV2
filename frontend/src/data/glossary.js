// src/data/glossary.js

export const glossaryTerms = [
  // A
  {
    id: 'acropaquia',
    term: 'Acropaquia',
    definition: 'Agrandamiento de las falanges distales de los dedos (dedos en palillo de tambor), asociado frecuentemente con enfermedades cardiopulmonares crónicas.',
    category: 'Signos clínicos',
    relatedTerms: ['hipocratismo-digital', 'cianosis']
  },
  {
    id: 'auscultacion',
    term: 'Auscultación',
    definition: 'Técnica de exploración física que consiste en escuchar los sonidos producidos por los órganos internos, principalmente corazón, pulmones e intestinos, utilizando un estetoscopio.',
    category: 'Técnicas',
    relatedTerms: ['estetoscopio', 'ruidos-cardiacos', 'ruidos-respiratorios']
  },
  {
    id: 'atelectasia',
    term: 'Atelectasia',
    definition: 'Colapso parcial o completo de un pulmón o lóbulo pulmonar, que resulta en la reducción o ausencia de intercambio gaseoso en la zona afectada.',
    category: 'Patología',
    relatedTerms: ['neumotorax', 'derrame-pleural']
  },

  // B
  {
    id: 'blumberg',
    term: 'Signo de Blumberg',
    definition: 'Dolor intenso que se produce al retirar bruscamente la mano que presiona el abdomen (dolor a la descompresión). Es indicativo de irritación peritoneal, característico de apendicitis aguda.',
    category: 'Signos clínicos',
    relatedTerms: ['mcburney', 'peritonitis', 'apendicitis']
  },
  {
    id: 'broncofonia',
    term: 'Broncofonia',
    definition: 'Aumento de la intensidad y claridad de la voz del paciente al auscultar el tórax, indicativo de consolidación pulmonar.',
    category: 'Signos clínicos',
    relatedTerms: ['pectoriloquia', 'egofonia']
  },

  // C
  {
    id: 'cianosis',
    term: 'Cianosis',
    definition: 'Coloración azulada de la piel y mucosas debido a un aumento de hemoglobina desoxigenada en la sangre, generalmente por hipoxia.',
    category: 'Signos clínicos',
    relatedTerms: ['hipoxia', 'acropaquia']
  },
  {
    id: 'crepitaciones',
    term: 'Crepitaciones (Estertores)',
    definition: 'Ruidos respiratorios adventicios discontinuos, similares a chasquidos o burbujas, que se escuchan durante la inspiración. Pueden indicar líquido en alvéolos o vías aéreas pequeñas.',
    category: 'Signos clínicos',
    relatedTerms: ['roncus', 'sibilancias', 'auscultacion']
  },

  // D
  {
    id: 'derrame-pleural',
    term: 'Derrame Pleural',
    definition: 'Acumulación anormal de líquido en el espacio pleural entre el pulmón y la pared torácica.',
    category: 'Patología',
    relatedTerms: ['matidez', 'neumotorax']
  },
  {
    id: 'disfagia',
    term: 'Disfagia',
    definition: 'Dificultad para deglutir (tragar) alimentos o líquidos.',
    category: 'Síntomas',
    relatedTerms: ['odinofagia']
  },

  // E
  {
    id: 'edema',
    term: 'Edema',
    definition: 'Acumulación de líquido en el espacio intersticial que causa hinchazón, especialmente en extremidades inferiores. Se evalúa con el signo de Godet.',
    category: 'Signos clínicos',
    relatedTerms: ['godet', 'anasarca']
  },
  {
    id: 'estertores',
    term: 'Estertores',
    definition: 'Ver crepitaciones. Ruidos respiratorios anormales.',
    category: 'Signos clínicos',
    relatedTerms: ['crepitaciones', 'roncus', 'sibilancias']
  },

  // F
  {
    id: 'fascies',
    term: 'Facies',
    definition: 'Expresión o aspecto característico del rostro que puede indicar un estado patológico específico (ej: facies hipocrática, febril, cushingoide).',
    category: 'Signos clínicos',
    relatedTerms: ['inspeccion-general']
  },
  {
    id: 'fremito-vocal',
    term: 'Frémito Vocal',
    definition: 'Vibración palpable en la pared torácica producida cuando el paciente habla (dice "treinta y tres"). Su aumento o disminución indica patología pulmonar.',
    category: 'Técnicas',
    relatedTerms: ['palpacion', 'consolidacion']
  },

  // G
  {
    id: 'godet',
    term: 'Signo de Godet',
    definition: 'Depresión persistente en la piel tras presionar con el dedo, que indica edema. Se clasifica en grados del 1 al 4 según profundidad y tiempo de recuperación.',
    category: 'Signos clínicos',
    relatedTerms: ['edema']
  },
  {
    id: 'giordano',
    term: 'Signo de Giordano',
    definition: 'Dolor al percutir la región del ángulo costovertebral, indica inflamación renal o del tracto urinario superior.',
    category: 'Signos clínicos',
    relatedTerms: ['pielonefritis', 'percusion']
  },

  // H
  {
    id: 'hepatomegalia',
    term: 'Hepatomegalia',
    definition: 'Aumento del tamaño del hígado por encima de sus límites normales, detectable por palpación y percusión.',
    category: 'Signos clínicos',
    relatedTerms: ['palpacion-abdominal', 'esplenomegalia']
  },
  {
    id: 'hipocratismo-digital',
    term: 'Hipocratismo Digital',
    definition: 'Sinónimo de acropaquia. Deformidad de los dedos caracterizada por aumento del ángulo entre la uña y el dedo.',
    category: 'Signos clínicos',
    relatedTerms: ['acropaquia']
  },

  // I
  {
    id: 'ictericia',
    term: 'Ictericia',
    definition: 'Coloración amarillenta de piel y mucosas causada por acumulación de bilirrubina en sangre.',
    category: 'Signos clínicos',
    relatedTerms: ['hepatomegalia', 'coluria']
  },
  {
    id: 'inspeccion',
    term: 'Inspección',
    definition: 'Primera técnica de exploración física que consiste en la observación cuidadosa y sistemática del paciente.',
    category: 'Técnicas',
    relatedTerms: ['palpacion', 'percusion', 'auscultacion']
  },

  // M
  {
    id: 'matidez',
    term: 'Matidez',
    definition: 'Sonido sordo obtenido durante la percusión, indica presencia de tejido sólido o líquido (opuesto a timpanismo).',
    category: 'Signos clínicos',
    relatedTerms: ['percusion', 'timpanismo', 'derrame-pleural']
  },
  {
    id: 'mcburney',
    term: 'Punto de McBurney',
    definition: 'Punto ubicado en la unión del tercio externo con los dos tercios internos de una línea imaginaria entre el ombligo y la espina ilíaca anterosuperior derecha. Dolor a la palpación sugiere apendicitis.',
    category: 'Anatomía/Signos',
    relatedTerms: ['blumberg', 'apendicitis']
  },
  {
    id: 'murphy',
    term: 'Signo de Murphy',
    definition: 'Interrupción brusca de la inspiración profunda por dolor al palpar el hipocondrio derecho, característico de colecistitis aguda.',
    category: 'Signos clínicos',
    relatedTerms: ['colecistitis', 'palpacion-abdominal']
  },

  // N
  {
    id: 'neumotorax',
    term: 'Neumotórax',
    definition: 'Presencia de aire en el espacio pleural que causa colapso pulmonar parcial o total. A la percusión produce hiperresonancia.',
    category: 'Patología',
    relatedTerms: ['derrame-pleural', 'hiperresonancia']
  },

  // O
  {
    id: 'ortopnea',
    term: 'Ortopnea',
    definition: 'Dificultad respiratoria que se presenta al estar acostado y mejora al sentarse o incorporarse.',
    category: 'Síntomas',
    relatedTerms: ['disnea', 'insuficiencia-cardiaca']
  },

  // P
  {
    id: 'palpacion',
    term: 'Palpación',
    definition: 'Técnica de exploración física que utiliza las manos para examinar características de órganos y tejidos: tamaño, forma, consistencia, temperatura, sensibilidad.',
    category: 'Técnicas',
    relatedTerms: ['inspeccion', 'percusion']
  },
  {
    id: 'percusion',
    term: 'Percusión',
    definition: 'Técnica que consiste en golpear suavemente la superficie corporal para producir sonidos que ayudan a determinar la densidad de estructuras subyacentes.',
    category: 'Técnicas',
    relatedTerms: ['matidez', 'timpanismo', 'resonancia']
  },
  {
    id: 'pectoriloquia',
    term: 'Pectoriloquia',
    definition: 'Transmisión exagerada de la voz susurrada del paciente a través de la pared torácica, audible con el estetoscopio. Indica consolidación pulmonar.',
    category: 'Signos clínicos',
    relatedTerms: ['broncofonia', 'egofonia']
  },

  // R
  {
    id: 'roncus',
    term: 'Roncus (Roncas)',
    definition: 'Ruidos respiratorios adventicios continuos, graves y sonoros, similares a ronquidos. Indican obstrucción de vías aéreas grandes.',
    category: 'Signos clínicos',
    relatedTerms: ['sibilancias', 'crepitaciones']
  },
  {
    id: 'ruidos-cardiacos',
    term: 'Ruidos Cardíacos',
    definition: 'Sonidos producidos por el cierre de las válvulas cardíacas. R1 (cierre mitral y tricúspide) y R2 (cierre aórtica y pulmonar) son los normales.',
    category: 'Fisiología',
    relatedTerms: ['auscultacion', 'soplos']
  },

  // S
  {
    id: 'sibilancias',
    term: 'Sibilancias',
    definition: 'Ruidos respiratorios adventicios continuos, agudos y musicales, característicos de broncoespasmo (asma, EPOC).',
    category: 'Signos clínicos',
    relatedTerms: ['roncus', 'crepitaciones', 'broncoespasmo']
  },
  {
    id: 'soplos',
    term: 'Soplos',
    definition: 'Ruidos cardíacos anormales causados por flujo turbulento de sangre a través de válvulas o estructuras cardíacas.',
    category: 'Signos clínicos',
    relatedTerms: ['ruidos-cardiacos', 'auscultacion']
  },

  // T
  {
    id: 'timpanismo',
    term: 'Timpanismo',
    definition: 'Sonido resonante similar al de un tambor obtenido durante la percusión, indica presencia de aire (opuesto a matidez).',
    category: 'Signos clínicos',
    relatedTerms: ['percusion', 'matidez']
  },
  {
    id: 'taquipnea',
    term: 'Taquipnea',
    definition: 'Aumento de la frecuencia respiratoria por encima de 20 respiraciones por minuto en adultos.',
    category: 'Signos clínicos',
    relatedTerms: ['bradipnea', 'disnea']
  },
]

// Función para buscar términos
export const searchGlossary = (query) => {
  if (!query) return []
  
  const lowerQuery = query.toLowerCase()
  
  return glossaryTerms.filter(term => 
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery) ||
    term.category.toLowerCase().includes(lowerQuery)
  )
}

// Función para obtener un término por ID
export const getTermById = (id) => {
  return glossaryTerms.find(term => term.id === id)
}

// Función para obtener términos relacionados
export const getRelatedTerms = (termId) => {
  const term = getTermById(termId)
  if (!term || !term.relatedTerms) return []
  
  return term.relatedTerms
    .map(id => getTermById(id))
    .filter(Boolean)
}

// Función para obtener términos por categoría
export const getTermsByCategory = (category) => {
  return glossaryTerms.filter(term => term.category === category)
}

// Obtener todas las categorías
export const getCategories = () => {
  const categories = [...new Set(glossaryTerms.map(term => term.category))]
  return categories.sort()
}

export default glossaryTerms