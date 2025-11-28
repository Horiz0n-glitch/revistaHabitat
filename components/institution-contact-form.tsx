'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Building2, Mail, Phone, Globe, Instagram, Facebook, Linkedin, ChevronDown, ChevronUp } from 'lucide-react'
import { useActionState, useEffect, useState } from "react"
import { sendInstitutionContact } from "@/app/actions/contact-institution"
import { toast } from "sonner"

const initialState = {
    success: false,
    message: '',
    errors: {} as Record<string, string[]>
}

export function InstitutionContactForm() {
    const [state, action, isPending] = useActionState(sendInstitutionContact, initialState)
    const [isFormVisible, setIsFormVisible] = useState(false)

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                const form = document.getElementById('institution-form') as HTMLFormElement
                if (form) form.reset()
                // Optionally close the form after successful submission
                // setIsFormVisible(false)
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    return (
        <div className="bg-linear-to-br from-accent/5 via-background to-accent/10 border border-accent/20 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header - Always Visible */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                        <Building2 className="h-8 w-8 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        ¿Eres una Fundación u ONG?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        Queremos dar visibilidad a las mejores instituciones del sector. Comparte tu información y actividades
                        para que podamos publicarlas y ayudar a difundir tu impacto social.
                    </p>

                    {/* Toggle Button */}
                    <Button
                        onClick={() => setIsFormVisible(!isFormVisible)}
                        size="lg"
                        className="group"
                        variant={isFormVisible ? "outline" : "default"}
                    >
                        {isFormVisible ? (
                            <>
                                <ChevronUp className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                                Ocultar formulario
                            </>
                        ) : (
                            <>
                                <Building2 className="mr-2 h-5 w-5" />
                                Registra tu institución
                                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-[2px]" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Form - Collapsible */}
                {isFormVisible && (
                    <form id="institution-form" action={action} className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                        {/* Información de la Institución */}
                        <div className="space-y-6">
                            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-accent" />
                                Información de la Institución
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="institution_name">Nombre de la Institución *</Label>
                                    <Input
                                        id="institution_name"
                                        name="institution_name"
                                        type="text"
                                        placeholder="Ej: Fundación Hábitat Sustentable"
                                        required
                                        aria-describedby="institution_name-error"
                                    />
                                    {state.errors?.institution_name && (
                                        <p id="institution_name-error" className="text-sm text-red-500">{state.errors.institution_name[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="institution_type">Tipo de Institución *</Label>
                                    <Select name="institution_type" required>
                                        <SelectTrigger id="institution_type">
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fundacion">Fundación</SelectItem>
                                            <SelectItem value="ong">ONG</SelectItem>
                                            <SelectItem value="asociacion">Asociación Civil</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {state.errors?.institution_type && (
                                        <p className="text-sm text-red-500">{state.errors.institution_type[0]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción de la Institución *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Cuéntanos sobre tu institución: misión, visión, alcance geográfico, años de trayectoria, etc."
                                    className="min-h-32"
                                    required
                                    aria-describedby="description-error"
                                />
                                <p className="text-xs text-muted-foreground">Mínimo 50 caracteres</p>
                                {state.errors?.description && (
                                    <p id="description-error" className="text-sm text-red-500">{state.errors.description[0]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="activities">Actividades y Proyectos *</Label>
                                <Textarea
                                    id="activities"
                                    name="activities"
                                    placeholder="Describe las actividades que realizan, proyectos actuales, eventos próximos, logros recientes, etc. Esta información será utilizada para publicaciones en nuestra revista."
                                    className="min-h-40"
                                    required
                                    aria-describedby="activities-error"
                                />
                                <p className="text-xs text-muted-foreground">Mínimo 50 caracteres. Sé específico, esta información será publicada.</p>
                                {state.errors?.activities && (
                                    <p id="activities-error" className="text-sm text-red-500">{state.errors.activities[0]}</p>
                                )}
                            </div>
                        </div>

                        {/* Datos de Contacto */}
                        <div className="space-y-6 pt-6 border-t border-border">
                            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                                <Mail className="h-5 w-5 text-accent" />
                                Persona de Contacto
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contact_name">Nombre completo *</Label>
                                    <Input
                                        id="contact_name"
                                        name="contact_name"
                                        type="text"
                                        placeholder="Nombre del responsable"
                                        required
                                        aria-describedby="contact_name-error"
                                    />
                                    {state.errors?.contact_name && (
                                        <p id="contact_name-error" className="text-sm text-red-500">{state.errors.contact_name[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="position">Cargo *</Label>
                                    <Input
                                        id="position"
                                        name="position"
                                        type="text"
                                        placeholder="Ej: Director/a de Comunicación"
                                        required
                                        aria-describedby="position-error"
                                    />
                                    {state.errors?.position && (
                                        <p id="position-error" className="text-sm text-red-500">{state.errors.position[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="contacto@institucion.org"
                                            className="pl-10"
                                            required
                                            aria-describedby="email-error"
                                        />
                                    </div>
                                    {state.errors?.email && (
                                        <p id="email-error" className="text-sm text-red-500">{state.errors.email[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+54 11 1234-5678"
                                            className="pl-10"
                                            required
                                            aria-describedby="phone-error"
                                        />
                                    </div>
                                    {state.errors?.phone && (
                                        <p id="phone-error" className="text-sm text-red-500">{state.errors.phone[0]}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Redes y Sitio Web */}
                        <div className="space-y-6 pt-6 border-t border-border">
                            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                                <Globe className="h-5 w-5 text-accent" />
                                Presencia Digital
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="website">Sitio Web</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="website"
                                            name="website"
                                            type="url"
                                            placeholder="https://www.institucion.org"
                                            className="pl-10"
                                            aria-describedby="website-error"
                                        />
                                    </div>
                                    {state.errors?.website && (
                                        <p id="website-error" className="text-sm text-red-500">{state.errors.website[0]}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram</Label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="instagram"
                                            name="instagram"
                                            type="text"
                                            placeholder="@institucion"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="facebook">Facebook</Label>
                                    <div className="relative">
                                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="facebook"
                                            name="facebook"
                                            type="text"
                                            placeholder="facebook.com/institucion"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="linkedin"
                                            name="linkedin"
                                            type="text"
                                            placeholder="linkedin.com/company/institucion"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-accent/5 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                <strong>Nota:</strong> Al enviar este formulario, autorizas a Revista Hábitat a publicar la información proporcionada
                                en nuestros canales digitales e impresos. Nos pondremos en contacto contigo para coordinar los detalles de la publicación.
                            </p>
                        </div>

                        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Enviar información
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}
