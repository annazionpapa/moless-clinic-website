import Link from "next/link";
import Image from "next/image";

const PRICING_LINKS = [
  {
    title: "남성제모",
    subtitle: "수염 · 바디 · 브라질리언",
    href: "/pricing/male",
    image: "/images/original/male-face.jpg",
  },
  {
    title: "여성제모",
    subtitle: "얼굴 · 바디 · 브라질리언",
    href: "/pricing/female",
    image: "/images/original/female-body.jpg",
  },
  {
    title: "1회 가격",
    subtitle: "부위별 단일 시술",
    href: "/pricing/regular",
    image: "/images/original/skin-texture.jpg",
  },
];

export default function PricingIndexPage() {
  return (
    <>
      <section
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/original/clinic-interior-2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            가격안내
          </h1>
          <p className="text-white/70 text-base tracking-wide">모리스의원</p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                  <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
                  <p className="text-white/70 text-sm tracking-wide">{item.subtitle}</p>
                  <span className="mt-6 px-6 py-2 border border-white/40 text-sm tracking-wider group-hover:bg-white group-hover:text-black transition-all duration-500">
                    자세히 보기
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
