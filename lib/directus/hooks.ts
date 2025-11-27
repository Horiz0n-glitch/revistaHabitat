"use client"

import { useEffect, useState } from "react"
import {
  getArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getArticlesByCategory,
  getArticlesByTag,
  getInterviews,
  getInterviewBySlug,
  getMagazines,
  getMagazineById,
  getCategories,
  getTags,
  getActiveAds,
  getRandomAd,
  searchContent,
} from "./queries"

// Generic hook for data fetching with loading and error states
function useDirectusData<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetcher()
        if (mounted) {
          setData(result)
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Error al cargar datos")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, deps)

  return { data, loading, error }
}

// Articles hooks
export function useArticles(options?: {
  limit?: number
  offset?: number
  filter?: any
  sort?: string[]
  search?: string
}) {
  return useDirectusData(() => getArticles(options), [JSON.stringify(options)])
}

export function useArticle(slug: string) {
  return useDirectusData(() => getArticleBySlug(slug), [slug])
}

export function useFeaturedArticles(limit = 6) {
  return useDirectusData(() => getFeaturedArticles(limit), [limit])
}

export function useArticlesByCategory(categorySlug: string, limit = 20) {
  return useDirectusData(() => getArticlesByCategory(categorySlug, limit), [categorySlug, limit])
}

export function useArticlesByTag(tagSlug: string, limit = 20) {
  return useDirectusData(() => getArticlesByTag(tagSlug, limit), [tagSlug, limit])
}

// Interviews hooks
export function useInterviews(options?: {
  limit?: number
  offset?: number
  filter?: any
  sort?: string[]
}) {
  return useDirectusData(() => getInterviews(options), [JSON.stringify(options)])
}

export function useInterview(slug: string) {
  return useDirectusData(() => getInterviewBySlug(slug), [slug])
}

// Magazines hooks
export function useMagazines(options?: {
  limit?: number
  filter?: any
}) {
  return useDirectusData(() => getMagazines(options), [JSON.stringify(options)])
}

export function useMagazine(id: number) {
  return useDirectusData(() => getMagazineById(id), [id])
}

// Categories hooks
export function useCategories() {
  return useDirectusData(getCategories, [])
}

// Tags hooks
export function useTags() {
  return useDirectusData(getTags, [])
}

// Ads hooks
export function useAds(options?: {
  size?: string
  position?: string
  limit?: number
}) {
  return useDirectusData(() => getActiveAds(options), [JSON.stringify(options)])
}

export function useRandomAd(size: string) {
  return useDirectusData(() => getRandomAd(size), [size])
}

// Search hook
export function useSearch(query: string) {
  return useDirectusData(() => searchContent(query), [query])
}
