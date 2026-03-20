import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Bình chữa cháy",
    image: "/images/category/binhpccc.jpg",
    count: 45,
    href: "/san-pham?category=binh-chua-chay",
  },
  {
    name: "Hệ thống báo cháy",
    image: "/images/category/baopccc.jpg",
    count: 32,
    href: "/san-pham?category=bao-chay",
  },
  {
    name: "Hệ thống Sprinkler",
    image: "/images/category/sprinkler.png",
    count: 28,
    href: "/san-pham?category=sprinkler",
  },
  {
    name: "Vòi & cuộn chữa cháy",
    image: "/images/category/voipccc.jpg",
    count: 24,
    href: "/san-pham?category=voi-chua-chay",
  },
  {
    name: "Trang phục PCCC",
    image: "/images/category/trangphucpccc.jpg",
    count: 18,
    href: "/san-pham?category=trang-phuc",
  },
  {
    name: "Thiết bị cứu hộ",
    image: "/images/category/tupccc.png",
    count: 36,
    href: "/san-pham?category=cuu-ho",
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-red-primary">
            Danh mục sản phẩm
          </span>
          <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            Đa dạng thiết bị PCCC
          </h2>
          <p className="mx-auto max-w-2xl text-steel">
            Chúng tôi cung cấp đầy đủ các loại thiết bị phòng cháy chữa cháy
            từ các thương hiệu uy tín trong và ngoài nước.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-xl bg-silver">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-1 transition-transform group-hover:scale-110"
                  sizes="64px"
                />
              </div>
              <h3 className="mb-1 text-sm font-bold text-charcoal transition-colors group-hover:text-red-primary">
                {cat.name}
              </h3>
              <p className="text-xs text-steel">{cat.count} sản phẩm</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
