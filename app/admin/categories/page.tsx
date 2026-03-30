"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import { Category } from "../../../types/category";
import CategoryFormModal from "../../../components/admin/CategoryFormModal";
import DeleteConfirmModal from "../../../components/admin/DeleteConfirmModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("Lỗi khi tải danh mục: " + error.message, "error");
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSave = async (categoryData: Partial<Category>) => {
    if (editCategory) {
      const { error } = await supabase
        .from("categories")
        .update(categoryData)
        .eq("id", editCategory.id);

      if (error) {
        showToast("Lỗi khi cập nhật: " + error.message, "error");
        throw error;
      }
      showToast("Đã cập nhật danh mục thành công!");
    } else {
      const { error } = await supabase.from("categories").insert(categoryData);

      if (error) {
        showToast("Lỗi khi thêm danh mục: " + error.message, "error");
        throw error;
      }
      showToast("Đã thêm danh mục mới thành công!");
    }

    setEditCategory(null);
    fetchCategories();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("categories").delete().eq("id", deleteTarget.id);

    if (error) {
      showToast("Lỗi khi xóa: " + error.message, "error");
    } else {
      showToast("Đã xóa danh mục thành công!");
      fetchCategories();
    }
    setDeleteTarget(null);
  };

  const openEdit = (category: Category) => {
    setEditCategory(category);
    setShowFormModal(true);
  };

  const openCreate = () => {
    setEditCategory(null);
    setShowFormModal(true);
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const getParentName = (parentId: string | null | undefined) => {
    if (!parentId) return "—";
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : "—";
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
          <p className="text-steel text-xs mb-1">Tổng danh mục</p>
          <p className="text-white text-2xl font-bold">{categories.length}</p>
        </div>
        <div className="bg-[#151720] border border-white/5 rounded-xl p-4">
          <p className="text-steel text-xs mb-1">Danh mục gốc</p>
          <p className="text-white text-2xl font-bold">
            {categories.filter((c) => !c.parent_id).length}
          </p>
        </div>
        <div className="bg-[#151720] border border-white/5 rounded-xl p-4">
          <p className="text-steel text-xs mb-1">Danh mục con</p>
          <p className="text-white text-2xl font-bold">
            {categories.filter((c) => c.parent_id).length}
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
            placeholder="Tìm kiếm danh mục..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#151720] border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
          />
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-red-primary to-red-dark text-white rounded-xl shadow-lg shadow-red-primary/20 hover:shadow-red-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Thêm danh mục
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-[#151720] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Danh mục</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Danh mục cha</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Mô tả</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider">Ngày tạo</th>
                <th className="px-5 py-3.5 text-xs font-medium text-steel uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <svg className="animate-spin w-6 h-6 text-red-primary mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <p className="text-steel text-sm">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <svg className="w-12 h-12 text-steel/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <p className="text-steel text-sm">
                      {search ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Category info */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-lg shrink-0 overflow-hidden flex items-center justify-center text-steel">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate max-w-[250px]">{category.name}</p>
                          <p className="text-steel text-xs truncate max-w-[250px]">{category.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Parent */}
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-steel-light">
                        {getParentName(category.parent_id)}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-3.5">
                      <p className="text-steel text-sm truncate max-w-[200px]">
                        {category.description || "—"}
                      </p>
                    </td>

                    {/* Created at */}
                    <td className="px-5 py-3.5">
                      <p className="text-steel text-sm">
                        {new Date(category.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(category)}
                          className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget(category)}
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
        {!loading && filteredCategories.length > 0 && (
          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
            <p className="text-steel text-xs">
              Hiển thị {filteredCategories.length} / {categories.length} danh mục
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CategoryFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditCategory(null);
        }}
        onSave={handleSave}
        category={editCategory}
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
