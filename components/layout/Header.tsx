"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronDown,
  Shield,
  MapPin,
} from "lucide-react";

const categories = [
  { name: "Bình chữa cháy", href: "/san-pham?category=binh-chua-chay" },
  { name: "Hệ thống báo cháy", href: "/san-pham?category=bao-chay" },
  { name: "Hệ thống sprinkler", href: "/san-pham?category=sprinkler" },
  { name: "Vòi & cuộn chữa cháy", href: "/san-pham?category=voi-chua-chay" },
  { name: "Trang phục PCCC", href: "/san-pham?category=trang-phuc" },
  { name: "Thiết bị cứu hộ", href: "/san-pham?category=cuu-ho" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-charcoal text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="tel:0901234567"
              className="flex items-center gap-1.5 transition-colors hover:text-red-light"
            >
              <Phone size={14} />
              <span>0901 234 567</span>
            </a>
            <a
              href="mailto:info@sonlongpccc.vn"
              className="flex items-center gap-1.5 transition-colors hover:text-red-light"
            >
              <Mail size={14} />
              <span>info@sonlongpccc.vn</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>123 Nguyễn Văn Linh, TP.HCM</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1 text-green-light">
              <span className="inline-block h-2 w-2 rounded-full bg-green-success" />
              Hỗ trợ 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <img
              src="/images/logo-03.png"
              alt="Sơn Long PCCC Logo"
              className="h-14 w-auto"
            />
            <div>
              <span className="text-xl font-bold text-charcoal">
                SƠN LONG
              </span>
              <span className="ml-1 text-sm font-semibold text-red-primary">
                PCCC
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="mx-8 hidden max-w-xl flex-1 lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm PCCC..."
                className="w-full rounded-lg border border-steel-light bg-silver py-2.5 pl-4 pr-12 text-sm outline-none transition-colors focus:border-red-primary focus:ring-2 focus:ring-red-primary/20"
              />
              <button className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-red-primary text-white transition-colors hover:bg-red-dark">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/lien-he"
              className="hidden rounded-lg bg-red-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-dark md:block"
            >
              Báo giá ngay
            </Link>
            <button className="relative p-2 text-charcoal transition-colors hover:text-red-primary">
              <ShoppingCart size={22} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-primary text-xs font-bold text-white">
                0
              </span>
            </button>
            <button
              className="p-2 text-charcoal md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden border-t border-gray-100 bg-white md:block">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex items-center gap-0">
            <li>
              <Link
                href="/"
                className="inline-block px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:text-red-primary"
              >
                Trang chủ
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setCategoryDropdown(true)}
              onMouseLeave={() => setCategoryDropdown(false)}
            >
              <button className="inline-flex items-center gap-1 px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:text-red-primary">
                Sản phẩm
                <ChevronDown
                  size={14}
                  className={`transition-transform ${categoryDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {categoryDropdown && (
                <div className="absolute left-0 top-full w-64 rounded-b-lg border border-gray-100 bg-white py-2 shadow-lg">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-silver hover:text-red-primary"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="mx-4 my-2 border-t border-gray-100" />
                  <Link
                    href="/san-pham"
                    className="block px-4 py-2.5 text-sm font-semibold text-red-primary"
                  >
                    Xem tất cả sản phẩm →
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/lien-he"
                className="inline-block px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:text-red-primary"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full rounded-lg border border-steel-light bg-silver py-2.5 pl-4 pr-12 text-sm outline-none focus:border-red-primary"
              />
              <Search
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-steel"
              />
            </div>
            <nav className="space-y-1">
              <Link
                href="/"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-silver"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/san-pham"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-silver"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="block rounded-lg px-6 py-2 text-sm text-steel hover:bg-silver hover:text-charcoal"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/lien-he"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-silver"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
            </nav>
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <a
                href="tel:0901234567"
                className="flex items-center gap-2 text-sm text-steel"
              >
                <Phone size={14} /> 0901 234 567
              </a>
              <a
                href="mailto:info@sonlongpccc.vn"
                className="flex items-center gap-2 text-sm text-steel"
              >
                <Mail size={14} /> info@sonlongpccc.vn
              </a>
            </div>
            <Link
              href="/lien-he"
              className="mt-4 block rounded-lg bg-red-primary py-3 text-center text-sm font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Báo giá ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
