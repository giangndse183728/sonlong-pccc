import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  ArrowRight,
} from "lucide-react";

const highlights = [
  { icon: ShieldCheck, text: "Chính hãng 100%" },
  { icon: Truck, text: "Giao hàng toàn quốc" },
  { icon: Headphones, text: "Hỗ trợ 24/7" },
  { icon: Award, text: "Bảo hành dài hạn" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-160px)] flex-col overflow-hidden bg-charcoal">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Red accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-primary via-red-dark to-red-primary" />

      <div className="relative mx-auto flex flex-1 max-w-7xl items-center px-4">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="animate-fade-in">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-primary/30 bg-red-primary/10 px-4 py-1.5 text-sm font-medium text-red-light">
              <ShieldCheck size={16} />
              Đơn vị cung cấp PCCC uy tín #1
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              Giải pháp{" "}
              <span className="text-red-primary">Phòng cháy Chữa cháy</span>{" "}
              toàn diện
            </h1>
            <p className="mb-8 max-w-lg text-md leading-relaxed text-gray-400">
              Sơn Long PCCC cung cấp đầy đủ các thiết bị phòng cháy chữa cháy
              chính hãng, dịch vụ thi công lắp đặt và bảo trì hệ thống PCCC
              chuyên nghiệp cho mọi công trình.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/san-pham"
                className="animate-pulse-glow inline-flex items-center justify-center gap-2 rounded-lg bg-red-primary px-8 py-4 text-base font-bold text-white transition-colors hover:bg-red-dark"
              >
                Xem sản phẩm
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </div>

          {/* Right - Hero image */}
          <div className="animate-slide-right relative">
            <div className="relative mx-auto aspect-[16/9]  overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/hero-sonlong.jpg"
                alt="Thiết bị phòng cháy chữa cháy Sơn Long PCCC"
                fill
                className="object-fill"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating stats badge */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-charcoal/90 px-5 py-3 shadow-2xl backdrop-blur-sm md:-bottom-6 md:-left-6">
              <div className="text-2xl font-extrabold text-red-primary">15+</div>
              <p className="text-xs text-gray-400">Năm kinh nghiệm</p>
            </div>
            <div className="absolute -right-4 -top-4 rounded-xl border border-white/10 bg-charcoal/90 px-5 py-3 shadow-2xl backdrop-blur-sm md:-right-6 md:-top-6">
              <div className="text-2xl font-extrabold text-white">5000+</div>
              <p className="text-xs text-gray-400">Khách hàng tin tưởng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      <div className=" border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 md:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-3 border-r border-white/10 px-4 py-5 last:border-r-0"
            >
              <item.icon size={20} className="text-red-primary" />
              <span className="text-sm font-medium text-white">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
