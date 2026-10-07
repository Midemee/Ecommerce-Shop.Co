import { useState } from "react";
import chevron from "../../assets/drop-down-icon.svg";
import arrowRight from "../../assets/arrow-right-bold.svg";
import PriceRangeSlider from "./PriceRangeSlider";
import { COLORS, DRESS_STYLES, SIZES } from "../../data/variants";
import { PRICE_MAX, PRICE_MIN } from "../../utils/filterProducts";

const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-t border-black/10 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between text-lg font-bold"
      >
        {title}
        <img
          src={chevron}
          alt=""
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

// A list of single-choice rows (categories / dress style)
const OptionList = ({ options, selected, onSelect }) => (
  <ul className="flex flex-col gap-1">
    {options.map((option) => {
      const active = selected === option.value;
      return (
        <li key={option.value}>
          <button
            type="button"
            onClick={() => onSelect(active ? "" : option.value)}
            className={`flex w-full cursor-pointer items-center justify-between py-2 text-left text-base ${
              active ? "font-bold text-black" : "text-black/60 hover:text-black"
            }`}
          >
            {option.label}
            <img src={arrowRight} alt="" className="h-3.5 w-3.5 opacity-60" />
          </button>
        </li>
      );
    })}
  </ul>
);

// NOTE: this component is mounted with a `key` that changes whenever the
// applied filters change, so `initial` only needs to seed the draft state.
const FilterPanel = ({ initial, categories, open, onClose, onApply }) => {
  const [category, setCategory] = useState(initial.category);
  const [style, setStyle] = useState(initial.style);
  const [price, setPrice] = useState([initial.min, initial.max]);
  const [colors, setColors] = useState(initial.colors);
  const [sizes, setSizes] = useState(initial.sizes);

  const toggle = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const handleApply = () => {
    onApply({ category, style, min: price[0], max: price[1], colors, sizes });
    onClose();
  };

  const handleClear = () => {
    onApply({ category: "", style: "", min: PRICE_MIN, max: PRICE_MAX, colors: [], sizes: [] });
    onClose();
  };

  return (
    // Full-screen sheet below `lg`, sticky sidebar card from `lg` up.
    <aside
      className={`${
        open ? "block" : "hidden"
      } fixed inset-0 z-[60] overflow-y-auto bg-white p-5 lg:sticky lg:top-32 lg:z-0 lg:block lg:max-h-[calc(100vh-9rem)] lg:self-start lg:rounded-[20px] lg:border lg:border-black/10 lg:px-6`}
    >
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold">Filters</h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="cursor-pointer text-2xl leading-none lg:hidden"
        >
          ✕
        </button>
        <SlidersIcon className="hidden h-5 w-5 text-black/40 lg:block" />
      </div>

      <div className="-mt-1 max-h-64 overflow-y-auto pr-1">
        <OptionList
          options={categories.map((c) => ({ value: c.slug, label: c.name }))}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <FilterSection title="Price">
        <PriceRangeSlider value={price} onChange={setPrice} />
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => {
            const active = colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                title={color.name}
                aria-label={color.name}
                aria-pressed={active}
                onClick={() => toggle(colors, setColors, color.name)}
                style={{ backgroundColor: color.hex }}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/20"
              >
                {active && (
                  <span
                    className={`text-sm ${
                      color.name === "White" ? "text-black" : "text-white"
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(sizes, setSizes, size)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm ${
                  active ? "bg-black text-white" : "bg-[#F0F0F0] text-black/60"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Dress Style">
        <OptionList
          options={DRESS_STYLES.map((s) => ({ value: s, label: s }))}
          selected={style}
          onSelect={setStyle}
        />
      </FilterSection>

      <div className="space-y-3 border-t border-black/10 pt-5">
        <button
          type="button"
          onClick={handleApply}
          className="w-full cursor-pointer rounded-full bg-black py-3.5 text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          Apply Filter
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full cursor-pointer text-sm text-black/60 underline underline-offset-2 hover:text-black"
        >
          Clear all
        </button>
      </div>
    </aside>
  );
};

const SlidersIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
    <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export { SlidersIcon };
export default FilterPanel;
