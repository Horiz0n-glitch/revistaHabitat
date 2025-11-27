import { readItems, readItem } from "@directus/sdk"
import { getDirectusClient } from "./client"
import type { Articulo, Categoria, Autor, Etiqueta, ArticuloFile } from "./types"

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
    console.error("[v0] Error in getArticulos:", error)
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
          estado: { _eq: "publicado" },
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

export async function getInterviews(options?: any) {
  return []
}

export async function getInterviewBySlug(slug: string) {
  return null
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

export async function incrementViews(collection: "articles" | "interviews", id: number) {
  console.log(`[v0] Would increment views for ${collection} ${id}`)
}
