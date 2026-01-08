import { readItems, readItem, createItem } from "@directus/sdk"
import { getDirectusClient } from "./client"
import type { Articulo, Categoria, Autor, Etiqueta, ArticuloFile, Fundacion, Entrevista, Comentario } from "./types"

// ===== ARTICULOS (ARTICLES) =====

export async function getArticulos(options?: {
  limit?: number
  offset?: number
  filter?: any
  sort?: string[]
  search?: string
}) {
  try {
    const client = getDirectusClient()

    const query: any = {
      limit: options?.limit || 50,
      offset: options?.offset || 0,
      filter: {
        estado: { _eq: "publicado" },
        ...(options?.filter || {}),
      },
      sort: options?.sort || ["-fecha_publicacion"],
      fields: [
        "*",
        "categoria.id",
        "categoria.nombre",
        "categoria.slug",
        "categoria.categoria_padre",
        "subcategoria.id",
        "subcategoria.nombre",
        "subcategoria.slug",
        "subcategoria.categoria_padre",
        "autor.id",
        "autor.nombre",
        "autor.avatar",
        "autor.biografia",
      ],
    }

    if (options?.search) {
      query.search = options.search
    }

    console.log("[v0] Fetching articulos with query:", JSON.stringify(query))
    const result = await client.request(readItems("articulos", query))
    console.log("[v0] Fetched articulos count:", Array.isArray(result) ? result.length : 0)
    return result as Articulo[]
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    const errorStack = error instanceof Error ? error.stack : ""
    console.error("[v0] Error in getArticulos:", errorMessage)
    if (errorStack) console.error("[v0] Stack:", errorStack)
    console.error("[v0] Full error object:", error)
    throw error
  }
}

export async function getArticuloBySlug(slug: string): Promise<Articulo | null> {
  try {
    const client = getDirectusClient()

    const decodedSlug = decodeURIComponent(slug)
    console.log("[v0] Fetching articulo by slug:", decodedSlug)

    const articulos = (await client.request(
      readItems("articulos", {
        filter: {
          slug: { _eq: decodedSlug },
          // Removed estado filter to allow viewing draft and archived articles
        },
        fields: [
          "*",
          "categoria.id",
          "categoria.nombre",
          "categoria.slug",
          "subcategoria.id",
          "subcategoria.nombre",
          "subcategoria.slug",
          "autor.id",
          "autor.nombre",
          "autor.email", // Added author email field
          "autor.avatar",
          "autor.biografia",
        ],
        limit: 1,
      }),
    )) as Articulo[]

    console.log("[v0] Articulo found:", articulos.length > 0 ? articulos[0].titulo : "Not found")

    return articulos[0] || null
  } catch (error) {
    console.error("[v0] Error in getArticuloBySlug:", error)
    return null
  }
}

export async function getArticulosDestacados(limit = 6) {
  const client = getDirectusClient()

  return client.request(
    readItems("articulos", {
      filter: {
        estado: { _eq: "publicado" },
        destacado: { _eq: true },
      },
      sort: ["-fecha_publicacion"],
      limit,
      fields: ["*", "categoria.id", "categoria.nombre", "categoria.slug", "autor.id", "autor.nombre", "autor.avatar"],
    }),
  ) as Promise<Articulo[]>
}

export async function getArticulosByCategoria(categoriaId: number, limit = 20) {
  const client = getDirectusClient()

  return client.request(
    readItems("articulos", {
      filter: {
        estado: { _eq: "publicado" },
        categoria: { _eq: categoriaId },
      },
      sort: ["-fecha_publicacion"],
      limit,
      fields: ["*", "categoria.id", "categoria.nombre", "categoria.slug", "autor.id", "autor.nombre", "autor.avatar"],
    }),
  ) as Promise<Articulo[]>
}

// Get gallery images for an article
export async function getArticuloGaleria(articuloId: number) {
  const client = getDirectusClient()

  return client.request(
    readItems("articulos_files", {
      filter: {
        articulos_id: { _eq: articuloId },
      },
      fields: ["id", "directus_files_id"],
    }),
  ) as Promise<ArticuloFile[]>
}

// ===== CATEGORIAS =====

export async function getCategorias() {
  const client = getDirectusClient()

  return client.request(
    readItems("categorias", {
      filter: {
        estado: { _eq: "publicado" },
      },
      sort: ["orden", "nombre"],
    }),
  ) as Promise<Categoria[]>
}

export async function getCategoriaBySlug(slug: string) {
  const client = getDirectusClient()

  const categorias = (await client.request(
    readItems("categorias", {
      filter: {
        slug: { _eq: slug },
        estado: { _eq: "publicado" },
      },
      limit: 1,
    }),
  )) as Categoria[]

  return categorias[0] || null
}

export async function getCategoriaById(id: number) {
  const client = getDirectusClient()

  return client.request(readItem("categorias", id)) as Promise<Categoria>
}

// Get all subcategories (categories that have a parent)
export async function getSubcategorias() {
  const client = getDirectusClient()

  return client.request(
    readItems("categorias", {
      filter: {
        estado: { _eq: "publicado" },
        categoria_padre: { _nnull: true },
      },
      sort: ["orden", "nombre"],
    }),
  ) as Promise<Categoria[]>
}

