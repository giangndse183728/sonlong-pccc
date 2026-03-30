"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({ isOpen, itemName, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1a1d2e] border border-white/10 rounded-2xl w-full max-w-sm mx-4 shadow-2xl p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-red-primary/15 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-red-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>

        <h3 className="text-white font-semibold text-center text-lg mb-2">Xác nhận xóa?</h3>
        <p className="text-steel text-center text-sm mb-6">
          Bạn có chắc muốn xóa <span className="text-white font-medium">&ldquo;{itemName}&rdquo;</span>? Hành động này không thể hoàn tác.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm text-steel hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-primary hover:bg-red-dark text-white rounded-xl shadow-lg shadow-red-primary/20 transition-all cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
