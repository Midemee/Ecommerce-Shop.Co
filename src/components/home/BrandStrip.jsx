import versace from "../../assets/versace.svg";
import zara from "../../assets/zara.svg";
import gucci from "../../assets/gucci.svg";
import prada from "../../assets/prada.svg";
import calvinKlein from "../../assets/calvin-klein.svg";

const brands = [
  { name: "Versace", src: versace },
  { name: "Zara", src: zara },
  { name: "Gucci", src: gucci },
  { name: "Prada", src: prada },
  { name: "Calvin Klein", src: calvinKlein },
];

const BrandStrip = () => {
  return (
    <section className="bg-black" aria-label="Brands we carry">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-5 px-4 py-8 md:px-8 lg:justify-between lg:py-11">
        {brands.map((brand) => (
          <li key={brand.name}>
            <img
              src={brand.src}
              alt={brand.name}
              className="h-5 w-auto md:h-7 lg:h-auto"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrandStrip;