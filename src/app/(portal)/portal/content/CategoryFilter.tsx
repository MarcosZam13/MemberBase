// CategoryFilter.tsx — Filtro de categorías para la página de contenido del portal

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ContentCategory } from "@/types/database";

interface CategoryFilterProps {
  categories: ContentCategory[];
  activeSlug: string | null;
}

export function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/portal/content?${params.toString()}`);
  }

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSelect(null)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
          activeSlug === null
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
        )}
      >
        Todo
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.slug)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
            activeSlug === cat.slug
              ? "text-primary-foreground border-transparent"
              : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
          )}
          style={
            activeSlug === cat.slug
              ? { backgroundColor: cat.color, borderColor: cat.color }
              : {}
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
