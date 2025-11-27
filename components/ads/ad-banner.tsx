import Link from "next/link"

interface AdBannerProps {
  image?: string
  link: string
  alt: string
  size: "leaderboard" | "rectangle" | "billboard" | "skyscraper" | "square" | "article-card"
  className?: string
}

const sizeConfig = {
  leaderboard: {
    width: 1200,
    height: 200,
    aspectRatio: "aspect-[6/1]",
  },
  rectangle: {
    width: 336,
    height: 280,
    aspectRatio: "aspect-[6/5]",
  },
  billboard: {
    width: 970,
    height: 300,
    aspectRatio: "aspect-[97/30]",
  },
  skyscraper: {
    width: 300,
    height: 600,
    aspectRatio: "aspect-[1/2]",
  },
  square: {
    width: 250,
    height: 250,
    aspectRatio: "aspect-square",
  },
  "article-card": {
    width: 400,
    height: 300,
    aspectRatio: "aspect-[4/3]",
  },
}

export function AdBanner({ link, alt, size, className = "" }: AdBannerProps) {
  const config = sizeConfig[size]

  return (
    <div className={`relative ${className}`}>
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block group">
        <div
          className={`relative w-full ${config.aspectRatio} overflow-hidden bg-muted/30 rounded-lg border border-border/50 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-muted/50`}
        >
          <img
            src="/habitat-logo.png"
            alt="Revista Habitat"
            className="h-16 object-contain opacity-90 mix-blend-multiply dark:mix-blend-normal dark:opacity-100"
          />
          <span className="text-muted-foreground/60 font-serif text-xs uppercase tracking-[0.2em]">Espacio Publicitario</span>
        </div>
      </Link>
    </div>
  )
}
