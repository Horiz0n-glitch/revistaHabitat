"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu, User, X, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { navigationCategories } from "@/lib/mock-data"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredTopNav, setHoveredTopNav] = useState<string | null>(null)
  const [showTopBar, setShowTopBar] = useState(true)

  const topNavTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTopBar(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTopNavEnter = (slug: string) => {
    if (topNavTimeoutRef.current) {
      clearTimeout(topNavTimeoutRef.current)
      topNavTimeoutRef.current = null
    }
    setHoveredTopNav(slug)
  }

  const handleTopNavLeave = () => {
    topNavTimeoutRef.current = setTimeout(() => {
      setHoveredTopNav(null)
    }, 300)
  }

  const handleCategoryEnter = (slug: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current)
      categoryTimeoutRef.current = null
    }
    setHoveredCategory(slug)
  }

  const handleCategoryLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null)
    }, 300)
  }

  const articulosCategory = navigationCategories.find((cat) => cat.slug === "articulos")
  const culturaCategory = navigationCategories.find((cat) => cat.slug === "cultura-y-patrimonio")

  const bottomNavCategories = navigationCategories.filter(
    (cat) => cat.slug !== "cultura-y-patrimonio" && cat.slug !== "articulos",
  )

  return (
    <div className="relative z-[100]">
      <div
        className={`bg-gray-900 text-white transition-all duration-300 sticky top-0 z-[101] ${showTopBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div className="flex items-center justify-end gap-6 h-10">
            <Link href="/staff" className="text-xs font-medium text-gray-300 hover:text-white transition-colors">
              Staff
            </Link>
            <Link href="/publicidad" className="text-xs font-medium text-gray-300 hover:text-white transition-colors">
              Publicidad
            </Link>
            <Link href="/contacto" className="text-xs font-medium text-gray-300 hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-white sticky top-0 z-[100]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <h1
                className={`font-serif font-bold tracking-tight transition-all duration-300 text-black ${scrolled ? "text-xl" : "text-2xl"}`}
              >
                HABITAT
              </h1>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <Link
                href="/"
                className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                Inicio
              </Link>
              {/* Artículos dropdown */}
              {articulosCategory && (
                <div
                  className="relative"
                  onMouseEnter={() => handleTopNavEnter("articulos")}
                  onMouseLeave={handleTopNavLeave}
                >
                  <Link
                    href="/categoria/articulos"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    {articulosCategory.name}
                    {articulosCategory.subcategories && articulosCategory.subcategories.length > 0 && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </Link>

                  {articulosCategory.subcategories &&
                    articulosCategory.subcategories.length > 0 &&
                    hoveredTopNav === "articulos" && (
                      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {articulosCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.slug}
                            href={
                              subcategory.slug === "articulos"
                                ? "/categoria/articulos"
                                : `/categoria/${articulosCategory.slug}/${subcategory.slug}`
                            }
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              )}

              {/* Cultura y Patrimonio dropdown */}
              {culturaCategory && (
                <div
                  className="relative"
                  onMouseEnter={() => handleTopNavEnter("cultura-y-patrimonio")}
                  onMouseLeave={handleTopNavLeave}
                >
                  <Link
                    href="/categoria/cultura-y-patrimonio"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    {culturaCategory.name}
                    {culturaCategory.subcategories && culturaCategory.subcategories.length > 0 && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </Link>

                  {culturaCategory.subcategories &&
                    culturaCategory.subcategories.length > 0 &&
                    hoveredTopNav === "cultura-y-patrimonio" && (
                      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {culturaCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.slug}
                            href={`/categoria/${culturaCategory.slug}/${subcategory.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              )}

              <Link
                href="/revistas"
                className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
              >
                Revistas
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex hover:bg-gray-100"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5 text-gray-900" />
                <span className="sr-only">Buscar</span>
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-900" />
                  <span className="sr-only">Cuenta</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-gray-900" /> : <Menu className="h-5 w-5 text-gray-900" />}
                <span className="sr-only">Menú</span>
              </Button>
            </div>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <nav className="py-4 border-t border-gray-200 overflow-y-auto max-h-[calc(80vh-1rem)]">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setSearchOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors md:hidden"
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </button>

                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>

                {/* Artículos with subcategories */}
                {articulosCategory && (
                  <div className="flex flex-col">
                    <Link
                      href="/categoria/articulos"
                      className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {articulosCategory.name}
                    </Link>
                    {articulosCategory.subcategories && articulosCategory.subcategories.length > 0 && (
                      <div className="ml-4 flex flex-col gap-1 mt-1">
                        {articulosCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.slug}
                            href={
                              subcategory.slug === "articulos"
                                ? "/categoria/articulos"
                                : `/categoria/${articulosCategory.slug}/${subcategory.slug}`
                            }
                            className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Cultura y Patrimonio with subcategories */}
                {culturaCategory && (
                  <div className="flex flex-col">
                    <Link
                      href="/categoria/cultura-y-patrimonio"
                      className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {culturaCategory.name}
                    </Link>
                    {culturaCategory.subcategories && culturaCategory.subcategories.length > 0 && (
                      <div className="ml-4 flex flex-col gap-1 mt-1">
                        {culturaCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.slug}
                            href={`/categoria/${culturaCategory.slug}/${subcategory.slug}`}
                            className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <Link
                  href="/revistas"
                  className="px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Revistas
                </Link>

                <div className="my-2 h-px bg-gray-200" />

                {bottomNavCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name === "RSE" ? "Resp.Social" : category.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-200 bg-white relative overflow-visible">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <nav className="flex items-center gap-1 py-3">
              {bottomNavCategories.map((category) => (
                <div
                  key={category.slug}
                  className="relative"
                  onMouseEnter={() => handleCategoryEnter(category.slug)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap"
                  >
                    {category.name === "RSE" ? "Resp.Social" : category.name}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    )}
                  </Link>

                  {category.subcategories && category.subcategories.length > 0 && hoveredCategory === category.slug && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.slug}
                          href={`/categoria/${category.slug}/${subcategory.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
