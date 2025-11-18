// src/data/bibliography.js

export const bibliographyReferences = [
  // Libros de texto
  {
    id: 'bates-1',
    type: 'book',
    category: 'Libros de Texto',
    title: 'Bates\' Guide to Physical Examination and History Taking',
    authors: ['Lynn S. Bickley', 'Peter G. Szilagyi'],
    edition: '13th Edition',
    year: 2021,
    publisher: 'Wolters Kluwer',
    isbn: '978-1975161156',
    description: 'Texto fundamental para el aprendizaje de la exploración física sistemática. Incluye técnicas detalladas con imágenes y videos.',
    relevance: 'high',
    topics: ['exploración física', 'historia clínica', 'semiología'],
    url: 'https://www.lww.com/Product/9781975161156'
  },
  {
    id: 'seidel-1',
    type: 'book',
    category: 'Libros de Texto',
    title: 'Mosby\'s Guide to Physical Examination',
    authors: ['Henry M. Seidel', 'Jane W. Ball', 'Joyce E. Dains', 'G. William Benedict'],
    edition: '9th Edition',
    year: 2019,
    publisher: 'Elsevier',
    isbn: '978-0323510806',
    description: 'Guía completa de exploración física con enfoque en técnicas prácticas y hallazgos clínicos.',
    relevance: 'high',
    topics: ['exploración física', 'técnicas de examen', 'hallazgos clínicos'],
    url: 'https://www.elsevier.com'
  },
  {
    id: 'macleod-1',
    type: 'book',
    category: 'Libros de Texto',
    title: 'Macleod\'s Clinical Examination',
    authors: ['J. Alastair Innes', 'Anna R Dover', 'Karen Fairhurst'],
    edition: '14th Edition',
    year: 2018,
    publisher: 'Churchill Livingstone',
    isbn: '978-0702069932',
    description: 'Texto clásico que integra la exploración física con el razonamiento clínico.',
    relevance: 'high',
    topics: ['examen clínico', 'diagnóstico', 'semiología'],
    url: 'https://www.elsevier.com'
  },

  // Artículos científicos
  {
    id: 'garibaldi-2021',
    type: 'article',
    category: 'Artículos Científicos',
    title: 'Seven reasons why the physical examination remains important',
    authors: ['Garibaldi BT', 'Elder A'],
    journal: 'Journal of the Royal College of Physicians of Edinburgh',
    year: 2021,
    volume: '51',
    issue: '3',
    pages: '211-214',
    doi: '10.4997/JRCPE.2021.301',
    description: 'Artículo que destaca la importancia continua de la exploración física en la era digital, argumentando que añade el 20% del total de un diagnóstico certero.',
    relevance: 'high',
    topics: ['importancia clínica', 'diagnóstico', 'exploración física'],
    url: 'https://doi.org/10.4997/JRCPE.2021.301'
  },
  {
    id: 'jiang-2023',
    type: 'article',
    category: 'Artículos Científicos',
    title: 'A smartphone-based online platform for clinical skills training and assessment',
    authors: ['Jiang S', 'et al'],
    journal: 'BMC Medical Education',
    year: 2023,
    volume: '23',
    pages: '138',
    doi: '10.1186/s12909-023-04118-9',
    description: 'Describe el desarrollo y utilidad de una plataforma móvil para enseñar y evaluar habilidades clínicas.',
    relevance: 'high',
    topics: ['educación médica', 'tecnología', 'aplicaciones móviles'],
    url: 'https://doi.org/10.1186/s12909-023-04118-9'
  },
  {
    id: 'alharbi-2024',
    type: 'article',
    category: 'Artículos Científicos',
    title: 'Effectiveness of simulation-based learning on knowledge, skill acquisition and retention',
    authors: ['Alharbi A', 'et al'],
    journal: 'BMC Medical Education',
    year: 2024,
    doi: '10.1186/s12909-024-05000-w',
    description: 'Revisión sistemática que muestra que la simulación mejora competencias y retención de conocimientos clínicos.',
    relevance: 'medium',
    topics: ['simulación', 'educación médica', 'aprendizaje'],
    url: 'https://doi.org/10.1186/s12909-024-05000-w'
  },

  // Guías clínicas
  {
    id: 'aha-2020',
    type: 'guideline',
    category: 'Guías Clínicas',
    title: 'AHA/ACC Guideline for the Management of Patients with Valvular Heart Disease',
    authors: ['American Heart Association', 'American College of Cardiology'],
    year: 2020,
    description: 'Guías para la evaluación y manejo de enfermedades valvulares, incluye técnicas de auscultación cardíaca.',
    relevance: 'medium',
    topics: ['cardiología', 'auscultación', 'soplos cardíacos'],
    url: 'https://www.ahajournals.org'
  },
  {
    id: 'gold-2023',
    type: 'guideline',
    category: 'Guías Clínicas',
    title: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD) 2023',
    authors: ['Global Initiative for Chronic Obstructive Lung Disease'],
    year: 2023,
    description: 'Guías para el diagnóstico y manejo de EPOC, incluye técnicas de exploración respiratoria.',
    relevance: 'medium',
    topics: ['neumología', 'exploración respiratoria', 'EPOC'],
    url: 'https://goldcopd.org'
  },

  // Recursos multimedia
  {
    id: 'stanford-medicine',
    type: 'multimedia',
    category: 'Recursos Multimedia',
    title: 'Stanford Medicine 25',
    authors: ['Stanford University School of Medicine'],
    year: 2023,
    description: 'Colección de videos y recursos sobre 25 habilidades clínicas esenciales en exploración física.',
    relevance: 'high',
    topics: ['videos educativos', 'técnicas clínicas', 'exploración física'],
    url: 'https://stanfordmedicine25.stanford.edu'
  },
  {
    id: 'nejm-videos',
    type: 'multimedia',
    category: 'Recursos Multimedia',
    title: 'NEJM Clinical Examination Videos',
    authors: ['New England Journal of Medicine'],
    year: 2023,
    description: 'Serie de videos del NEJM sobre técnicas de exploración física.',
    relevance: 'high',
    topics: ['videos', 'exploración física', 'técnicas'],
    url: 'https://www.nejm.org/multimedia/medical-videos'
  },
  {
    id: 'easy-auscultation',
    type: 'multimedia',
    category: 'Recursos Multimedia',
    title: 'Easy Auscultation Training System',
    authors: ['Easy Auscultation'],
    year: 2023,
    description: 'Plataforma con biblioteca de sonidos de auscultación cardíaca y respiratoria.',
    relevance: 'medium',
    topics: ['auscultación', 'sonidos cardíacos', 'sonidos respiratorios'],
    url: 'https://www.easyauscultation.com'
  },

  // Apps y herramientas digitales
  {
    id: 'complete-anatomy',
    type: 'app',
    category: 'Apps y Herramientas',
    title: 'Complete Anatomy',
    authors: ['3D4Medical'],
    year: 2023,
    description: 'Aplicación de anatomía 3D interactiva para estudio de estructuras anatómicas.',
    relevance: 'medium',
    topics: ['anatomía', '3D', 'educación'],
    url: 'https://www.completeanatomy.com'
  },
  {
    id: 'touch-surgery',
    type: 'app',
    category: 'Apps y Herramientas',
    title: 'Touch Surgery (Digital Surgery)',
    authors: ['Medtronic'],
    year: 2023,
    description: 'Plataforma de simulación quirúrgica con módulos de exploración física.',
    relevance: 'low',
    topics: ['simulación', 'procedimientos', 'educación'],
    url: 'https://www.digitalsurgery.com'
  },

  // Libros especializados por sistema
  {
    id: 'fuster-cardiology',
    type: 'book',
    category: 'Libros Especializados',
    title: 'Hurst\'s The Heart',
    authors: ['Valentin Fuster', 'et al'],
    edition: '14th Edition',
    year: 2017,
    publisher: 'McGraw-Hill',
    isbn: '978-0071843256',
    description: 'Texto de referencia en cardiología con secciones detalladas sobre exploración cardiovascular.',
    relevance: 'medium',
    topics: ['cardiología', 'auscultación cardíaca', 'exploración cardiovascular'],
    url: 'https://www.mheducation.com'
  },
  {
    id: 'murray-respiratory',
    type: 'book',
    category: 'Libros Especializados',
    title: 'Murray and Nadel\'s Textbook of Respiratory Medicine',
    authors: ['Robert J. Mason', 'et al'],
    edition: '6th Edition',
    year: 2016,
    publisher: 'Elsevier',
    isbn: '978-1455733835',
    description: 'Texto completo de medicina respiratoria incluyendo técnicas de exploración pulmonar.',
    relevance: 'medium',
    topics: ['neumología', 'exploración respiratoria', 'auscultación pulmonar'],
    url: 'https://www.elsevier.com'
  },
]

// Funciones helper
export const getReferencesByCategory = (category) => {
  return bibliographyReferences.filter(ref => ref.category === category)
}

export const getReferenceById = (id) => {
  return bibliographyReferences.find(ref => ref.id === id)
}

export const getCategories = () => {
  const categories = [...new Set(bibliographyReferences.map(ref => ref.category))]
  return categories.sort()
}

export const searchReferences = (query) => {
  if (!query) return []
  
  const lowerQuery = query.toLowerCase()
  
  return bibliographyReferences.filter(ref =>
    ref.title.toLowerCase().includes(lowerQuery) ||
    ref.description?.toLowerCase().includes(lowerQuery) ||
    ref.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
    ref.topics?.some(topic => topic.toLowerCase().includes(lowerQuery))
  )
}

export const getReferencesByRelevance = (relevance) => {
  return bibliographyReferences.filter(ref => ref.relevance === relevance)
}

export const getReferencesByType = (type) => {
  return bibliographyReferences.filter(ref => ref.type === type)
}

export default bibliographyReferences