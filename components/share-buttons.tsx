"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link2, Check, Mail } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getShareUrl = () => {
    if (typeof window === "undefined") return url
    return `${window.location.origin}${url}`
  }

  const shareUrl = mounted ? getShareUrl() : ""
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const emailHref = `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`

  const handleCopyLink = async () => {
    try {
      const shareUrl = getShareUrl()
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "whatsapp") => {
    const finalShareUrl = getShareUrl()
    const finalEncodedUrl = encodeURIComponent(finalShareUrl)
    const finalEncodedTitle = encodeURIComponent(title)

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${finalEncodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${finalEncodedUrl}&text=${finalEncodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${finalEncodedUrl}`,
      whatsapp: `https://wa.me/?text=${finalEncodedTitle}%20${finalEncodedUrl}`,
    }

    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Compartir</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="cursor-pointer">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href={emailHref}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-600" />
              <span className="text-green-600">Copiado!</span>
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-4 w-4" />
              Copiar enlace
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
