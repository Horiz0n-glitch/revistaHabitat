// Navigation categories with subcategories
export const navigationCategories = [
  {
    name: "Artículos",
    slug: "articulos",
    subcategories: [
      { name: "Artículos", slug: "articulos" },
      { name: "Entrevistas", slug: "entrevistas" },
      { name: "Reportajes", slug: "reportajes" },
      { name: "Artículos Técnicos", slug: "articulos-tecnicos" },
      { name: "Columnistas", slug: "columnistas" },
    ],
  },
  {
    name: "Cultura y Patrimonio",
    slug: "cultura-y-patrimonio",
    subcategories: [
      { name: "Cultura y Patrimonio", slug: "cultura-y-patrimonio" },
      { name: "Centros Históricos", slug: "centros-historicos" },
      { name: "Eventos / Cursos", slug: "eventos-cursos" },
    ],
  },
  {
    name: "Eventos / Cursos",
    slug: "eventos-cursos",
    subcategories: [
      { name: "Cursos", slug: "cursos" },
      { name: "Eventos", slug: "eventos" },
      { name: "Concursos / Becas", slug: "concursos-becas" },
      { name: "Conferencias", slug: "conferencias" },
      { name: "Encuentros", slug: "encuentros" },
      { name: "Eventos / Concursos", slug: "eventos-concursos" },
      { name: "Exposiciones", slug: "exposiciones" },
      { name: "Ferias y Congresos", slug: "ferias-y-congresos" },
      { name: "Seminarios", slug: "seminarios" },
    ],
  },
  {
    name: "Restauración",
    slug: "restauracion",
    subcategories: [
      { name: "Restauración", slug: "restauracion" },
      { name: "Puesta en Valor", slug: "puesta-en-valor" },
      { name: "Conservación", slug: "conservacion" },
      { name: "Monumentos", slug: "monumentos" },
    ],
  },
  {
    name: "RSE",
    slug: "rse",
    subcategories: [
      { name: "Fundaciones y ONG", slug: "fundaciones-y-ong" },
      { name: "Capacitaciones RSE", slug: "capacitaciones-rse" },
      { name: "Cursos y Eventos RSE", slug: "cursos-y-eventos-rse" },
      { name: "Jornadas RSE", slug: "jornadas-rse" },
      { name: "Educación RSE", slug: "educacion-rse" },
      { name: "Empresas RSE", slug: "empresas-rse" },
      { name: "Noticias RSE", slug: "noticias-rse" },
    ],
  },
  {
    name: "Reciclaje",
    slug: "reciclaje",
    subcategories: [
      { name: "Reciclaje", slug: "reciclaje" },
      { name: "Reformas / Remodelación", slug: "reformas-remodelacion" },
    ],
  },
  {
    name: "Sustentable",
    slug: "sustentable",
    subcategories: [
      { name: "Ambiente", slug: "ambiente" },
      { name: "Agua y Saneamiento", slug: "agua-y-saneamiento" },
      { name: "Bio Arquitectura", slug: "bio-arquitectura" },
      { name: "Eficiencia Energética", slug: "eficiencia-energetica" },
      { name: "Empresas Sustentables", slug: "empresas-sustentables" },
      { name: "Energías Renovables", slug: "energias-renovables" },
    ],
  },
  {
    name: "Turismo Cultural",
    slug: "turismo-cultural",
    subcategories: [
      { name: "Turismo Cultural", slug: "turismo-cultural" },
      { name: "Recorridos", slug: "recorridos" },
      { name: "Religioso", slug: "religioso" },
      { name: "Curiosidades", slug: "curiosidades" },
    ],
  },
  {
    name: "Propiedades",
    slug: "propiedades",
    subcategories: [
      { name: "Barrios Cerrados", slug: "barrios-cerrados" },
      { name: "Casas", slug: "casas" },
      { name: "Construcción", slug: "construccion" },
      { name: "Copropietarios", slug: "copropietarios" },
      { name: "Desarrollo Inmobiliario", slug: "desarrollo-inmobiliario" },
      { name: "Edificios", slug: "edificios" },
      { name: "Eventos Propiedades", slug: "eventos-propiedades" },
      { name: "Hoteles", slug: "hoteles" },
    ],
  },
]

