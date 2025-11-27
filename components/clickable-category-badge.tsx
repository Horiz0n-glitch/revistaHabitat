"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ClickableCategoryBadgeProps {
    categorySlug: string
    categoryName: string
}

export function ClickableCategoryBadge({ categorySlug, categoryName }: ClickableCategoryBadgeProps) {
    return (
        <Link
            href={`/categoria/${categorySlug}`}
            onClick={(e) => e.stopPropagation()}
        >
            <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-secondary/80">
                {categoryName}
            </Badge>
        </Link>
    )
}
