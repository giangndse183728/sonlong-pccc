"use client";

import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal, Grid3X3, List, Search, X } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types/product";
import { Category } from "../../types/category";

const sortOptions = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "name-asc", label: "Tên: A → Z" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const [productsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .eq("available", true)
          .order("created_at", { ascending: false }),
        supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true })
      ]);

      if (!productsResponse.error && productsResponse.data) {
        setProducts(productsResponse.data);
      }
      
      if (!categoriesResponse.error && categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      const childIds = categories.filter(c => c.parent_id === activeCategory).map(c => c.id);
      result = result.filter((p) => 
        p.category_id === activeCategory || (p.category_id && childIds.includes(p.category_id))
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q)
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
  }, [products, activeCategory, sortBy, searchQuery]);

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
            {activeCategory && ` trong "${categories.find(c => c.id === activeCategory)?.name || ''}"`}
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
                <li>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!activeCategory
                        ? "bg-red-primary/10 font-semibold text-red-primary"
                        : "text-steel hover:bg-silver hover:text-charcoal"
                      }`}
                  >
                    Tất cả
                  </button>
                </li>
                {categories.filter(c => !c.parent_id).map((parentCat) => {
                  const children = categories.filter(c => c.parent_id === parentCat.id);
                  return (
                    <li key={parentCat.id} className="mb-2">
                      <button
                        onClick={() => setActiveCategory(parentCat.id)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${activeCategory === parentCat.id
                            ? "font-bold text-red-primary"
                            : "font-semibold text-charcoal hover:text-red-primary"
                          }`}
                      >
                        {parentCat.name}
                      </button>
                      {children.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
                          {children.map(childCat => (
                            <li key={childCat.id}>
                              <button
                                onClick={() => setActiveCategory(childCat.id)}
                                className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${activeCategory === childCat.id
                                    ? "bg-red-primary/10 font-semibold text-red-primary"
                                    : "text-steel hover:bg-silver hover:text-charcoal"
                                  }`}
                              >
                                {childCat.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>


            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
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
