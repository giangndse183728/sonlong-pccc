"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, Search, X } from "lucide-react";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/products";

const categories = [
  "Tất cả",
  "Bình chữa cháy",
  "Hệ thống báo cháy",
  "Hệ thống Sprinkler",
  "Vòi chữa cháy",
  "Trang phục PCCC",
  "Thiết bị cứu hộ",
];

const sortOptions = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "name-asc", label: "Tên: A → Z" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "Tất cả") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-silver">
      {/* Breadcrumb & title */}
      <div className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="mb-4 text-sm text-gray-400">
            <a href="/" className="hover:text-white">
              Trang chủ
            </a>
            <span className="mx-2">/</span>
            <span className="text-white">Sản phẩm</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Tất cả sản phẩm PCCC
          </h1>
          <p className="mt-2 text-gray-400">
            {filtered.length} sản phẩm
            {activeCategory !== "Tất cả" && ` trong "${activeCategory}"`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 md:max-w-sm">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-silver py-2.5 pl-10 pr-4 text-sm outline-none focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-steel"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-charcoal"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-silver md:hidden"
            >
              <SlidersHorizontal size={16} />
              Lọc
            </button>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-primary"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="hidden items-center gap-1 rounded-lg border border-gray-200 p-1 md:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-2 ${viewMode === "grid" ? "bg-red-primary text-white" : "text-steel hover:text-charcoal"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-2 ${viewMode === "list" ? "bg-red-primary text-white" : "text-steel hover:text-charcoal"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside
            className={`${showFilters ? "block" : "hidden"} w-full shrink-0 md:block md:w-64`}
          >
            <div className="sticky top-28 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-charcoal">
                Danh mục
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-red-primary/10 font-semibold text-red-primary"
                          : "text-steel hover:bg-silver hover:text-charcoal"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="my-6 border-t border-gray-100" />

              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-charcoal">
                Khoảng giá
              </h3>
              <div className="space-y-2">
                {[
                  "Dưới 200.000đ",
                  "200.000đ - 500.000đ",
                  "500.000đ - 1.000.000đ",
                  "Trên 1.000.000đ",
                ].map((range) => (
                  <label
                    key={range}
                    className="flex cursor-pointer items-center gap-2 text-sm text-steel"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 accent-red-primary"
                    />
                    {range}
                  </label>
                ))}
              </div>

            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid gap-4 grid-cols-1"
                }
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center">
                <Search size={48} className="mb-4 text-steel-light" />
                <h3 className="mb-2 text-lg font-bold text-charcoal">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-sm text-steel">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
