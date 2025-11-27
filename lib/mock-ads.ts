// Mock advertising data - Static banner images only
export const mockAds = {
  // Leaderboard banners - 1200x200 (full width horizontal)
  leaderboard: [
    {
      id: 1,
      image: "/sustainable-architecture-materials-banner.jpg",
      link: "#",
      alt: "Materiales Sostenibles - EcoMaterials",
    },
    {
      id: 2,
      image: "/architecture-design-software-banner.jpg",
      link: "#",
      alt: "Software de Diseño Arquitectónico - ArchCAD Pro",
    },
    {
      id: 3,
      image: "/green-building-certification-banner.jpg",
      link: "#",
      alt: "Certificación LEED - GreenBuild Academy",
    },
  ],
  // Medium rectangle - 336x280 (sidebar)
  rectangle: [
    {
      id: 1,
      image: "/modern-led-lighting-design.jpg",
      link: "#",
      alt: "Iluminación LED - LuxDesign",
    },
    {
      id: 2,
      image: "/contemporary-office-furniture.jpg",
      link: "#",
      alt: "Mobiliario de Oficina - ModernSpace",
    },
    {
      id: 3,
      image: "/architectural-rendering-services.jpg",
      link: "#",
      alt: "Renders Profesionales - RenderPro Studio",
    },
    {
      id: 4,
      image: "/interior-design-consultation.png",
      link: "#",
      alt: "Consultoría de Diseño Interior - InteriorPro",
    },
  ],
  // Large billboard - 970x300 (between content)
  billboard: [
    {
      id: 1,
      image: "/architecture-magazine-subscription.jpg",
      link: "#",
      alt: "Revista Digital Premium - ArchDaily",
    },
    {
      id: 2,
      image: "/3d-texture-library-architecture.jpg",
      link: "#",
      alt: "Biblioteca de Texturas - TextureHub",
    },
    {
      id: 3,
      image: "/construction-materials-supplier.jpg",
      link: "#",
      alt: "Materiales de Construcción - BuildMart",
    },
  ],
  skyscraper: [
    {
      id: 1,
      image: "/architecture-books-collection.jpg",
      link: "#",
      alt: "Biblioteca de Arquitectura - ArchBooks",
    },
    {
      id: 2,
      image: "/architecture-courses-online.jpg",
      link: "#",
      alt: "Cursos de Arquitectura Online - LearnArch",
    },
    {
      id: 3,
      image: "/architecture-tools-equipment.jpg",
      link: "#",
      alt: "Herramientas Profesionales - ArchTools",
    },
  ],
  square: [
    {
      id: 1,
      image: "/architecture-event-conference.jpg",
      link: "#",
      alt: "Conferencia de Arquitectura 2025",
    },
    {
      id: 2,
      image: "/architecture-competition.jpg",
      link: "#",
      alt: "Concurso Internacional de Diseño",
    },
    {
      id: 3,
      image: "/architecture-portfolio-service.jpg",
      link: "#",
      alt: "Servicios de Portfolio - PortfolioPro",
    },
  ],
  "article-card": [
    {
      id: 1,
      image: "/sustainable-building-materials-ad.jpg",
      link: "#",
      alt: "Materiales de Construcción Sostenible",
    },
    {
      id: 2,
      image: "/architecture-software-tools-ad.jpg",
      link: "#",
      alt: "Software de Diseño Arquitectónico",
    },
    {
      id: 3,
      image: "/modern-furniture-design-ad.jpg",
      link: "#",
      alt: "Mobiliario de Diseño Contemporáneo",
    },
    {
      id: 4,
      image: "/architectural-lighting-solutions-ad.jpg",
      link: "#",
      alt: "Soluciones de Iluminación Arquitectónica",
    },
  ],
}

// Helper function to get random ad from a category
export function getRandomAd(category: keyof typeof mockAds) {
  const ads = mockAds[category]
  return ads[Math.floor(Math.random() * ads.length)]
}

export function getAdBySize(size: keyof typeof mockAds) {
  return getRandomAd(size)
}
