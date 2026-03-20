import Link from "next/link";
import { ShoppingCart, Eye, Star } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  badge?: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {product.badge && (
          <span className="rounded-md bg-red-primary px-2.5 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-md bg-orange-warning px-2.5 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/san-pham/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-silver">
          <div className="flex h-full w-full items-center justify-center p-8 text-steel">
            <svg
              viewBox="0 0 100 100"
              className="h-24 w-24 opacity-30"
              fill="currentColor"
            >
              <path d="M50 10 L60 35 L87 35 L65 52 L73 78 L50 62 L27 78 L35 52 L13 35 L40 35 Z" />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal transition-colors hover:bg-red-primary hover:text-white">
              <Eye size={18} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal transition-colors hover:bg-red-primary hover:text-white">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-steel">
          {product.category}
        </p>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold text-charcoal transition-colors hover:text-red-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          {/* Price */}
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-red-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-steel line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock & CTA */}
          <div className="flex items-center justify-between">
            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                product.inStock ? "text-green-success" : "text-red-primary"
              }`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  product.inStock ? "bg-green-success" : "bg-red-primary"
                }`}
              />
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </span>
            <button className="rounded-lg bg-red-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-dark">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
