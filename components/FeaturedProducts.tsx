import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/app/data/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="bg-silver py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-red-primary">
              Sản phẩm nổi bật
            </span>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Sản phẩm bán chạy nhất
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-primary transition-colors hover:text-red-dark"
          >
            Xem tất cả sản phẩm
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
