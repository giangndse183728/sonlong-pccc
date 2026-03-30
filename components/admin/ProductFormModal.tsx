"use client";

import { useState, useEffect } from "react";
import { Product } from "../../types/product";
import { Category } from "../../types/category";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
  product?: Product | null;
  categories: Category[];
}

export default function ProductFormModal({ isOpen, onClose, onSave, product, categories }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    currency: "VND",
    category_id: "",
    available: true,
    image_url: "",
    features: [] as { name: string; value: string }[],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      let initialFeatures: { name: string; value: string }[] = [];
      if (product.features && typeof product.features === "object") {
        initialFeatures = Object.entries(product.features).map(([name, value]) => ({
          name,
          value: String(value),
        }));
      }

      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: String(product.price || ""),
        currency: product.currency || "VND",
        category_id: product.category_id || "",
        available: product.available ?? true,
        image_url: product.image_url || "",
        features: initialFeatures,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: "",
        currency: "VND",
        category_id: "",
        available: true,
        image_url: "",
        features: [],
      });
    }
  }, [product, isOpen]);

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
      slug: !product ? generateSlug(value) : prev.slug,
    }));
  };

  const handleFeatureChange = (index: number, field: "name" | "value", newValue: string) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = { ...updatedFeatures[index], [field]: newValue };
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { name: "", value: "" }],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => {
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Convert features array to object
    const featuresObj: Record<string, string> = {};
    formData.features.forEach((f) => {
      if (f.name.trim()) {
        featuresObj[f.name.trim()] = f.value.trim();
      }
    });

    try {
      await onSave({
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        price: Number(formData.price),
        currency: formData.currency,
        category_id: formData.category_id || null,
        available: formData.available,
        image_url: formData.image_url || null,
        features: Object.keys(featuresObj).length > 0 ? featuresObj : null,
      });
      onClose();
    } catch {
      // Error handled by parent
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center py-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1a1d2e] border border-white/10 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl max-h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1d2e] z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold text-lg">
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h3>
          <button onClick={onClose} className="text-steel hover:text-white transition-colors cursor-pointer p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Two column grid for main fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-steel-light mb-1.5">Tên sản phẩm *</label>
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
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-steel-light mb-1.5">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all resize-none"
              placeholder="Mô tả sản phẩm..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-steel-light mb-1.5">Giá *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                  required
                  min={0}
                  className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
                  placeholder="185000"
                />
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData((p) => ({ ...p, currency: e.target.value }))}
                  required
                  className="w-20 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
                  placeholder="VND"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-steel-light mb-1.5">Danh mục</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData((p) => ({ ...p, category_id: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a1d2e]">— Chọn danh mục —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#1a1d2e]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL & Available row */}
          <div className="flex flex-col sm:flex-row gap-5 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-steel-light mb-1.5">URL hình ảnh</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-steel text-sm focus:outline-none focus:ring-2 focus:ring-red-primary/50 transition-all"
                placeholder="https://..."
              />
            </div>
            {/* Available toggle */}
            <div className="flex items-center gap-3 pb-2.5">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, available: !p.available }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  formData.available ? "bg-green-success" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transform transition-transform ${
                    formData.available ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <label className="text-sm text-steel-light shrink-0">Còn hàng</label>
            </div>
          </div>

          {/* Features JSONB Table */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-steel-light">Thuộc tính mở rộng (Features)</label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1.5 text-xs text-red-primary hover:text-red-light transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm thuộc tính
              </button>
            </div>
            
            {formData.features.length > 0 ? (
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                      className="w-1/3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-steel/50 text-sm focus:outline-none focus:ring-1 focus:ring-red-primary"
                      placeholder="VD: Kích thước, Màu sắc..."
                    />
                    <input
                      type="text"
                      value={feature.value}
                      onChange={(e) => handleFeatureChange(index, "value", e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-steel/50 text-sm focus:outline-none focus:ring-1 focus:ring-red-primary"
                      placeholder="Giá trị"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-steel hover:text-red-primary bg-white/5 hover:bg-red-primary/10 border border-white/10 rounded-lg transition-colors shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                <p className="text-steel text-sm mb-2">Chưa có thuộc tính nào</p>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-white text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                >
                  Thêm thuộc tính đầu tiên
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-6">
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
              ) : product ? (
                "Cập nhật"
              ) : (
                "Thêm sản phẩm"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
