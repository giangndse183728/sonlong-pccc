import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";

import { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  // Use product.image_url if available, else fallback logic
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {/* Supabase product type might not have badge, optionally check if you want to keep badge logic (e.g if it's in features or something) */}
      </div>

      {/* Image */}
      <Link href={`/san-pham/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-silver">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-8 text-steel">
              <svg
                viewBox="0 0 100 100"
                className="h-24 w-24 opacity-30"
                fill="currentColor"
              >
                <path d="M50 10 L60 35 L87 35 L65 52 L73 78 L50 62 L27 78 L35 52 L13 35 L40 35 Z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal transition-colors hover:bg-red-primary hover:text-white">
              <Eye size={18} />
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        {/* If category name is needed, we might need a join or pass it differently. 
            For now, we can omit it or show a placeholder as we refactor category fetching. */}
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold text-charcoal transition-colors hover:text-red-primary">
            {product.name}
          </h3>
        </Link>


        {/* Spacer to keep card heights consistent */}
        <div className="mt-auto" />
      </div>
    </div>
  );
}
