"use client";

import { use } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Heart,
  Share2,
  Check,
} from "lucide-react";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-charcoal">
            Không tìm thấy sản phẩm
          </h1>
          <Link
            href="/san-pham"
            className="text-red-primary hover:text-red-dark"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
    : 0;

  const specs = [
    { label: "Mã sản phẩm", value: `SP-${product.id.padStart(4, "0")}` },
    { label: "Danh mục", value: product.category },
    { label: "Tình trạng", value: product.inStock ? "Còn hàng" : "Hết hàng" },
    { label: "Bảo hành", value: "12 tháng" },
    { label: "Xuất xứ", value: "Chính hãng" },
  ];

  return (
    <div className="min-h-screen bg-silver">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="text-sm text-steel">
            <Link href="/" className="hover:text-red-primary">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/san-pham" className="hover:text-red-primary">
              Sản phẩm
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Product detail */}
        <div className="mb-12 grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:p-8 lg:grid-cols-2">
          {/* Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-silver">
              <div className="flex h-full w-full items-center justify-center text-steel">
                <svg
                  viewBox="0 0 100 100"
                  className="h-32 w-32 opacity-20"
                  fill="currentColor"
                >
                  <path d="M50 10 L60 35 L87 35 L65 52 L73 78 L50 62 L27 78 L35 52 L13 35 L40 35 Z" />
                </svg>
              </div>
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-lg bg-red-primary px-3 py-1.5 text-sm font-bold text-white">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute left-4 top-14 rounded-lg bg-orange-warning px-3 py-1.5 text-sm font-bold text-white">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className={`aspect-square overflow-hidden rounded-lg border-2 bg-silver ${i === 1 ? "border-red-primary" : "border-transparent hover:border-steel-light"}`}
                >
                  <div className="flex h-full w-full items-center justify-center text-steel-light">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-8 w-8 opacity-30"
                      fill="currentColor"
                    >
                      <path d="M50 10 L60 35 L87 35 L65 52 L73 78 L50 62 L27 78 L35 52 L13 35 L40 35 Z" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-md bg-silver px-3 py-1 text-xs font-medium text-steel">
                {product.category}
              </span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${product.inStock ? "text-green-success" : "text-red-primary"}`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full ${product.inStock ? "bg-green-success" : "bg-red-primary"}`}
                />
                {product.inStock ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <h1 className="mb-4 text-2xl font-bold text-charcoal md:text-3xl">
              {product.name}
            </h1>


            {/* Price */}
            <div className="mb-6 rounded-xl bg-silver p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-red-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-steel line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-1 text-sm text-green-success">
                  Tiết kiệm {formatPrice(product.originalPrice! - product.price)} ({discount}%)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="mb-6 text-sm leading-relaxed text-steel">
              Sản phẩm {product.name} chính hãng, đạt tiêu chuẩn PCCC Việt Nam.
              Phù hợp sử dụng cho văn phòng, nhà xưởng, chung cư, trường học
              và các công trình dân dụng.
            </p>

            {/* Quantity & CTA */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center rounded-lg border border-gray-200">
                <button className="flex h-11 w-11 items-center justify-center text-steel hover:text-charcoal">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-semibold">
                  1
                </span>
                <button className="flex h-11 w-11 items-center justify-center text-steel hover:text-charcoal">
                  <Plus size={16} />
                </button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-primary px-8 py-3 font-bold text-white transition-colors hover:bg-red-dark">
                <ShoppingCart size={18} />
                Thêm vào giỏ hàng
              </button>
            </div>

            <div className="mb-6 flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-steel transition-colors hover:border-red-primary hover:text-red-primary">
                <Heart size={16} />
                Yêu thích
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-steel transition-colors hover:border-red-primary hover:text-red-primary">
                <Share2 size={16} />
                Chia sẻ
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck size={18} className="text-green-success" />
                <span className="text-charcoal">
                  Cam kết hàng chính hãng 100%
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-green-success" />
                <span className="text-charcoal">
                  Miễn phí giao hàng đơn trên 2.000.000đ
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={18} className="text-green-success" />
                <span className="text-charcoal">
                  Đổi trả trong vòng 7 ngày
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-green-success" />
                <span className="text-charcoal">
                  Hotline tư vấn:{" "}
                  <a
                    href="tel:0901234567"
                    className="font-semibold text-red-primary"
                  >
                    0901 234 567
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Specs & Description tabs */}
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-charcoal">
            Thông tin sản phẩm
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-charcoal">
                Thông số kỹ thuật
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-silver" : "bg-white"}
                    >
                      <td className="px-4 py-3 font-medium text-steel">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-charcoal">
                        {spec.label === "Tình trạng" ? (
                          <span
                            className={`flex items-center gap-1 font-medium ${product.inStock ? "text-green-success" : "text-red-primary"}`}
                          >
                            <Check size={14} /> {spec.value}
                          </span>
                        ) : (
                          spec.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-charcoal">
                Mô tả chi tiết
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-steel">
                <p>
                  Sản phẩm {product.name} được sản xuất theo tiêu chuẩn TCVN,
                  đạt chứng nhận kiểm định của Cục Cảnh sát PCCC & CNCH.
                </p>
                <p>
                  Thiết kế chắc chắn, dễ sử dụng, phù hợp cho nhiều loại đám
                  cháy. Sản phẩm đã qua kiểm tra chất lượng nghiêm ngặt trước
                  khi giao đến tay khách hàng.
                </p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Đạt tiêu chuẩn PCCC Việt Nam</li>
                  <li>Chứng nhận ISO 9001:2015</li>
                  <li>Bảo hành 12 tháng chính hãng</li>
                  <li>Hướng dẫn sử dụng đầy đủ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="mb-6 text-xl font-bold text-charcoal">
              Sản phẩm liên quan
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