// Get subcategory by slug
export async function getSubcategoriaBySlug(slug: string) {
  const client = getDirectusClient()

  const categorias = (await client.request(
    readItems("categorias", {
      filter: {
        slug: { _eq: slug },
        estado: { _eq: "publicado" },
      },
      limit: 1,
    }),
  )) as Categoria[]

  return categorias[0] || null
}

// Get articles by subcategory ID
export async function getArticulosBySubcategoria(subcategoriaId: number, limit = 20) {
  const client = getDirectusClient()

  return client.request(
    readItems("articulos", {
      filter: {
        estado: { _eq: "publicado" },
        subcategoria: { _eq: subcategoriaId },
      },
      sort: ["-fecha_publicacion"],
      limit,
      fields: [
        "*",
        "categoria.id",
        "categoria.nombre",
        "categoria.slug",
        "categoria.categoria_padre",
        "subcategoria.id",
        "subcategoria.nombre",
        "subcategoria.slug",
        "subcategoria.categoria_padre",
        "autor.id",
        "autor.nombre",
        "autor.avatar",
      ],
    }),
  ) as Promise<Articulo[]>
}

// Get articles by status (for draft/archived views)
export async function getArticulosByEstado(
  estado: "publicado" | "borrador" | "archivado",
  options?: {
    limit?: number
    offset?: number
    sort?: string[]
  }
) {
  try {
    const client = getDirectusClient()

    const query: any = {
      limit: options?.limit || 50,
      offset: options?.offset || 0,
      filter: {
        estado: { _eq: estado },
      },
      sort: options?.sort || ["-fecha_publicacion"],
      fields: [
        "*",
        "categoria.id",
        "categoria.nombre",
        "categoria.slug",
        "categoria.categoria_padre",
        "subcategoria.id",
        "subcategoria.nombre",
        "subcategoria.slug",
        "subcategoria.categoria_padre",
        "autor.id",
        "autor.nombre",
        "autor.avatar",
        "autor.biografia",
      ],
    }

    console.log(`[v0] Fetching articulos with estado: ${estado}`)
    const result = await client.request(readItems("articulos", query))
    console.log(`[v0] Fetched ${Array.isArray(result) ? result.length : 0} articulos with estado: ${estado}`)
    return result as Articulo[]
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    console.error(`[v0] Error in getArticulosByEstado (${estado}):`, errorMessage)
    throw error
  }
}

// Get draft articles
export async function getArticulosBorrador(options?: {
  limit?: number
  offset?: number
  sort?: string[]
}) {
  return getArticulosByEstado("borrador", options)
}

// Get archived articles
export async function getArticulosArchivados(options?: {
  limit?: number
  offset?: number
  sort?: string[]
}) {
  return getArticulosByEstado("archivado", options)
}

// ===== AUTORES =====

export async function getAutores() {
  const client = getDirectusClient()

  return client.request(
    readItems("autores", {
      filter: {
        estado: { _eq: "activo" },
      },
      sort: ["nombre"],
    }),
  ) as Promise<Autor[]>
}

export async function getAutorById(id: number) {
  const client = getDirectusClient()

  return client.request(readItem("autores", id)) as Promise<Autor>
}

// ===== ETIQUETAS =====

export async function getEtiquetas() {
  const client = getDirectusClient()

  return client.request(
    readItems("etiquetas", {
      filter: {
        estado: { _eq: "publicado" },
      },
      sort: ["nombre"],
    }),
  ) as Promise<Etiqueta[]>
}

// ===== BÚSQUEDA =====

export async function buscarContenido(query: string) {
  const client = getDirectusClient()

  const articulos = (await client.request(
    readItems("articulos", {
      search: query,
      filter: { estado: { _eq: "publicado" } },
      limit: 20,
      fields: ["*", "categoria.id", "categoria.nombre", "categoria.slug", "autor.id", "autor.nombre"],
    }),
  )) as Articulo[]

  return { articulos }
}

// ===== LEGACY FUNCTIONS (backwards compatibility) =====

export async function getArticles(options?: {
  limit?: number
  offset?: number
  filter?: any
  sort?: string[]
  search?: string
}) {
  return getArticulos(options)
}

export async function getArticleBySlug(slug: string) {
  return getArticuloBySlug(slug)
}

export async function getFeaturedArticles(limit = 6) {
  return getArticulosDestacados(limit)
}

export async function getArticlesByCategory(categorySlug: string, limit = 20) {
  const categoria = await getCategoriaBySlug(categorySlug)
  if (!categoria) return []
  return getArticulosByCategoria(categoria.id, limit)
}

export async function getArticlesByTag(tagSlug: string, limit = 20) {
  // For now, return all articles - tag filtering requires join table
  return getArticulos({ limit })
}

// ===== ENTREVISTAS =====

