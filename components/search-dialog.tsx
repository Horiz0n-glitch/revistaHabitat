"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, MessageSquare, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)

    if (searchQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("[v0] Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResultClick = (result: any) => {
    onOpenChange(false)
    setQuery("")
    setResults([])

    if (result.type === "article") {
      router.push(`/articulos/${result.slug}`)
    } else if (result.type === "interview") {
      router.push(`/entrevistas/${result.slug}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Buscar contenido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar artículos, entrevistas..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-4 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.type === "article" ? (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{result.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {result.type === "article" ? "Artículo" : "Entrevista"}
                        </Badge>
                      </div>
                      {result.excerpt && <p className="text-xs text-muted-foreground line-clamp-2">{result.excerpt}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
