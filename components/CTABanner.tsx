import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-red-primary">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, white 2px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Bạn cần tư vấn giải pháp PCCC?
            </h2>
            <p className="max-w-xl text-lg text-white/80">
              Liên hệ ngay với đội ngũ chuyên gia của Sơn Long PCCC để được tư
              vấn miễn phí và báo giá nhanh nhất.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:0901234567"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-red-primary transition-colors hover:bg-gray-100"
            >
              <Phone size={20} />
              0901 234 567
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-red-primary"
            >
              Gửi yêu cầu báo giá
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