export async function getInterviews(options?: {
  limit?: number
  offset?: number
  filter?: any
}) {
  try {
    const client = getDirectusClient()

    const result = await client.request(
      readItems("entrevistas", {
        limit: options?.limit || 20,
        offset: options?.offset || 0,
        filter: {
          estado: { _eq: "publicado" },
          ...(options?.filter || {}),
        },
        sort: ["-fecha_publicacion"],
        fields: [
          "*",
          "categoria.id",
          "categoria.nombre",
          "categoria.slug",
          "autor.id",
          "autor.nombre",
          "autor.avatar",
          "galeria.directus_files_id"
        ],
      })
    )

    return result as Entrevista[]
  } catch (error) {
    console.error("[v0] Error fetching interviews:", error)
    return []
  }
}

export async function getInterviewBySlug(slug: string) {
  try {
    const client = getDirectusClient()
    const decodedSlug = decodeURIComponent(slug)

    const result = await client.request(
      readItems("entrevistas", {
        filter: {
          slug: { _eq: decodedSlug },
          estado: { _eq: "publicado" },
        },
        limit: 1,
        fields: [
          "*",
          "categoria.id",
          "categoria.nombre",
          "categoria.slug",
          "autor.id",
          "autor.nombre",
          "autor.avatar",
          "autor.biografia",
          "galeria.directus_files_id"
        ],
      })
    )
    return (result && result.length > 0) ? result[0] as Entrevista : null
  } catch (error) {
    console.error("[v0] Error fetching interview by slug:", error)
    return null
  }
}

export async function getMagazines(options?: any) {
  return []
}

export async function getMagazineById(id: number) {
  return null
}

export async function getMagazineBySlug(slug: string) {
  return null
}

export async function getCategories() {
  return getCategorias()
}

export async function getCategoryBySlug(slug: string) {
  return getCategoriaBySlug(slug)
}

export async function getTags() {
  return getEtiquetas()
}

export async function getActiveAds(options?: any) {
  return []
}

export async function getRandomAd(size: string) {
  return null
}

export async function searchContent(query: string) {
  const result = await buscarContenido(query)
  return { articles: result.articulos, interviews: [], magazines: [] }
}

export async function getMixedContent(limit = 20): Promise<(Articulo | Entrevista)[]> {
  try {
    const [articulos, entrevistas] = await Promise.all([
      getArticulos({ limit }),
      getInterviews({ limit })
    ]);

    // Combine and sort by date descending
    const mixed = [...articulos, ...entrevistas].sort((a, b) => {
      return new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime();
    });

    return mixed.slice(0, limit);
  } catch (error) {
    console.error("[v0] Error in getMixedContent:", error);
    return [];
  }
}

export async function incrementViews(collection: "articles" | "interviews", id: number) {
  console.log(`[v0] Would increment views for ${collection} ${id}`)
}

// ===== FUNDACIONES =====

export async function getFundaciones(options?: {
  limit?: number
  offset?: number
}) {
  try {
    const client = getDirectusClient()

    const result = await client.request(
      readItems("fundaciones", {
        filter: {
          estado: { _eq: "publicado" },
        },
        sort: ["orden", "nombre"],
        limit: options?.limit || 100,
        offset: options?.offset || 0,
      })
    )
    return result as Fundacion[]
  } catch (error: any) {
    // Silently return empty array if collection doesn't exist yet
    if (error?.errors?.[0]?.extensions?.code === 'FORBIDDEN' ||
      error?.message?.includes('fundaciones')) {
      console.log("[v0] Fundaciones collection not configured yet - returning empty array")
    } else {
      console.error("[v0] Error in getFundaciones:", error)
    }
    return []
  }
}

export async function getFundacionBySlug(slug: string): Promise<Fundacion | null> {
  try {
    const client = getDirectusClient()

    const fundaciones = await client.request(
      readItems("fundaciones", {
        filter: {
          slug: { _eq: slug },
          estado: { _eq: "publicado" },
        },
        limit: 1,
      })
    ) as Fundacion[]

    return fundaciones[0] || null
  } catch (error: any) {
    // Silently return null if collection doesn't exist yet
    if (error?.errors?.[0]?.extensions?.code === 'FORBIDDEN' ||
      error?.message?.includes('fundaciones')) {
      console.log("[v0] Fundaciones collection not configured yet")
    } else {
      console.error("[v0] Error in getFundacionBySlug:", error)
    }
    return null
  }
}

// ===== COMENTARIOS =====

export async function getCommentsByArticleId(articleId: number) {
  const client = getDirectusClient()

  try {
    const comments = await client.request(
      readItems("comentarios", {
        filter: {
          article_id: { _eq: articleId },
          status: { _eq: "published" },
        },
        sort: ["-date_created"],
      })
    )
    return comments as Comentario[]
  } catch (error) {
    console.error(`[v0] Error fetching comments for article ${articleId}:`, error)
    return []
  }
}

export async function createComment(data: {
  article_id: number
  author_name: string
  content: string
  status?: string
}) {
  const client = getDirectusClient()

  try {
    const result = await client.request(
      createItem("comentarios", {
        ...data,
        status: data.status || "draft",
      })
    )
    return result as Comentario
  } catch (error) {
    console.error("[v0] Error creating comment:", error)
    throw error
  }
}
