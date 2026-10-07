import { Link } from "react-router";
import { useDispatch } from "react-redux";
import deleteIcon from "../../assets/delete-icon.svg";
import addIcon from "../../assets/add-icon.svg";
import reduceIcon from "../../assets/reduce-icon.svg";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatPrice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <Link
        to={`/products/${item.id}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F0EEED] md:h-31"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/products/${item.id}`}
              className="line-clamp-1 text-base font-bold md:text-xl"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-xs md:text-sm">
              Size: <span className="text-black/60">{item.size}</span>
            </p>
            <p className="text-xs md:text-sm">
              Color: <span className="text-black/60">{item.color}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.key))}
            aria-label={`Remove ${item.title} from cart`}
            className="shrink-0 cursor-pointer"
          >
            <img src={deleteIcon} alt="" className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold md:text-2xl">
            {formatPrice(item.price * item.quantity)}
          </span>

          <div className="flex items-center gap-3 rounded-full bg-[#F0F0F0] px-3 py-2 md:gap-5 md:px-4 md:py-3">
            <button
              type="button"
              onClick={() => dispatch(decrementQuantity(item.key))}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <img src={reduceIcon} alt="" className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <span className="min-w-4 text-center text-sm">{item.quantity}</span>

            <button
              type="button"
              onClick={() => dispatch(incrementQuantity(item.key))}
              aria-label="Increase quantity"
              className="cursor-pointer"
            >
              <img src={addIcon} alt="" className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
