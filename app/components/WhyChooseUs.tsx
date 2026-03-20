import {
  ShieldCheck,
  Wrench,
  Truck,
  HeadphonesIcon,
  BadgeCheck,
  Clock,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Sản phẩm chính hãng",
    description:
      "100% sản phẩm có nguồn gốc xuất xứ rõ ràng, đạt tiêu chuẩn PCCC Việt Nam và quốc tế.",
  },
  {
    icon: Wrench,
    title: "Thi công chuyên nghiệp",
    description:
      "Đội ngũ kỹ thuật dày dặn kinh nghiệm, thi công đúng quy trình, đảm bảo nghiệm thu.",
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    description:
      "Vận chuyển nhanh chóng đến mọi tỉnh thành, miễn phí giao hàng cho đơn trên 2 triệu đồng.",
  },
  {
    icon: HeadphonesIcon,
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi qua hotline và Zalo.",
  },
  {
    icon: BadgeCheck,
    title: "Bảo hành dài hạn",
    description:
      "Chế độ bảo hành từ 12-36 tháng tùy sản phẩm, hỗ trợ nạp bình và bảo trì định kỳ.",
  },
  {
    icon: Clock,
    title: "15+ năm kinh nghiệm",
    description:
      "Hơn 15 năm hoạt động trong lĩnh vực PCCC, phục vụ hàng nghìn khách hàng và dự án.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-red-primary">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            Sơn Long PCCC - Đối tác tin cậy
          </h2>
          <p className="mx-auto max-w-2xl text-steel">
            Chúng tôi cam kết mang đến những sản phẩm và dịch vụ PCCC chất
            lượng cao nhất với giá cả cạnh tranh.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-red-primary/20 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-red-primary/10 transition-colors group-hover:bg-red-primary">
                <reason.icon
                  size={28}
                  className="text-red-primary transition-colors group-hover:text-white"
                />
              </div>
              <h3 className="mb-3 text-lg font-bold text-charcoal">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-steel">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
