"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageWithLoader({ className, ...props }: ImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            )}
            <Image
                className={cn(
                    className,
                    "transition-all duration-500",
                    isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                )}
                onLoadingComplete={() => setIsLoading(false)}
                {...props}
            />
        </>
    )
}
