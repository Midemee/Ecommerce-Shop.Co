import { useState } from "react";
import { useDispatch } from "react-redux";
import priceTagIcon from "../../assets/price-tag-icon.svg";
import arrowRight from "../../assets/arrow-right-bold.svg";
import {
  PROMO_CODES,
  applyPromo,
  getCartTotals,
  removePromo,
} from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

const OrderSummary = ({ items, promo }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { subtotal, discount, delivery, total } = getCartTotals(items, promo);

  const handleApply = (event) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();

    if (!normalized) return;

    if (PROMO_CODES[normalized]) {
      dispatch(applyPromo(normalized));
      setCode("");
      setError("");
    } else {
      setError("That promo code isn't valid.");
    }
  };

  return (
    <div className="rounded-[20px] border border-black/10 p-5 md:px-6 md:py-5">
      <h2 className="text-xl font-bold md:text-2xl">Order Summary</h2>

      <dl className="mt-5 space-y-4 text-base md:text-xl">
        <div className="flex justify-between">
          <dt className="text-black/60">Subtotal</dt>
          <dd className="font-bold">{formatPrice(subtotal)}</dd>
        </div>

        {promo && (
          <div className="flex justify-between">
            <dt className="text-black/60">Discount (-{promo.percent}%)</dt>
            <dd className="font-bold text-sale">-{formatPrice(discount)}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt className="text-black/60">Delivery Fee</dt>
          <dd className="font-bold">{formatPrice(delivery)}</dd>
        </div>

        <hr className="border-black/10" />

        <div className="flex justify-between">
          <dt>Total</dt>
          <dd className="text-xl font-bold md:text-2xl">{formatPrice(total)}</dd>
        </div>
      </dl>

      {promo ? (
        <p className="mt-5 flex items-center justify-between rounded-full bg-[#F0F0F0] px-4 py-3 text-sm">
          <span>
            Code <strong>{promo.code}</strong> applied
          </span>
          <button
            type="button"
            onClick={() => dispatch(removePromo())}
            className="cursor-pointer text-black/60 underline underline-offset-2 hover:text-black"
          >
            Remove
          </button>
        </p>
      ) : (
        <form onSubmit={handleApply} className="mt-5">
          <div className="flex gap-3">
            <label className="flex flex-1 items-center gap-3 rounded-full bg-[#F0F0F0] px-4 py-3">
              <img src={priceTagIcon} alt="" className="h-5 w-5 shrink-0" />
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="Add promo code"
                aria-label="Promo code"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-black/40"
              />
            </label>

            <button
              type="submit"
              className="cursor-pointer rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-black/80 md:px-9"
            >
              Apply
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-2 pl-4 text-xs text-sale">
              {error}
            </p>
          )}
        </form>
      )}

      <button
        type="button"
        disabled={items.length === 0}
        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Go to Checkout
        <img src={arrowRight} alt="" className="h-5 w-5 invert" />
      </button>
    </div>
  );
};

export default OrderSummary;
