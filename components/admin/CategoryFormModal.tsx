"use client";

import { useState, useEffect } from "react";
import { Category } from "../../types/category";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => Promise<void>;
  category?: Category | null;
  categories: Category[];
}

export default function CategoryFormModal({ isOpen, onClose, onSave, category, categories }: CategoryFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parent_id: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        parent_id: category.parent_id || "",
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        parent_id: "",
      });
    }
  }, [category, isOpen]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: !category ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        parent_id: formData.parent_id || null,
      });
      onClose();
    } catch {
      // Error handled by parent
    } finally {
      setSaving(false);
    }
  };

  // Filter out the current category from parent options (can't be its own parent)
  const parentOptions = categories.filter((c) => c.id !== category?.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1a1d2e] border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold text-lg">
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </h3>
          <button onClick={onClose} className="text-steel hover:text-white transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-steel-light mb-1.5">Tên danh mục *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
              placeholder="Bình chữa cháy..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-steel-light mb-1.5">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
              required
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
              placeholder="binh-chua-chay"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-steel-light mb-1.5">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all resize-none"
              placeholder="Mô tả danh mục..."
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-steel-light mb-1.5">Danh mục cha</label>
            <select
              value={formData.parent_id}
              onChange={(e) => setFormData((p) => ({ ...p, parent_id: e.target.value }))}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#1a1d2e]">— Không có (danh mục gốc) —</option>
              {parentOptions.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#1a1d2e]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-steel hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-red-primary to-red-dark text-white rounded-xl shadow-lg shadow-red-primary/20 hover:shadow-red-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang lưu...
                </>
              ) : category ? (
                "Cập nhật"
              ) : (
                "Thêm danh mục"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
