import heroModel from "../../assets/hero-model.png";
import bigDiamond from "../../assets/big-diamond.svg";
import smallDiamond from "../../assets/small-diamond.svg";
import divider from "../../assets/Line.svg";
import stat200 from "../../assets/200PLUS.svg";
import stat2000 from "../../assets/2000PLUS.svg";
import stat30000 from "../../assets/30000PLUS.svg";

const stats = [
  { src: stat200, alt: "200+ international brands" },
  { src: stat2000, alt: "2,000+ high-quality products" },
  { src: stat30000, alt: "30,000+ happy customers" },
];

const Hero = () => {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl grid items-end lg:grid-cols-2">

        <div className="px-4 pt-10 pb-6 md:px-8 lg:self-center lg:py-24">
          <h1 className="heading-display text-4xl leading-[1.1] md:text-6xl lg:text-5xl xl:text-[54px]">
            Find clothes that matches your style
          </h1>

          <p className="mt-5 max-w-md text-sm text-black/60 md:text-base lg:mt-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <a
            href="#new-arrivals"
            className="mt-6 block w-full rounded-full bg-black px-14 py-4 text-center text-base font-medium text-white transition-colors hover:bg-black/80 sm:inline-block sm:w-auto lg:mt-8"
          >
            Shop Now
          </a>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:flex-nowrap sm:gap-x-0 lg:mt-12 lg:justify-start">
            {stats.map((stat, index) => (
                <li key={stat.alt} className="flex items-center">
                {index > 0 && (
                    <img
                    src={divider}
                    alt=""
                    aria-hidden="true"
                    className="mx-4 hidden h-12 sm:block lg:h-14 xl:mx-5 xl:h-[74px]"
                    />
                )}
                <img
                    src={stat.src}
                    alt={stat.alt}
                    className="h-11 w-auto sm:h-14 xl:h-[74px]"
                />
                </li>
            ))}
            </ul>
        </div>

        <div className="relative">
          <img
            src={heroModel}
            alt="Two models wearing casual streetwear"
            className="mx-auto w-full max-w-xl object-contain object-bottom lg:max-w-none"
          />

          <img
            src={bigDiamond}
            alt=""
            aria-hidden="true"
            className="absolute right-4 top-6 w-14 md:right-8 md:w-20 lg:top-16 lg:w-[104px]"
          />
          <img
            src={smallDiamond}
            alt=""
            aria-hidden="true"
            className="absolute left-2 top-1/3 w-8 md:left-6 md:w-11 lg:w-14"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;