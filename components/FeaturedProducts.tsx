import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { supabase } from "../lib/supabase";

export const revalidate = 60; // optionally cache the results

export default async function FeaturedProducts() {
  const { data: featured } = await supabase
    .from("products")
    .select("*")
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(8);

  const displayedProducts = featured || [];

  return (
    <section className="bg-silver py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-red-primary">
              Sản phẩm nổi bật
            </span>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Sản phẩm mới nhất
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

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product as import("../types/product").Product} />
          ))}
        </div>
      </div>
    </section>
  );
}
