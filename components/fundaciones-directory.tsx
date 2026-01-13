"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, ExternalLink } from "lucide-react"
import { getAssetUrl } from "@/lib/directus/client"
import type { Fundacion } from "@/lib/directus/types"

interface FundacionCardProps {
    fundacion: Fundacion
}

function FundacionCard({ fundacion }: FundacionCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted border">
                        <Image
                            src={fundacion.logo ? getAssetUrl(fundacion.logo) : "/placeholder.svg"}
                            alt={`Logo de ${fundacion.nombre}`}
                            fill
                            className="object-contain p-1"
                        />
                    </div>

                    {/* Nombre */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-xl font-bold text-foreground line-clamp-2">
                            {fundacion.nombre}
                        </h3>
                        <Badge variant="secondary" className="mt-2 text-xs">
                            Fundación
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                {/* Descripción / Biografía */}
                {(fundacion.biografia || fundacion.descripcion) && (
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-4 flex-1">
                        {fundacion.biografia || fundacion.descripcion}
                    </p>
                )}

                {/* Información de contacto */}
                <div className="space-y-2 mb-4">
                    {fundacion.direccion && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="line-clamp-1">{fundacion.direccion}</span>
                        </div>
                    )}

                    {fundacion.email && (
                        <a
                            href={`mailto:${fundacion.email}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                            <Mail className="h-4 w-4 flex-shrink-0" />
                            <span className="line-clamp-1">{fundacion.email}</span>
                        </a>
                    )}

                    {fundacion.telefono && (
                        <a
                            href={`tel:${fundacion.telefono}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{fundacion.telefono}</span>
                        </a>
                    )}
                </div>

                {/* Redes sociales */}
                <div className="flex items-center gap-2 mb-4">
                    {fundacion.instagram && (
                        <a
                            href={fundacion.instagram.startsWith('http') ? fundacion.instagram : `https://instagram.com/${fundacion.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                    )}

                    {fundacion.facebook && (
                        <a
                            href={fundacion.facebook.startsWith('http') ? fundacion.facebook : `https://facebook.com/${fundacion.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-4 w-4" />
                        </a>
                    )}

                    {fundacion.linkedin && (
                        <a
                            href={fundacion.linkedin.startsWith('http') ? fundacion.linkedin : `https://linkedin.com/company/${fundacion.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                    )}

                    {fundacion.twitter && (
                        <a
                            href={fundacion.twitter.startsWith('http') ? fundacion.twitter : `https://twitter.com/${fundacion.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                    )}
                </div>

                {/* Sitio web */}
                {fundacion.sitio_web && (
                    <a
                        href={fundacion.sitio_web.startsWith('http') ? fundacion.sitio_web : `https://${fundacion.sitio_web}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <Button variant="outline" className="w-full gap-2">
                            <Globe className="h-4 w-4" />
                            Visitar sitio web
                            <ExternalLink className="h-3 w-3" />
                        </Button>
                    </a>
                )}
            </CardContent>
        </Card>
    )
}

interface FundacionesDirectoryProps {
    fundaciones: Fundacion[]
}

export function FundacionesDirectory({ fundaciones }: FundacionesDirectoryProps) {
    if (fundaciones.length === 0) {
        return null
    }

    return (
        <div className="space-y-8">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fundaciones.map((fundacion) => (
                    <FundacionCard key={fundacion.id} fundacion={fundacion} />
                ))}
            </div>
        </div>
    )
}
