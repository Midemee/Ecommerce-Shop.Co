import { PRICE_MAX, PRICE_MIN } from "../../utils/filterProducts";

const PriceRangeSlider = ({ value, onChange }) => {
  const [low, high] = value;
  const span = PRICE_MAX - PRICE_MIN;
  const lowPercent = ((low - PRICE_MIN) / span) * 100;
  const highPercent = ((high - PRICE_MIN) / span) * 100;

  return (
    <div>
      <div className="relative mx-2 h-5">
        {/* track */}
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#F0F0F0]" />
        {/* selected range */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
        />

        <input
          type="range"
          aria-label="Minimum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={low}
          onChange={(e) => onChange([Math.min(Number(e.target.value), high - 10), high])}
          className="range-thumb"
          style={{ zIndex: low > PRICE_MAX - 50 ? 5 : 3 }}
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={10}
          value={high}
          onChange={(e) => onChange([low, Math.max(Number(e.target.value), low + 10)])}
          className="range-thumb"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs font-medium">
        <span>${low}</span>
        <span>
          ${high}
          {high >= PRICE_MAX ? "+" : ""}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
