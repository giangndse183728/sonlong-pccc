import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Văn Minh",
    role: "Giám đốc - Công ty XD Minh Phát",
    content:
      "Sơn Long PCCC đã thi công hệ thống PCCC cho tòa nhà văn phòng 12 tầng của chúng tôi rất chuyên nghiệp. Nghiệm thu đạt 100% ngay lần đầu.",
    rating: 5,
  },
  {
    name: "Trần Thị Hương",
    role: "Quản lý - Nhà hàng Sen Vàng",
    content:
      "Dịch vụ nạp bình và bảo trì định kỳ rất chu đáo. Nhân viên nhiệt tình, giá cả hợp lý. Rất yên tâm khi sử dụng dịch vụ của Sơn Long.",
    rating: 5,
  },
  {
    name: "Lê Hoàng Nam",
    role: "Chủ đầu tư - KCN Tân Phú",
    content:
      "Đã hợp tác với Sơn Long PCCC hơn 5 năm cho các dự án nhà xưởng. Sản phẩm chính hãng, bảo hành tốt, giao hàng nhanh.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-silver py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-red-primary">
            Khách hàng nói gì
          </span>
          <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            Được tin tưởng bởi 5000+ khách hàng
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <Quote
                size={40}
                className="absolute right-6 top-6 text-red-primary/10"
              />
              <div className="mb-4 flex gap-1">
                {[...Array(item.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-steel">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-primary text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{item.name}</p>
                  <p className="text-xs text-steel">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
