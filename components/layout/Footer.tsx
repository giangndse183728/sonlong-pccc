import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Facebook,
  Clock,
} from "lucide-react";

const productLinks = [
  { name: "Bình chữa cháy", href: "/san-pham?category=binh-chua-chay" },
  { name: "Hệ thống báo cháy", href: "/san-pham?category=bao-chay" },
  { name: "Hệ thống sprinkler", href: "/san-pham?category=sprinkler" },
  { name: "Vòi & cuộn chữa cháy", href: "/san-pham?category=voi-chua-chay" },
  { name: "Trang phục PCCC", href: "/san-pham?category=trang-phuc" },
  { name: "Thiết bị cứu hộ", href: "/san-pham?category=cuu-ho" },
];

const serviceLinks = [
  { name: "Thi công lắp đặt", href: "/lien-he" },
  { name: "Bảo trì định kỳ", href: "/lien-he" },
  { name: "Nạp bình chữa cháy", href: "/lien-he" },
  { name: "Tư vấn thiết kế", href: "/lien-he" },
  { name: "Huấn luyện PCCC", href: "/lien-he" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <Link href="/" className="mb-6 flex items-center gap-1">
              <img
                src="/images/logo-03.png"
                alt="Sơn Long PCCC Logo"
                className="h-14 w-auto"
              />
              <div>
                <span className="text-xl font-bold text-white">SƠN LONG</span>
                <span className="ml-1 text-sm font-semibold text-red-primary">
                  PCCC
                </span>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Chuyên cung cấp thiết bị phòng cháy chữa cháy chính hãng, dịch
              vụ thi công lắp đặt và bảo trì hệ thống PCCC toàn diện.
            </p>
            <div className="space-y-3">
              <a
                href="tel:0901234567"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <Phone size={16} className="text-red-primary" />
                0901 234 567
              </a>
              <a
                href="mailto:info@sonlongpccc.vn"
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-red-primary" />
                info@sonlongpccc.vn
              </a>
              <p className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-red-primary" />
                123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} className="text-red-primary" />
                T2 - T7: 7:30 - 17:30
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
              Sản phẩm
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
              Dịch vụ
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
              Đăng ký nhận tin
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Nhận thông tin ưu đãi và kiến thức PCCC mới nhất.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-primary"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-red-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark"
              >
                Đăng ký
              </button>
            </form>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-red-primary hover:text-white"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-red-primary hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-red-primary hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.41a8.16 8.16 0 004.77 1.53V7.53a4.78 4.78 0 01-1-.84z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 Sơn Long PCCC. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-gray-300">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="transition-colors hover:text-gray-300">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="transition-colors hover:text-gray-300">
              Chính sách đổi trả
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
