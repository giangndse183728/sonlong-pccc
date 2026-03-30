"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types/product";
import { Category } from "../../types/category";
import ProductFormModal from "../../components/admin/ProductFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    
    // Fetch Products
    const { data: pData, error: pError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (pError) {
      showToast("Lỗi khi tải sản phẩm: " + pError.message, "error");
    } else {
      setProducts(pData || []);
    }

    // Fetch Categories
    const { data: cData, error: cError } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (cError) {
      showToast("Lỗi khi tải danh mục: " + cError.message, "error");
    } else {
      setCategories(cData || []);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (productData: Partial<Product>) => {
    if (editProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editProduct.id);

      if (error) {
        showToast("Lỗi khi cập nhật: " + error.message, "error");
        throw error;
      }
      showToast("Đã cập nhật sản phẩm thành công!");
    } else {
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        showToast("Lỗi khi thêm sản phẩm: " + error.message, "error");
        throw error;
      }
      showToast("Đã thêm sản phẩm mới thành công!");
    }

    setEditProduct(null);
    fetchData();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("products").delete().eq("id", deleteTarget.id);

    if (error) {
      showToast("Lỗi khi xóa: " + error.message, "error");
    } else {
      showToast("Đã xóa sản phẩm thành công!");
      fetchData();
    }
    setDeleteTarget(null);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setShowFormModal(true);
  };

  const openCreate = () => {
    setEditProduct(null);
    setShowFormModal(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number, currency: string) => {
    if (currency === "VND") {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    }
    return `${price} ${currency}`;
  };

  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return "—";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "—";
  };

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[70] px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 animate-fade-in ${
            toast.type === "success"
              ? "bg-green-success text-white"
              : "bg-red-primary text-white"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {toast.type === "success" ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            )}
          </svg>
          {toast.message}
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#151720] border border-white/5 rounded-xl p-4">
          <p className="text-steel text-xs mb-1">Tổng sản phẩm</p>
          <p className="text-white text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-[#151720] border border-white/5 rounded-xl p-4">
          <p className="text-steel text-xs mb-1">Đang bán</p>
          <p className="text-green-success text-2xl font-bold">
            {products.filter((p) => p.available).length}
          </p>
        </div>
        <div className="bg-[#151720] border border-white/5 rounded-xl p-4">
          <p className="text-steel text-xs mb-1">Hết hàng</p>
          <p className="text-orange-warning text-2xl font-bold">
            {products.filter((p) => !p.available).length}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#151720] border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
          />
        </div>

        <button
          id="add-product-btn"
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-red-primary to-red-dark text-white rounded-xl shadow-lg shadow-red-primary/20 hover:shadow-red-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm sản phẩm
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-[#151720] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Sản phẩm</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Danh mục</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Giá</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Trạng thái</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Ngày tạo</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <svg className="animate-spin w-6 h-6 text-red-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-steel text-sm">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <svg className="w-12 h-12 text-steel/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-steel text-sm">
                      {search ? "Không tìm thấy sản phẩm nào" : "Chưa có sản phẩm nào"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Product info */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-steel/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate max-w-[250px]">{product.name}</p>
                          <p className="text-steel text-xs truncate max-w-[250px]">{product.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-steel-light">
                        {getCategoryName(product.category_id)}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3.5">
                      <p className="text-white text-sm font-medium">{formatPrice(product.price, product.currency)}</p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.available
                            ? "bg-green-success/15 text-green-success"
                            : "bg-orange-warning/15 text-orange-warning"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.available ? "bg-green-success" : "bg-orange-warning"}`} />
                        {product.available ? "Đang bán" : "Hết hàng"}
                      </span>
                    </td>

                    {/* Created at */}
                    <td className="px-5 py-3.5">
                      <p className="text-steel text-sm">
                        {new Date(product.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-steel hover:text-red-primary hover:bg-red-primary/10 rounded-lg transition-all cursor-pointer"
                          title="Xóa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && filteredProducts.length > 0 && (
          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
            <p className="text-steel text-xs">
              Hiển thị {filteredProducts.length} / {products.length} sản phẩm
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditProduct(null);
        }}
        onSave={handleSave}
        product={editProduct}
        categories={categories}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.name || ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
