import Newsletter from "../home/Newsletter";
import logo from "../../assets/SHOP.CO.svg";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import github from "../../assets/github.svg";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import paypal from "../../assets/paypal.svg";
import applepay from "../../assets/applepay.svg";
import googlepay from "../../assets/googlepay.svg";
import { footerLinks } from "../../data/footerLinks";

const socials = [
  { name: "Twitter", href: "#", icon: twitter },
  { name: "Facebook", href: "#", icon: facebook },
  { name: "Instagram", href: "#", icon: instagram },
  { name: "Github", href: "#", icon: github },
];

const paymentMethods = [
  { name: "Visa", icon: visa },
  { name: "Mastercard", icon: mastercard },
  { name: "PayPal", icon: paypal },
  { name: "Apple Pay", icon: applepay },
  { name: "Google Pay", icon: googlepay },
];

const Footer = () => {
  return (
    <footer className="mt-32 bg-[#F0F0F0] md:mt-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <div className="relative -translate-y-1/2">
          <Newsletter />
        </div>

        <div className="-mt-16 pb-10 md:-mt-20 md:pb-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6 md:gap-x-8">

            <div className="col-span-2 md:col-span-2">
              <img
                src={logo}
                alt="SHOP.CO"
                className="h-6 w-auto"
              />

              <p className="mt-6 max-w-[230px] text-sm text-black/60">
                We have clothes that suit your style and which you&apos;re
                proud to wear. From women to men.
              </p>

              <ul className="mt-6 flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 transition-colors hover:bg-black hover:[&_img]:invert"
                    >
                      <img
                        src={social.icon}
                        alt=""
                        className="h-3.5 w-3.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {footerLinks.map((column) => (
              <nav
                key={column.heading}
                aria-label={column.heading}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50">
                  {column.heading}
                </h3>

                <ul className="mt-6 flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-black/70 hover:text-black"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <hr className="mt-10 border-black/10 md:mt-14" />

          <div className="mt-6 flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
            <p className="text-sm text-black/50">
              Shop.co © {new Date().getFullYear()}, All Rights Reserved
            </p>

            <ul className="flex items-center gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method.name}
                  className="flex h-7 w-11 items-center justify-center rounded-md border border-black/10 bg-white"
                >
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="h-4 w-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;