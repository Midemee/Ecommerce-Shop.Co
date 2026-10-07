import { Link } from "react-router";
import casual from "../../assets/casual.png";
import formal from "../../assets/formal.png";
import party from "../../assets/party.png";
import gym from "../../assets/gym.png";

const styles = [
  { name: "Casual", image: casual, span: "md:col-span-1" },
  { name: "Formal", image: formal, span: "md:col-span-2" },
  { name: "Party", image: party, span: "md:col-span-2" },
  { name: "Gym", image: gym, span: "md:col-span-1" },
];

const DressStyle = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="rounded-[24px] bg-[#f0f0f0] px-5 py-10 md:rounded-[40px] md:px-16 md:py-16">
        <h2 className="heading-display text-center text-3xl md:text-5xl">
          Browse by dress style
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {styles.map((style) => (
            <li
              key={style.name}
              className={`relative h-48 overflow-hidden rounded-[20px] bg-white md:h-56 lg:h-[289px] ${style.span}`}
            >
              <Link
                to={`/category?style=${style.name}`}
                aria-label={`Browse ${style.name}`}
                className="absolute inset-0 z-20"
              />
              <img
                src={style.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-right"
              />
              <h3 className="relative z-10 p-5 text-2xl font-bold md:p-9 md:text-3xl lg:text-4xl">
                {style.name}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DressStyle;