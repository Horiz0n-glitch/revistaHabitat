// Helper function to format category display names
export function getCategoryDisplayName(name: string | undefined): string {
    if (!name) return ''
    if (name === 'RS' || name === 'RSE') return 'RES p.Social'
    return name
}

// Descripciones personalizadas para categorías y subcategorías
export const categoryDescriptions: Record<string, string> = {
    // Artículos
    "articulos": "Descubre análisis profundos, investigaciones y contenido especializado sobre arquitectura, patrimonio y diseño urbano.",
    "entrevistas": "Conversaciones exclusivas con arquitectos, urbanistas, restauradores y profesionales destacados del sector.",
    "reportajes": "Investigaciones detalladas sobre proyectos, tendencias y temas relevantes en arquitectura y patrimonio.",
    "articulos-tecnicos": "Contenido especializado con enfoque técnico sobre metodologías, materiales y procesos constructivos.",
    "columnistas": "Opiniones y reflexiones de expertos sobre los desafíos actuales de la arquitectura y el urbanismo.",

    // Cultura y Patrimonio
    "cultura-y-patrimonio": "Explora la riqueza del patrimonio arquitectónico y cultural, su preservación y puesta en valor.",
    "centros-historicos": "Análisis y noticias sobre la conservación, revitalización y gestión de centros históricos urbanos.",
    "eventos-cursos": "Actividades de formación y eventos culturales relacionados con patrimonio y arquitectura.",

    // Eventos / Cursos
    "cursos": "Programas de capacitación y formación profesional en arquitectura, restauración y patrimonio.",
    "eventos": "Actividades, jornadas y encuentros del sector de la arquitectura y el patrimonio.",
    "concursos-becas": "Convocatorias de concursos de arquitectura, diseño y oportunidades de becas para profesionales.",
    "conferencias": "Charlas magistrales y presentaciones de expertos en arquitectura y urbanismo.",
    "encuentros": "Reuniones profesionales y espacios de intercambio entre especialistas del sector.",
    "eventos-concursos": "Competencias y certámenes de arquitectura, diseño y proyectos urbanos.",
    "exposiciones": "Muestras y exhibiciones de arquitectura, diseño y patrimonio cultural.",
    "ferias-y-congresos": "Grandes eventos del sector: ferias comerciales, congresos internacionales y encuentros masivos.",
    "seminarios": "Jornadas de formación intensiva sobre temas específicos de arquitectura y patrimonio.",

    // Restauración
    "restauracion": "Técnicas, proyectos y metodologías para la restauración de edificios y monumentos históricos.",
    "puesta-en-valor": "Proyectos de recuperación y resignificación de espacios patrimoniales para nuevos usos.",
    "conservacion": "Estrategias y prácticas para la conservación preventiva y mantenimiento del patrimonio edificado.",
    "monumentos": "Noticias y análisis sobre monumentos históricos, su protección y restauración.",

    // Instituciones
    "instituciones": "Organizaciones dedicadas a la preservación del patrimonio, la educación y la investigación arquitectónica.",
    "instituc-de-patrimonio": "Instituciones especializadas en la gestión, protección y difusión del patrimonio cultural.",
    "facultades-instituc-y-escuelas": "Centros educativos de formación en arquitectura, urbanismo y disciplinas relacionadas.",
    "museos": "Espacios museísticos dedicados a la arquitectura, el diseño y el patrimonio cultural.",
    "org-varios": "Otras organizaciones e instituciones vinculadas al sector de la arquitectura y el patrimonio.",

    // Responsabilidad Social (RS)
    "rse": "Iniciativas de responsabilidad social empresarial en arquitectura, construcción y desarrollo urbano sustentable.",
    "fundaciones-y-ong": "Organizaciones sin fines de lucro dedicadas al desarrollo social, cultural y comunitario.",
    "capacitaciones-rse": "Programas de formación en responsabilidad social empresarial y desarrollo sustentable.",
    "cursos-y-eventos-rse": "Actividades educativas y encuentros sobre responsabilidad social en el sector de la construcción.",
    "jornadas-rse": "Encuentros y jornadas sobre prácticas de responsabilidad social empresarial.",
    "educacion-rse": "Contenidos educativos sobre responsabilidad social, ética empresarial y sustentabilidad.",
    "empresas-rse": "Empresas comprometidas con prácticas de responsabilidad social y desarrollo sustentable.",
    "noticias-rse": "Actualidad sobre iniciativas de responsabilidad social en arquitectura y construcción.",

    // Reciclaje
    "reciclaje": "Proyectos de reutilización adaptativa de edificios y espacios urbanos existentes.",
    "reformas-remodelacion": "Intervenciones de actualización y transformación de edificios y espacios construidos.",
    "mantenimiento": "Técnicas y estrategias para el mantenimiento preventivo y correctivo de edificaciones.",

    // Sustentable
    "sustentable": "Arquitectura y urbanismo sustentable: diseño bioclimático, eficiencia energética y construcción verde.",
    "ambiente": "Temas ambientales relacionados con la arquitectura, el urbanismo y el desarrollo territorial.",
    "agua-y-saneamiento": "Gestión sustentable del agua, sistemas de saneamiento y tecnologías hídricas en edificaciones.",
    "bio-arquitectura": "Diseño arquitectónico basado en principios bioclimáticos y armonía con el entorno natural.",
    "eficiencia-energetica": "Estrategias y tecnologías para reducir el consumo energético en edificios y ciudades.",
    "empresas-sustentables": "Empresas comprometidas con prácticas constructivas sustentables y certificaciones ambientales.",
    "energias-renovables": "Integración de energías limpias en proyectos arquitectónicos y desarrollos urbanos.",

    // Turismo Cultural
    "turismo-cultural": "Descubre destinos, rutas y experiencias que vinculan turismo, arquitectura y patrimonio cultural.",
    "recorridos": "Rutas y circuitos turísticos por sitios de interés arquitectónico y patrimonial.",
    "religioso": "Patrimonio religioso: iglesias, templos y espacios de culto con valor histórico y arquitectónico.",
    "curiosidades": "Datos interesantes, historias ocultas y detalles sorprendentes del patrimonio arquitectónico.",
    "informes": "Análisis y reportes sobre el estado del turismo cultural y su impacto en el patrimonio.",
    "novedades": "Últimas noticias y novedades del sector turístico cultural.",

    // Propiedades
    "propiedades": "Mercado inmobiliario, desarrollos residenciales y tendencias en construcción de viviendas.",
    "barrios-cerrados": "Desarrollos urbanísticos cerrados, comunidades planificadas y nuevas formas de habitar.",
    "casas": "Proyectos residenciales unifamiliares: diseño, construcción y tendencias arquitectónicas.",
    "construccion": "Procesos constructivos, tecnologías, materiales y metodologías de obra.",
    "copropietarios": "Gestión de consorcios, administración de edificios y normativas de propiedad horizontal.",
    "desarrollo-inmobiliario": "Proyectos inmobiliarios, inversiones y tendencias del mercado de la construcción.",
    "edificios": "Proyectos de edificios multifamiliares, torres residenciales y desarrollos en altura.",
    "eventos-propiedades": "Ferias, exposiciones y eventos del sector inmobiliario y de la construcción.",
    "hoteles": "Arquitectura hotelera, diseño de espacios de hospitalidad y turismo.",
}
