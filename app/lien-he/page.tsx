"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building2,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Hotline",
    details: ["0901 234 567", "0283 456 789"],
    action: "tel:0901234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@sonlongpccc.vn", "sales@sonlongpccc.vn"],
    action: "mailto:info@sonlongpccc.vn",
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    details: ["123 Nguyễn Văn Linh, Quận 7", "TP. Hồ Chí Minh"],
    action: "#map",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    details: ["T2 - T7: 7:30 - 17:30", "Chủ nhật: Nghỉ"],
    action: null,
  },
];

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-silver">
      {/* Header */}
      <div className="bg-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="mb-4 text-sm text-gray-400">
            <a href="/" className="hover:text-white">
              Trang chủ
            </a>
            <span className="mx-2">/</span>
            <span className="text-white">Liên hệ</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mt-2 text-gray-400">
            Hãy liên hệ để được tư vấn và báo giá miễn phí
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Contact cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-primary/10">
                <item.icon size={24} className="text-red-primary" />
              </div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-charcoal">
                {item.title}
              </h3>
              {item.details.map((detail, j) =>
                item.action ? (
                  <a
                    key={j}
                    href={item.action}
                    className="block text-sm text-steel transition-colors hover:text-red-primary"
                  >
                    {detail}
                  </a>
                ) : (
                  <p key={j} className="text-sm text-steel">
                    {detail}
                  </p>
                )
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-primary/10">
                  <MessageCircle size={20} className="text-red-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-charcoal">
                    Gửi yêu cầu báo giá
                  </h2>
                  <p className="text-sm text-steel">
                    Chúng tôi sẽ phản hồi trong vòng 2 giờ
                  </p>
                </div>
              </div>

              {formSubmitted && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-light p-4 text-sm font-medium text-green-success">
                  <CheckCircle2 size={20} />
                  Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      Họ và tên <span className="text-red-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      Số điện thoại <span className="text-red-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      Công ty
                    </label>
                    <input
                      type="text"
                      placeholder="Tên công ty"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-charcoal">
                    Loại yêu cầu <span className="text-red-primary">*</span>
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary"
                  >
                    <option value="">Chọn loại yêu cầu</option>
                    <option>Báo giá thiết bị PCCC</option>
                    <option>Thi công lắp đặt hệ thống</option>
                    <option>Bảo trì / Nạp bình</option>
                    <option>Tư vấn giải pháp PCCC</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-charcoal">
                    Nội dung <span className="text-red-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-primary px-8 py-4 font-bold text-white transition-colors hover:bg-red-dark sm:w-auto"
                >
                  <Send size={18} />
                  Gửi yêu cầu
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            {/* Quick contact */}
            <div className="mb-6 rounded-2xl bg-red-primary p-6 text-white">
              <h3 className="mb-4 text-lg font-bold">Liên hệ nhanh</h3>
              <p className="mb-6 text-sm text-white/80">
                Gọi ngay hotline để được tư vấn trực tiếp từ chuyên gia PCCC.
              </p>
              <a
                href="tel:0901234567"
                className="mb-3 flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20"
              >
                <Phone size={20} />
                <div>
                  <p className="text-xs text-white/70">Hotline 1</p>
                  <p className="text-lg font-bold">0901 234 567</p>
                </div>
              </a>
              <a
                href="tel:0283456789"
                className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20"
              >
                <Phone size={20} />
                <div>
                  <p className="text-xs text-white/70">Hotline 2</p>
                  <p className="text-lg font-bold">028 3456 789</p>
                </div>
              </a>
            </div>

            {/* Company info */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Building2 size={20} className="text-red-primary" />
                <h3 className="text-lg font-bold text-charcoal">
                  Thông tin công ty
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-charcoal">
                    Công ty TNHH Sơn Long PCCC
                  </p>
                  <p className="text-steel">MST: 0312345678</p>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Trụ sở chính</p>
                  <p className="text-steel">
                    123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                  </p>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Chi nhánh</p>
                  <p className="text-steel">
                    456 Lê Văn Việt, Quận 9, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12" id="map">
          <h2 className="mb-6 text-xl font-bold text-charcoal">
            Bản đồ đường đi
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex h-80 items-center justify-center bg-silver text-steel">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-3 text-steel-light" />
                <p className="text-sm font-medium">
                  123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-red-primary hover:text-red-dark"
                >
                  Mở trong Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
