import { useState } from "react";
import { Link } from "react-router";
import menuIcon from "../../assets/Vector.png";
import closeIcon from "../../assets/close-icon.svg";
import searchIcon from "../../assets/find-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import userIcon from "../../assets/user-icon.svg";
import chevronDown from "../../assets/drop-down-icon.svg";
import logo from "../../assets/SHOP.CO.svg";

const navLinks = [
  { label: "Shop", hasDropdown: true },
  { label: "On Sale" },
  { label: "New Arrivals" },
  { label: "Brands" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl flex items-center gap-4 px-4 py-4 md:px-8">
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <img src={menuOpen ? closeIcon : menuIcon} alt="" className="w-6 h-6" />
        </button>

      <Link to="/" aria-label="SHOP.CO home" className="shrink-0">
        <img src={logo} alt="SHOP.CO" className="h-5 md:h-6 w-auto" />
      </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6 ml-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="flex items-center gap-1 text-sm font-medium hover:text-slate-600 cursor-pointer"
            >
              {link.label}
              {link.hasDropdown && (
                <img src={chevronDown} alt="" className="w-3 h-3" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop search bar */}
        <div className="hidden lg:flex flex-1 items-center gap-2 bg-slate-100 rounded-full px-4 py-2.5 max-w-md">
          <img src={searchIcon} alt="" className="w-4 h-4 shrink-0" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <button type="button" aria-label="Search" className="lg:hidden cursor-pointer">
            <img src={searchIcon} alt="" className="w-5 h-5" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative">
            <img src={cartIcon} alt="" className="w-5 h-5" />
          </Link>
          <button type="button" aria-label="Account" className="hidden sm:inline-flex cursor-pointer">
            <img src={userIcon} alt="" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-slate-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="flex items-center justify-between text-sm font-medium cursor-pointer"
            >
              {link.label}
              {link.hasDropdown && <img src={chevronDown} alt="" className="w-3 h-3" />}
            </button>
          ))}
          <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2.5 mt-2">
            <img src={searchIcon} alt="" className="w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;