// Mock articles
export const mockArticles = [
  {
    id: "1",
    title: "Casa Minimalista en las Montañas",
    subtitle: "Un refugio contemporáneo que dialoga con el paisaje natural",
    slug: "casa-minimalista-montanas",
    excerpt:
      "Exploramos un proyecto residencial que combina arquitectura minimalista con materiales locales, creando un espacio que respeta y celebra su entorno natural.",
    content: `
      <p>La arquitectura minimalista encuentra su máxima expresión cuando se integra armoniosamente con el entorno natural. Este proyecto residencial en las montañas es un ejemplo perfecto de cómo la simplicidad formal puede crear espacios de gran riqueza espacial.</p>
      
      <h2>Concepto de Diseño</h2>
      <p>El concepto parte de la idea de crear un refugio que dialogue con el paisaje sin competir con él. La volumetría simple y los materiales locales permiten que la casa se integre naturalmente en su contexto montañoso.</p>
      
      <h2>Materialidad</h2>
      <p>Se utilizaron principalmente tres materiales: concreto expuesto, madera local y vidrio. Esta paleta limitada refuerza el carácter minimalista del proyecto mientras establece una conexión directa con el entorno.</p>
      
      <h2>Espacialidad</h2>
      <p>Los espacios interiores se organizan en torno a un patio central que actúa como corazón de la vivienda. Las grandes aberturas enmarcan vistas específicas del paisaje, convirtiendo el entorno en parte integral de la experiencia espacial.</p>
    `,
    cover_image: "/modern-minimalist-house-in-mountains.jpg",
    gallery: [
      "/modern-minimalist-house-in-mountains.jpg",
      "/minimalist-house-interior-with-concrete-and-wood.jpg",
      "/minimalist-house-mountain-view-through-large-windo.jpg",
      "/minimalist-house-central-courtyard.jpg",
      "/minimalist-house-exterior-detail-concrete-and-wood.jpg",
      "/minimalist-house-bedroom-with-mountain-views.jpg",
    ],
    category: {
      name: "Propiedades",
      slug: "propiedades",
      subcategory: { name: "Casas", slug: "casas" },
    },
    tags: [
      { name: "Minimalismo", slug: "minimalismo" },
      { name: "Residencial", slug: "residencial" },
    ],
    author: { full_name: "María González", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-15",
    views: 1250,
  },
  {
    id: "2",
    title: "Diseño Bioclimático en Espacios Urbanos",
    subtitle: "Estrategias sostenibles para edificios en la ciudad",
    slug: "diseno-bioclimatico-urbano",
    excerpt: "Estrategias sostenibles para edificios en la ciudad que reducen el consumo energético.",
    content: `
      <p>El diseño bioclimático en contextos urbanos presenta desafíos únicos que requieren soluciones innovadoras. Este artículo explora estrategias efectivas para crear edificios sostenibles en la ciudad.</p>
      
      <h2>Ventilación Natural</h2>
      <p>Aprovechar los vientos urbanos para crear sistemas de ventilación natural que reduzcan la dependencia de sistemas mecánicos.</p>
      
      <h2>Captación Solar</h2>
      <p>Estrategias para maximizar la captación solar en edificios urbanos con limitaciones de orientación y sombras proyectadas.</p>
    `,
    cover_image: "/bioclimatic-urban-building.jpg",
    gallery: [
      "/bioclimatic-urban-building.jpg",
      "/bioclimatic-building-solar-panels-facade.jpg",
      "/bioclimatic-building-natural-ventilation-system.jpg",
      "/bioclimatic-building-green-roof-urban-context.jpg",
      "/bioclimatic-building-interior-natural-light.jpg",
    ],
    category: {
      name: "Sustentable",
      slug: "sustentable",
      subcategory: { name: "Bio Arquitectura", slug: "bio-arquitectura" },
    },
    tags: [
      { name: "Bioclimático", slug: "bioclimatico" },
      { name: "Urbano", slug: "urbano" },
    ],
    author: { full_name: "Carlos Ruiz", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-12",
    views: 980,
  },
  {
    id: "3",
    title: "Restauración de Edificio Histórico",
    subtitle: "Preservando el patrimonio arquitectónico del siglo XIX",
    slug: "restauracion-edificio-historico",
    excerpt: "Preservando el patrimonio arquitectónico del siglo XIX con técnicas contemporáneas.",
    content: `
      <p>La restauración de edificios históricos requiere un delicado balance entre preservación y adaptación a usos contemporáneos.</p>
      
      <h2>Diagnóstico</h2>
      <p>El primer paso fue realizar un exhaustivo diagnóstico del estado de conservación del edificio, identificando patologías y elementos originales a preservar.</p>
      
      <h2>Intervención</h2>
      <p>La intervención se basó en criterios de mínima intervención y reversibilidad, respetando la autenticidad del edificio histórico.</p>
    `,
    cover_image: "/historic-building-restoration.jpg",
    gallery: [
      "/historic-building-restoration.jpg",
      "/historic-building-before-restoration-facade.jpg",
      "/historic-building-restoration-process-scaffolding.jpg",
      "/historic-building-restored-interior-details.jpg",
      "/historic-building-restored-facade-detail-ornaments.jpg",
      "/historic-building-restored-interior-grand-staircas.jpg",
    ],
    category: {
      name: "Restauración",
      slug: "restauracion",
      subcategory: { name: "Restauración", slug: "restauracion" },
    },
    tags: [
      { name: "Restauración", slug: "restauracion" },
      { name: "Patrimonio", slug: "patrimonio" },
    ],
    author: { full_name: "Ana Martínez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-10",
    views: 1100,
  },
  {
    id: "4",
    title: "Interiores que Inspiran Creatividad",
    subtitle: "Espacios de trabajo diseñados para potenciar la innovación",
    slug: "interiores-creatividad",
    excerpt: "Espacios de trabajo diseñados para potenciar la innovación y el pensamiento creativo.",
    content: `
      <p>El diseño de interiores para espacios de trabajo creativos debe fomentar la colaboración, la concentración y la inspiración.</p>
      
      <h2>Zonas Flexibles</h2>
      <p>Crear diferentes tipos de espacios que permitan tanto el trabajo colaborativo como la concentración individual.</p>
      
      <h2>Iluminación</h2>
      <p>La iluminación natural y artificial juega un papel crucial en el bienestar y la productividad de los usuarios.</p>
    `,
    cover_image: "/creative-office-interior-design.jpg",
    gallery: [
      "/creative-office-interior-design.jpg",
      "/creative-office-open-workspace-collaboration-area.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Propiedades",
      slug: "propiedades",
      subcategory: { name: "Edificios", slug: "edificios" },
    },
    tags: [
      { name: "Interiores", slug: "interiores" },
      { name: "Oficinas", slug: "oficinas" },
    ],
    author: { full_name: "Laura Sánchez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-08",
    views: 850,
  },
  {
    id: "5",
    title: "Museo de Arte Contemporáneo",
    subtitle: "Un espacio cultural que redefine la experiencia museística",
    slug: "museo-arte-contemporaneo",
    excerpt:
      "Análisis de un proyecto museístico que combina arquitectura contemporánea con espacios flexibles para exposiciones.",
    content: `
      <p>Los museos contemporáneos deben ser espacios flexibles que se adapten a diferentes tipos de exposiciones y eventos culturales.</p>
      
      <h2>Concepto Espacial</h2>
      <p>El diseño se basa en la creación de espacios neutros que permitan que las obras de arte sean las protagonistas, mientras la arquitectura actúa como un marco discreto pero potente.</p>
      
      <h2>Circulación</h2>
      <p>El recorrido museístico se diseñó para ofrecer múltiples opciones de circulación, permitiendo que cada visitante cree su propia experiencia.</p>
    `,
    cover_image: "/contemporary-art-museum.jpg",
    gallery: [
      "/contemporary-art-museum.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Cultura y Patrimonio",
      slug: "cultura-y-patrimonio",
      subcategory: { name: "Cultura y Patrimonio", slug: "cultura-y-patrimonio" },
    },
    tags: [
      { name: "Cultural", slug: "cultural" },
      { name: "Público", slug: "publico" },
    ],
    author: { full_name: "Roberto Fernández", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-13",
    views: 1420,
  },
  {
    id: "6",
    title: "Vivienda Colectiva Sostenible",
    subtitle: "Nuevos modelos de habitar en comunidad",
    slug: "vivienda-colectiva-sostenible",
    excerpt:
      "Exploramos un proyecto de vivienda colectiva que integra estrategias de diseño sustentable y espacios comunitarios.",
    content: `
      <p>La vivienda colectiva sostenible representa una alternativa viable para abordar la crisis habitacional en las ciudades contemporáneas.</p>
      
      <h2>Espacios Compartidos</h2>
      <p>El proyecto incluye áreas comunes como huertos urbanos, talleres y espacios de coworking que fomentan la vida comunitaria.</p>
      
      <h2>Eficiencia Energética</h2>
      <p>Se implementaron sistemas de captación solar, recolección de agua de lluvia y ventilación cruzada para minimizar el consumo energético.</p>
    `,
    cover_image: "/sustainable-collective-housing.jpg",
    gallery: [
      "/sustainable-collective-housing.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Sustentable",
      slug: "sustentable",
      subcategory: { name: "Eficiencia Energética", slug: "eficiencia-energetica" },
    },
    tags: [
      { name: "Vivienda", slug: "vivienda" },
      { name: "Colectivo", slug: "colectivo" },
    ],
    author: { full_name: "Patricia Morales", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-11",
    views: 1150,
  },
  {
    id: "7",
    title: "Renovación de Centro Histórico",
    subtitle: "Revitalizando el corazón de la ciudad",
    slug: "renovacion-centro-historico",
    excerpt:
      "Un proyecto de renovación urbana que busca revitalizar el centro histórico respetando su identidad cultural.",
    content: `
      <p>La renovación urbana en centros históricos requiere un enfoque sensible que balance la modernización con la preservación del patrimonio.</p>
      
      <h2>Estrategia de Intervención</h2>
      <p>Se priorizó la recuperación de espacios públicos y la mejora de la infraestructura sin alterar la escala y carácter del centro histórico.</p>
      
      <h2>Participación Ciudadana</h2>
      <p>El proyecto se desarrolló con amplia participación de la comunidad local, asegurando que las intervenciones respondieran a las necesidades reales de los habitantes.</p>
    `,
    cover_image: "/urban-renewal-historic-center.jpg",
    gallery: [
      "/urban-renewal-historic-center.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Cultura y Patrimonio",
      slug: "cultura-y-patrimonio",
      subcategory: { name: "Centros Históricos", slug: "centros-historicos" },
    },
    tags: [
      { name: "Renovación", slug: "renovacion" },
      { name: "Centro Histórico", slug: "centro-historico" },
    ],
    author: { full_name: "Diego Vargas", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-09",
    views: 1320,
  },
  {
    id: "8",
    title: "Reciclaje de Edificio Industrial",
    subtitle: "Transformando espacios obsoletos en viviendas contemporáneas",
    slug: "reciclaje-edificio-industrial",
    excerpt:
      "Análisis de un proyecto de reciclaje arquitectónico que convierte una fábrica abandonada en lofts residenciales.",
    content: `
      <p>El reciclaje de edificios industriales representa una oportunidad única para crear viviendas con carácter mientras se preserva el patrimonio industrial.</p>
      
      <h2>Diseño Adaptativo</h2>
      <p>Se respetaron los elementos estructurales originales, integrándolos como parte del diseño contemporáneo de los espacios habitables.</p>
      
      <h2>Sostenibilidad</h2>
      <p>El proyecto evitó la demolición y construcción nueva, reduciendo significativamente la huella de carbono del desarrollo.</p>
    `,
    cover_image: "/innovative-urban-furniture.jpg",
    gallery: [
      "/innovative-urban-furniture.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Reciclaje",
      slug: "reciclaje",
      subcategory: { name: "Reformas / Remodelación", slug: "reformas-remodelacion" },
    },
    tags: [
      { name: "Reciclaje", slug: "reciclaje" },
      { name: "Industrial", slug: "industrial" },
    ],
    author: { full_name: "Sofía Ramírez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-07",
    views: 920,
  },
  {
    id: "9",
    title: "Gestión del Agua en Edificios Sustentables",
    subtitle: "Sistemas innovadores de recolección y tratamiento",
    slug: "gestion-agua-edificios",
    excerpt:
      "Exploramos tecnologías y estrategias para la gestión eficiente del agua en proyectos arquitectónicos sustentables.",
    content: `
      <p>La gestión del agua es un componente crítico de la arquitectura sustentable, especialmente en regiones con escasez hídrica.</p>
      
      <h2>Recolección de Agua de Lluvia</h2>
      <p>Sistemas de captación y almacenamiento que permiten reutilizar el agua pluvial para riego y usos no potables.</p>
      
      <h2>Tratamiento de Aguas Grises</h2>
      <p>Tecnologías de tratamiento que permiten reciclar aguas grises para su reutilización en el edificio.</p>
    `,
    cover_image: "/leed-certified-office-building.jpg",
    gallery: [
      "/leed-certified-office-building.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Sustentable",
      slug: "sustentable",
      subcategory: { name: "Agua y Saneamiento", slug: "agua-y-saneamiento" },
    },
    tags: [
      { name: "Agua", slug: "agua" },
      { name: "Sustentabilidad", slug: "sustentabilidad" },
    ],
    author: { full_name: "Carlos Ruiz", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-06",
    views: 1080,
  },
  {
    id: "10",
    title: "Turismo Cultural: Ruta de Iglesias Coloniales",
    subtitle: "Descubriendo el patrimonio religioso de América Latina",
    slug: "ruta-iglesias-coloniales",
    excerpt: "Un recorrido por las iglesias coloniales más emblemáticas, explorando su arquitectura e historia.",
    content: `
      <p>Las iglesias coloniales representan uno de los patrimonios arquitectónicos más valiosos de América Latina, combinando influencias europeas con técnicas y materiales locales.</p>
      
      <h2>Arquitectura Colonial</h2>
      <p>Análisis de los elementos arquitectónicos característicos del período colonial, desde las fachadas barrocas hasta los retablos dorados.</p>
      
      <h2>Conservación</h2>
      <p>Los desafíos de preservar estos edificios históricos mientras se mantienen en uso activo para la comunidad.</p>
    `,
    cover_image: "/community-public-library.jpg",
    gallery: [
      "/community-public-library.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Turismo Cultural",
      slug: "turismo-cultural",
      subcategory: { name: "Religioso", slug: "religioso" },
    },
    tags: [
      { name: "Turismo", slug: "turismo" },
      { name: "Colonial", slug: "colonial" },
    ],
    author: { full_name: "María González", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-05",
    views: 1190,
  },
  {
    id: "11",
    title: "Desarrollo Inmobiliario Sustentable",
    subtitle: "Nuevos estándares para proyectos residenciales",
    slug: "desarrollo-inmobiliario-sustentable",
    excerpt:
      "Cómo los desarrolladores están incorporando criterios de sustentabilidad en proyectos inmobiliarios de gran escala.",
    content: `
      <p>El desarrollo inmobiliario sustentable va más allá de la eficiencia energética, abarcando aspectos sociales, económicos y ambientales.</p>
      
      <h2>Planificación Integral</h2>
      <p>Estrategias de planificación que consideran la movilidad, los espacios verdes y la integración con el tejido urbano existente.</p>
      
      <h2>Certificaciones</h2>
      <p>La importancia de obtener certificaciones ambientales como LEED o EDGE para garantizar estándares de sustentabilidad.</p>
    `,
    cover_image: "/metropolitan-linear-park.jpg",
    gallery: [
      "/metropolitan-linear-park.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Propiedades",
      slug: "propiedades",
      subcategory: { name: "Desarrollo Inmobiliario", slug: "desarrollo-inmobiliario" },
    },
    tags: [
      { name: "Inmobiliario", slug: "inmobiliario" },
      { name: "Sustentable", slug: "sustentable" },
    ],
    author: { full_name: "Ana Martínez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-04",
    views: 1260,
  },
  {
    id: "12",
    title: "Responsabilidad Social Empresarial en Construcción",
    subtitle: "Empresas que transforman comunidades",
    slug: "rse-construccion",
    excerpt: "Análisis de programas de RSE en el sector de la construcción que generan impacto social positivo.",
    content: `
      <p>La responsabilidad social empresarial en el sector de la construcción va más allá del cumplimiento normativo, buscando generar valor compartido con las comunidades.</p>
      
      <h2>Programas de Capacitación</h2>
      <p>Empresas que invierten en la formación de mano de obra local, generando empleo calificado en las comunidades donde operan.</p>
      
      <h2>Impacto Ambiental</h2>
      <p>Iniciativas para reducir el impacto ambiental de las obras y promover prácticas constructivas sostenibles.</p>
    `,
    cover_image: "/contemporary-design-showroom.jpg",
    gallery: [
      "/contemporary-design-showroom.jpg",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "RSE",
      slug: "rse",
      subcategory: { name: "Empresas RSE", slug: "empresas-rse" },
    },
    tags: [
      { name: "RSE", slug: "rse" },
      { name: "Construcción", slug: "construccion" },
    ],
    author: { full_name: "Laura Sánchez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-03",
    views: 890,
  },
  {
    id: "13",
    title: "Edificios de Madera: La Nueva Tendencia Sustentable",
    subtitle: "Estructuras de altura en madera laminada",
    slug: "edificios-madera-sustentable",
    excerpt:
      "La madera laminada cruzada está revolucionando la construcción de edificios de altura con soluciones más sustentables.",
    content: `
      <p>La construcción en madera está experimentando un renacimiento gracias a nuevas tecnologías como la madera laminada cruzada (CLT) que permiten construir edificios de gran altura.</p>
      
      <h2>Ventajas Estructurales</h2>
      <p>La madera laminada ofrece resistencia comparable al concreto y acero, mientras captura carbono de la atmósfera durante su crecimiento.</p>
      
      <h2>Experiencias Internacionales</h2>
      <p>Casos de éxito en Noruega, Canadá y Austria demuestran la viabilidad de edificios de madera de más de 20 pisos.</p>
    `,
    cover_image: "/tall-timber-building-facade.jpg",
    gallery: [
      "/tall-timber-building-facade.jpg",
      "/clt-construction-process.jpg",
      "/wood-building-interior.jpg",
      "/timber-structural-details.jpg",
      "/sustainable-wood-architecture.jpg",
    ],
    category: {
      name: "Sustentable",
      slug: "sustentable",
      subcategory: { name: "Empresas Sustentables", slug: "empresas-sustentables" },
    },
    tags: [
      { name: "Madera", slug: "madera" },
      { name: "Construcción", slug: "construccion" },
    ],
    author: { full_name: "Roberto Fernández", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-16",
    views: 1450,
  },
  {
    id: "14",
    title: "Espacios Comunitarios Post-Pandemia",
    subtitle: "Rediseñando la vida urbana colectiva",
    slug: "espacios-comunitarios-post-pandemia",
    excerpt:
      "Cómo la pandemia transformó nuestra forma de pensar los espacios públicos y comunitarios en las ciudades.",
    content: `
      <p>La pandemia de COVID-19 nos obligó a repensar cómo diseñamos los espacios donde nos reunimos, trabajamos y convivimos.</p>
      
      <h2>Ventilación y Aire Libre</h2>
      <p>Priorizar espacios al aire libre y sistemas de ventilación natural se ha vuelto fundamental en el diseño contemporáneo.</p>
      
      <h2>Flexibilidad Espacial</h2>
      <p>Espacios que pueden adaptarse rápidamente a diferentes usos y densidades de ocupación.</p>
    `,
    cover_image: "/outdoor-community-space.jpg",
    gallery: [
      "/outdoor-community-space.jpg",
      "/flexible-public-space-design.jpg",
      "/ventilated-indoor-gathering-space.jpg",
      "/socially-distanced-seating-design.jpg",
      "/community-plaza-post-pandemic.jpg",
    ],
    category: {
      name: "RSE",
      slug: "rse",
      subcategory: { name: "Fundaciones y ONG", slug: "fundaciones-y-ong" },
    },
    tags: [
      { name: "Comunitario", slug: "comunitario" },
      { name: "Urbano", slug: "urbano" },
    ],
    author: { full_name: "Patricia Morales", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-17",
    views: 1380,
  },
  {
    id: "15",
    title: "Hotel Boutique en Edificio Patrimonial",
    subtitle: "Turismo y conservación del patrimonio",
    slug: "hotel-boutique-patrimonial",
    excerpt: "La transformación de un palacete del siglo XIX en un hotel boutique que respeta su valor histórico.",
    content: `
      <p>La reutilización adaptativa de edificios patrimoniales para usos hoteleros puede ser una estrategia efectiva de conservación.</p>
      
      <h2>Intervención Respetuosa</h2>
      <p>El diseño interior contemporáneo dialoga con los elementos históricos preservados, creando una experiencia única para los huéspedes.</p>
      
      <h2>Viabilidad Económica</h2>
      <p>El proyecto demuestra que la conservación patrimonial puede ser económicamente viable cuando se combina con usos turísticos de calidad.</p>
    `,
    cover_image: "/heritage-boutique-hotel-facade.jpg",
    gallery: [
      "/heritage-boutique-hotel-facade.jpg",
      "/historic-hotel-lobby-design.jpg",
      "/boutique-hotel-room-historic-building.jpg",
      "/preserved-ornamental-ceiling-hotel.jpg",
      "/heritage-building-courtyard-hotel.jpg",
    ],
    category: {
      name: "Propiedades",
      slug: "propiedades",
      subcategory: { name: "Hoteles", slug: "hoteles" },
    },
    tags: [
      { name: "Patrimonio", slug: "patrimonio" },
      { name: "Turismo", slug: "turismo" },
    ],
    author: { full_name: "Diego Vargas", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-18",
    views: 1220,
  },
  {
    id: "16",
    title: "Energías Renovables Integradas a la Arquitectura",
    subtitle: "Fotovoltaica y eólica en edificios urbanos",
    slug: "energias-renovables-arquitectura",
    excerpt:
      "Cómo integrar sistemas de generación de energía renovable en el diseño arquitectónico sin comprometer la estética.",
    content: `
      <p>La integración de sistemas de generación de energía renovable en los edificios es cada vez más sofisticada, permitiendo que estos elementos formen parte del lenguaje arquitectónico.</p>
      
      <h2>Fachadas Fotovoltaicas</h2>
      <p>Paneles solares integrados en las fachadas que funcionan como cerramiento y generadores de energía simultáneamente.</p>
      
      <h2>Micro Eólica Urbana</h2>
      <p>Pequeñas turbinas eólicas diseñadas específicamente para entornos urbanos, aprovechando los vientos canalizados entre edificios.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Sustentable",
      slug: "sustentable",
      subcategory: { name: "Energías Renovables", slug: "energias-renovables" },
    },
    tags: [
      { name: "Energía", slug: "energia" },
      { name: "Renovables", slug: "renovables" },
    ],
    author: { full_name: "Carlos Ruiz", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-19",
    views: 1540,
  },
  {
    id: "17",
    title: "Curiosidades Arquitectónicas de Buenos Aires",
    subtitle: "Secretos ocultos en edificios porteños",
    slug: "curiosidades-arquitectura-buenos-aires",
    excerpt: "Descubrimos detalles arquitectónicos poco conocidos en edificios emblemáticos de la capital argentina.",
    content: `
      <p>Buenos Aires esconde innumerables secretos arquitectónicos en sus edificios, desde pasajes ocultos hasta simbología masónica en fachadas.</p>
      
      <h2>Pasajes y Galerías</h2>
      <p>La red de pasajes comerciales del centro porteño representa una tipología arquitectónica única en América Latina.</p>
      
      <h2>Ornamentación Simbólica</h2>
      <p>Muchos edificios de principios del siglo XX incorporan simbolismo masónico y referencias a la mitología clásica en sus fachadas.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Turismo Cultural",
      slug: "turismo-cultural",
      subcategory: { name: "Curiosidades", slug: "curiosidades" },
    },
    tags: [
      { name: "Historia", slug: "historia" },
      { name: "Buenos Aires", slug: "buenos-aires" },
    ],
    author: { full_name: "María González", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-20",
    views: 1650,
  },
  {
    id: "18",
    title: "Barrios Cerrados: Urbanismo y Segregación",
    subtitle: "El debate sobre las comunidades cerradas",
    slug: "barrios-cerrados-debate",
    excerpt:
      "Análisis crítico sobre el fenómeno de los barrios cerrados y su impacto en la estructura urbana y social.",
    content: `
      <p>Los barrios cerrados se han multiplicado en las periferias de las grandes ciudades latinoamericanas, generando un intenso debate sobre sus implicaciones urbanas y sociales.</p>
      
      <h2>Fragmentación Urbana</h2>
      <p>Cómo estos desarrollos contribuyen a la fragmentación del tejido urbano y la segregación socio-espacial.</p>
      
      <h2>Alternativas</h2>
      <p>Propuestas de desarrollo residencial que ofrecen seguridad sin generar muros que dividan la ciudad.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Propiedades",
      slug: "propiedades",
      subcategory: { name: "Barrios Cerrados", slug: "barrios-cerrados" },
    },
    tags: [
      { name: "Urbanismo", slug: "urbanismo" },
      { name: "Social", slug: "social" },
    ],
    author: { full_name: "Sofía Ramírez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-21",
    views: 1420,
  },
  {
    id: "19",
    title: "Seminario Internacional de Arquitectura Sustentable",
    subtitle: "Expertos globales debaten el futuro de la construcción",
    slug: "seminario-arquitectura-sustentable-2024",
    excerpt: "Crónica del seminario que reunió a los principales referentes mundiales en arquitectura sustentable.",
    content: `
      <p>El seminario internacional sobre arquitectura sustentable reunió a más de 500 profesionales para debatir los desafíos y oportunidades de la construcción verde.</p>
      
      <h2>Ponencias Destacadas</h2>
      <p>Presentaciones sobre economía circular, materiales innovadores y certificaciones ambientales marcaron la agenda del evento.</p>
      
      <h2>Casos de Éxito</h2>
      <p>Proyectos latinoamericanos demostraron que la arquitectura sustentable es viable y replicable en nuestra región.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Eventos / Cursos",
      slug: "eventos-cursos",
      subcategory: { name: "Seminarios", slug: "seminarios" },
    },
    tags: [
      { name: "Eventos", slug: "eventos" },
      { name: "Sustentable", slug: "sustentable" },
    ],
    author: { full_name: "Ana Martínez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-22",
    views: 980,
  },
  {
    id: "20",
    title: "Conservación Preventiva en Monumentos",
    subtitle: "Estrategias de mantenimiento para preservar el patrimonio",
    slug: "conservacion-preventiva-monumentos",
    excerpt:
      "La importancia del mantenimiento regular y la monitorización en la conservación del patrimonio construido.",
    content: `
      <p>La conservación preventiva es la estrategia más efectiva y económica para preservar monumentos históricos a largo plazo.</p>
      
      <h2>Monitoreo Continuo</h2>
      <p>Sistemas de sensores que permiten detectar problemas estructurales o ambientales antes de que se conviertan en daños irreversibles.</p>
      
      <h2>Mantenimiento Programado</h2>
      <p>La importancia de establecer rutinas de mantenimiento que eviten intervenciones mayores y más costosas.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    category: {
      name: "Restauración",
      slug: "restauracion",
      subcategory: { name: "Conservación", slug: "conservacion" },
    },
    tags: [
      { name: "Conservación", slug: "conservacion" },
      { name: "Monumentos", slug: "monumentos" },
    ],
    author: { full_name: "Laura Sánchez", avatar_url: "/placeholder.svg" },
    published_at: "2024-03-23",
    views: 1150,
  },
]

// Mock interviews
export const mockInterviews = [
  {
    id: "1",
    title: "Conversación con Alejandro Aravena",
    slug: "entrevista-alejandro-aravena",
    excerpt: "El arquitecto chileno nos habla sobre arquitectura social y su visión del futuro urbano.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo defines la arquitectura social?</p>
      <p><strong>Alejandro Aravena:</strong> La arquitectura social es aquella que pone las necesidades de las personas en el centro del proceso de diseño. No se trata solo de construir viviendas, sino de crear comunidades.</p>
      
      <p><strong>H:</strong> ¿Cuál es el mayor desafío que enfrenta la arquitectura contemporánea?</p>
      <p><strong>AA:</strong> El cambio climático y la desigualdad urbana são os dois grandes desafios. Necesitamos repensar cómo diseñamos nuestras ciudades para que sean más sostenibles e inclusivas.</p>
      
      <p><strong>H:</strong> ¿Qué consejo le darías a los jóvenes arquitectos?</p>
      <p><strong>AA:</strong> Que no pierdan la curiosidad y que siempre cuestionen el status quo. La arquitectura tiene el poder de mejorar la vida de las personas, pero solo si estamos dispuestos a innovar.</p>
    `,
    cover_image: "/architect-portrait-interview.jpg",
    audio_url: "/interviews/aravena-interview.mp3",
    interviewee_name: "Alejandro Aravena",
    interviewee_title: "Arquitecto, Premio Pritzker 2016",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Arquitectura Social", slug: "arquitectura-social" },
    ],
    published_at: "2024-03-14",
    views: 1500,
  },
  {
    id: "2",
    title: "En Diálogo con Tatiana Bilbao",
    slug: "entrevista-tatiana-bilbao",
    excerpt: "La arquitecta mexicana comparte su visión sobre vivienda social y diseño sustentable.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo abordas el tema de la vivienda social en tu práctica?</p>
      <p><strong>Tatiana Bilbao:</strong> Para mí, la vivienda social no es solo un problema técnico, es un problema cultural. Necesitamos entender cómo vive la gente y diseñar desde esa realidad.</p>
      
      <p><strong>H:</strong> ¿Qué papel juega la sustentabilidad en tus proyectos?</p>
      <p><strong>TB:</strong> La sustentabilidad debe ser inherente al diseño, no un agregado. Trabajamos con materiales locales y técnicas constructivas tradicionales que son naturalmente sostenibles.</p>
    `,
    cover_image: "/architect-portrait-professional.jpg",
    audio_url: "/interviews/bilbao-interview.mp3",
    interviewee_name: "Tatiana Bilbao",
    interviewee_title: "Arquitecta, Fundadora de Tatiana Bilbao Estudio",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Vivienda Social", slug: "vivienda-social" },
    ],
    published_at: "2024-03-05",
    views: 1200,
  },
  {
    id: "3",
    title: "Diálogo con Carme Pinós",
    slug: "entrevista-carme-pinos",
    excerpt: "La arquitecta catalana reflexiona sobre su trayectoria y el papel de la mujer en la arquitectura.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo ha evolucionado tu lenguaje arquitectónico a lo largo de los años?</p>
      <p><strong>Carme Pinós:</strong> Siempre he buscado que la arquitectura responda al lugar y a las necesidades específicas. Mi lenguaje ha madurado, pero la esencia permanece: buscar la tensión entre forma y función.</p>
      
      <p><strong>H:</strong> ¿Qué significa para ti ser una referente femenina en arquitectura?</p>
      <p><strong>CP:</strong> Es una responsabilidad y una alegría. Hemos avanzado mucho, pero aún queda camino por recorrer para alcanzar la equidad plena en nuestra profesión.</p>
      
      <p><strong>H:</strong> ¿Cuál es tu proyecto más significativo?</p>
      <p><strong>CP:</strong> Cada proyecto tiene su lugar especial, pero la Torre Cube en Guadalajara representa un momento de madurez en mi búsqueda de la expresión estructural.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/pinos-interview.mp3",
    interviewee_name: "Carme Pinós",
    interviewee_title: "Arquitecta, Fundadora de Estudio Carme Pinós",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Arquitectura Contemporánea", slug: "arquitectura-contemporanea" },
    ],
    published_at: "2024-03-24",
    views: 1340,
  },
  {
    id: "4",
    title: "Conversación con Shigeru Ban",
    slug: "entrevista-shigeru-ban",
    excerpt: "El arquitecto japonés habla sobre arquitectura de emergencia y su uso innovador de materiales.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo surgió tu interés por la arquitectura de emergencia?</p>
      <p><strong>Shigeru Ban:</strong> Después del terremoto de Kobe en 1995, sentí que los arquitectos tenían una responsabilidad social. La arquitectura no es solo para los privilegiados.</p>
      
      <p><strong>H:</strong> Tu trabajo con tubos de cartón es revolucionario. ¿Cómo comenzó esta investigación?</p>
      <p><strong>SB:</strong> Buscaba un material económico, reciclable y sorprendentemente resistente. El cartón cumple todos estos requisitos y puede usarse temporalmente o de forma permanente.</p>
      
      <p><strong>H:</strong> ¿Qué mensaje quieres transmitir a los arquitectos latinoamericanos?</p>
      <p><strong>SB:</strong> Que vean la arquitectura como una herramienta de cambio social. Los desastres naturales y la pobreza no son problemas exclusivos de una región.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/ban-interview.mp3",
    interviewee_name: "Shigeru Ban",
    interviewee_title: "Arquitecto, Premio Pritzker 2014",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Emergencia", slug: "emergencia" },
    ],
    published_at: "2024-03-25",
    views: 1680,
  },
  {
    id: "5",
    title: "En Diálogo con Marina Waisman (archivo histórico)",
    slug: "entrevista-marina-waisman-archivo",
    excerpt: "Recuperamos una conversación histórica con la crítica argentina sobre identidad en arquitectura.",
    content: `
      <p><strong>Habitat:</strong> ¿Qué significa la identidad en la arquitectura latinoamericana?</p>
      <p><strong>Marina Waisman:</strong> La identidad no es reproducir formas del pasado, sino entender nuestra realidad y responder a ella con autenticidad. Es construir desde nuestras propias circunstancias.</p>
      
      <p><strong>H:</strong> ¿Cómo ve el fenómeno de la globalización en arquitectura?</p>
      <p><strong>MW:</strong> La globalización puede ser enriquecedora si mantenemos nuestra voz crítica. El peligro está en la homogeneización acrítica que borra las particularidades culturales.</p>
      
      <p><strong>H:</strong> ¿Cuál es el rol de la crítica arquitectónica?</p>
      <p><strong>MW:</strong> La crítica debe ser un espacio de reflexión, no solo de opinión. Debe ayudarnos a entender el sentido profundo de la arquitectura en nuestra sociedad.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/waisman-interview.mp3",
    interviewee_name: "Marina Waisman",
    interviewee_title: "Crítica de Arquitectura e Historiadora",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Teoría", slug: "teoria" },
    ],
    published_at: "2024-03-26",
    views: 1120,
  },
  {
    id: "6",
    title: "Conversación con Balkrishna Doshi",
    slug: "entrevista-balkrishna-doshi",
    excerpt: "El maestro indio habla sobre arquitectura vernácula y modernidad en contextos tradicionales.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo integra la tradición india en su arquitectura moderna?</p>
      <p><strong>Balkrishna Doshi:</strong> No se trata de copiar formas tradicionales, sino de entender los principios subyacentes: el clima, la vida comunitaria, el uso del espacio exterior. Esos valores son atemporales.</p>
      
      <p><strong>H:</strong> Trabajó con Le Corbusier. ¿Qué aprendió de esa experiencia?</p>
      <p><strong>BD:</strong> Aprendí a pensar en grande, pero también entendí que cada lugar requiere su propia respuesta. Lo que funciona en Europa no necesariamente funciona en India.</p>
      
      <p><strong>H:</strong> ¿Cuál es su visión sobre la vivienda social?</p>
      <p><strong>BD:</strong> La vivienda debe celebrar la vida, no solo proveer refugio. Debe facilitar las relaciones sociales y permitir que la comunidad prospere.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/doshi-interview.mp3",
    interviewee_name: "Balkrishna Doshi",
    interviewee_title: "Arquitecto, Premio Pritzker 2018",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Vernáculo", slug: "vernacular" },
    ],
    published_at: "2024-03-27",
    views: 1290,
  },
  {
    id: "7",
    title: "Diálogo con Anna Heringer",
    slug: "entrevista-anna-heringer",
    excerpt: "La arquitecta alemana comparte su experiencia construyendo con tierra en Bangladesh.",
    content: `
      <p><strong>Habitat:</strong> ¿Cómo llegó a trabajar con comunidades en Bangladesh?</p>
      <p><strong>Anna Heringer:</strong> Fue durante mis estudios. Quería demostrar que con materiales locales y técnicas tradicionales se pueden crear espacios dignos y hermosos.</p>
      
      <p><strong>H:</strong> ¿Cuáles son las ventajas de construir con tierra?</p>
      <p><strong>AH:</strong> Es un material local, económico, regulador térmico natural y completamente reciclable. Además, las técnicas son conocidas por las comunidades, generando autonomía constructiva.</p>
      
      <p><strong>H:</strong> ¿Cómo balancea estética y funcionalidad en contextos de pobreza?</p>
      <p><strong>AH:</strong> La belleza no es un lujo, es una necesidad humana. Crear espacios hermosos dignifica a las personas y fortalece su identidad comunitaria.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/heringer-interview.mp3",
    interviewee_name: "Anna Heringer",
    interviewee_title: "Arquitecta, Especialista en Construcción con Tierra",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Tierra", slug: "tierra" },
    ],
    published_at: "2024-03-28",
    views: 1440,
  },
  {
    id: "8",
    title: "Conversación con Giancarlo Mazzanti",
    slug: "entrevista-giancarlo-mazzanti",
    excerpt: "El arquitecto colombiano reflexiona sobre arquitectura pública y transformación social.",
    content: `
      <p><strong>Habitat:</strong> Sus proyectos públicos en Medellín han transformado la ciudad. ¿Cuál es su filosofía?</p>
      <p><strong>Giancarlo Mazzanti:</strong> Creo en la arquitectura como herramienta de inclusión social. Los espacios públicos de calidad no son un lujo, son un derecho que dignifica a las comunidades.</p>
      
      <p><strong>H:</strong> ¿Cómo logra que sus edificios generen apropiación comunitaria?</p>
      <p><strong>GM:</strong> Diseñando espacios flexibles y acogedores que inviten al encuentro. La arquitectura debe facilitar, no imponer comportamientos.</p>
      
      <p><strong>H:</strong> ¿Qué proyecto considera su mayor logro?</p>
      <p><strong>GM:</strong> Los colegios y bibliotecas públicas en barrios marginales. Ver cómo esos espacios transforman vidas es la mayor satisfacción de un arquitecto.</p>
    `,
    cover_image: "/placeholder.svg?height=800&width=1200",
    audio_url: "/interviews/mazzanti-interview.mp3",
    interviewee_name: "Giancarlo Mazzanti",
    interviewee_title: "Arquitecto, Fundador de El Equipo de Mazzanti",
    category: {
      name: "Artículos",
      slug: "articulos",
      subcategory: { name: "Entrevistas", slug: "entrevistas" },
    },
    tags: [
      { name: "Entrevista", slug: "entrevista" },
      { name: "Arquitectura Pública", slug: "arquitectura-publica" },
    ],
    published_at: "2024-03-29",
    views: 1560,
  },
]

// Mock magazines
export const mockMagazines = [
  {
    id: "62",
    title: "Habitat Edición 62",
    subtitle: "Arquitectura y Naturaleza",
    description:
      "Esta edición explora el vínculo entre arquitectura y paisaje, destacando proyectos que integran armónicamente el entorno natural con el diseño contemporáneo. Se analizan obras que resignifican el diálogo entre lo construido y lo vivo.",
    cover_image: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/portada%20habitat/tapa%20062.jpg",
    price: 18500,
    publication_date: "2024-08-15",
    page_count: 128,
    pdf_url: "/magazines/habitat-62.pdf",
    highlights: [
      "Entrevista a Francis Kéré sobre arquitectura y contexto natural",
      "Proyectos inmersos en el paisaje latinoamericano",
      "Ensayo sobre arquitectura bioclimática y biodiversidad",
      "Galería: refugios sostenibles en zonas rurales",
    ],
    table_of_contents: [
      { title: "Editorial: La Arquitectura como Extensión del Territorio", page: 3 },
      { title: "Entrevista: Francis Kéré, Construir con la Tierra", page: 12 },
      { title: "Proyecto Destacado: Casa Refugio en la Selva Misionera", page: 28 },
      { title: "Ensayo: Biodiversidad y Diseño Arquitectónico", page: 44 },
      { title: "Galería: Arquitectura y Naturaleza", page: 70 },
    ],
    issue_number: 62,
    status: "available" as const,
  },
  {
    id: "63",
    title: "Habitat Edición 63",
    subtitle: "Vivienda Social y Comunidad",
    description:
      "Dedicada a las experiencias de vivienda social en América Latina, esta edición analiza proyectos que promueven la inclusión, la participación comunitaria y el derecho al hábitat digno.",
    cover_image: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/portada%20habitat/tapa%20063.jpg",
    price: 18500,
    publication_date: "2024-09-15",
    page_count: 122,
    pdf_url: "/magazines/habitat-63.pdf",
    highlights: [
      "Entrevista a Solano Benítez sobre arquitectura social",
      "Casos de autogestión habitacional en Argentina y Chile",
      "Ensayo: la vivienda como derecho humano",
      "Galería: cooperativas de vivienda en América Latina",
    ],
    table_of_contents: [
      { title: "Editorial: Construir Comunidad", page: 3 },
      { title: "Entrevista: Solano Benítez y la Arquitectura Social", page: 10 },
      { title: "Proyecto Destacado: Cooperativa Los Hornos", page: 25 },
      { title: "Ensayo: La Vivienda como Derecho", page: 42 },
      { title: "Galería: Experiencias de Autogestión", page: 65 },
    ],
    issue_number: 63,
    status: "available" as const,
  },
  {
    id: "65",
    title: "Habitat Edición 65",
    subtitle: "Tecnología y Futuro Urbano",
    description:
      "Esta edición se adentra en las transformaciones tecnológicas que redefinen las ciudades contemporáneas. Desde la inteligencia artificial hasta la robótica constructiva, analizamos su impacto en el hábitat urbano.",
    cover_image: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/portada%20habitat/tapa%20065.jpg",
    price: 19000,
    publication_date: "2024-11-15",
    page_count: 130,
    pdf_url: "/magazines/habitat-65.pdf",
    highlights: [
      "Entrevista con Carlo Ratti sobre ciudades inteligentes",
      "Prototipos urbanos con IA y sustentabilidad",
      "Ensayo sobre el impacto de la automatización en la arquitectura",
      "Guía: herramientas digitales para el diseño urbano",
    ],
    table_of_contents: [
      { title: "Editorial: El Futuro Digital del Espacio Urbano", page: 3 },
      { title: "Entrevista: Carlo Ratti y la Ciudad Sensorial", page: 14 },
      { title: "Proyecto Destacado: Smart City Medellín", page: 32 },
      { title: "Ensayo: Inteligencia Artificial en la Arquitectura", page: 49 },
      { title: "Guía: Nuevas Herramientas Digitales", page: 70 },
    ],
    issue_number: 65,
    status: "available" as const,
  },
  {
    id: "66",
    title: "Habitat Edición 66",
    subtitle: "Arquitectura del Paisaje",
    description:
      "Exploramos cómo el diseño del paisaje redefine los límites entre arquitectura, ecología y arte. Una mirada a proyectos que transforman el territorio desde la sensibilidad ambiental.",
    cover_image: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/portada%20habitat/tapa%20066.jpg",
    price: 19500,
    publication_date: "2024-12-15",
    page_count: 118,
    pdf_url: "/magazines/habitat-66.pdf",
    highlights: [
      "Entrevista con Martha Schwartz sobre paisajismo contemporáneo",
      "Proyectos de reforestación urbana en América del Sur",
      "Ensayo: estética y ecología del territorio",
      "Galería: parques y jardines transformadores",
    ],
    table_of_contents: [
      { title: "Editorial: El Paisaje como Proyecto", page: 3 },
      { title: "Entrevista: Martha Schwartz y la Ecología del Diseño", page: 12 },
      { title: "Proyecto Destacado: Parque Costero Rosario", page: 28 },
      { title: "Ensayo: Estética y Ecología del Territorio", page: 46 },
      { title: "Galería: Intervenciones Paisajísticas", page: 68 },
    ],
    issue_number: 66,
    status: "available" as const,
  },
  {
    id: "67",
    title: "Habitat Edición 67",
    subtitle: "Arquitectura y Memoria",
    description:
      "Esta edición reflexiona sobre la arquitectura como vehículo de memoria colectiva. Incluye proyectos que reinterpretan espacios históricos y resignifican el pasado en clave contemporánea.",
    cover_image: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/portada%20habitat/tapa%20067.jpg",
    price: 20000,
    publication_date: "2025-01-15",
    page_count: 124,
    pdf_url: "/magazines/habitat-67.pdf",
    highlights: [
      "Entrevista con Lina Ghotmeh sobre memoria y materialidad",
      "Proyectos que resignifican sitios patrimoniales",
      "Ensayo: la arquitectura como relato histórico",
      "Galería: espacios de memoria urbana",
    ],
    table_of_contents: [
      { title: "Editorial: Arquitectura y Recuerdo Colectivo", page: 3 },
      { title: "Entrevista: Lina Ghotmeh sobre la Memoria del Espacio", page: 14 },
      { title: "Proyecto Destacado: Museo de la Memoria Bogotá", page: 30 },
      { title: "Ensayo: El Relato Arquitectónico del Pasado", page: 50 },
      { title: "Galería: Espacios de Memoria", page: 72 },
    ],
    issue_number: 67,
    status: "coming_soon" as const,
  },
]

// Mock user purchases (for demo)
export const mockPurchases = [
  {
    id: "1",
    magazine_id: "1",
    purchase_date: "2024-03-01",
  },
  {
    id: "2",
    magazine_id: "2",
    purchase_date: "2024-03-10",
  },
]

// Helper functions to get individual items
export function getArticleBySlug(slug: string) {
  return mockArticles.find((article) => article.slug === slug)
}

export function getInterviewBySlug(slug: string) {
  return mockInterviews.find((interview) => interview.slug === slug)
}

export function getMagazineById(id: string) {
  return mockMagazines.find((magazine) => magazine.id === id)
}

// Search function
export function searchContent(query: string) {
  const lowerQuery = query.toLowerCase()

  const articles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery),
  )

  const interviews = mockInterviews.filter(
    (interview) =>
      interview.title.toLowerCase().includes(lowerQuery) ||
      interview.excerpt.toLowerCase().includes(lowerQuery) ||
      interview.interviewee_name.toLowerCase().includes(lowerQuery),
  )

  const magazines = mockMagazines.filter(
    (magazine) =>
      magazine.title.toLowerCase().includes(lowerQuery) ||
      magazine.subtitle.toLowerCase().includes(lowerQuery) ||
      magazine.description.toLowerCase().includes(lowerQuery),
  )

  return { articles, interviews, magazines }
}

// Get articles by tag
export function getArticlesByTag(tagSlug: string) {
  return mockArticles.filter((article) => article.tags.some((tag) => tag.slug === tagSlug))
}

// Get articles by category
export function getArticlesByCategory(categorySlug: string) {
  return mockArticles.filter((article) => article.category.slug === categorySlug)
}

// Get all unique tags
export function getAllTags() {
  const tagsMap = new Map()

  mockArticles.forEach((article) => {
    article.tags.forEach((tag) => {
      if (!tagsMap.has(tag.slug)) {
        tagsMap.set(tag.slug, { ...tag, count: 0 })
      }
      tagsMap.get(tag.slug).count++
    })
  })

  return Array.from(tagsMap.values())
}

// Check if user has purchased a magazine
export function hasPurchasedMagazine(magazineId: string): boolean {
  return mockPurchases.some((purchase) => purchase.magazine_id === magazineId)
}

// Get user's purchased magazines
export function getUserPurchases() {
  return mockPurchases.map((purchase) => ({
    ...purchase,
    magazine: getMagazineById(purchase.magazine_id),
  }))
}

export function getContentBySubcategory(categorySlug: string, subcategorySlug: string) {
  const articles = mockArticles.filter(
    (article) => article.category.slug === categorySlug && article.category.subcategory?.slug === subcategorySlug,
  )

  const interviews = mockInterviews.filter(
    (interview) => interview.category.slug === categorySlug && interview.category.subcategory?.slug === subcategorySlug,
  )

  return { articles, interviews }
}
