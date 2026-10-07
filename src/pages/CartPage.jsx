import { Link } from "react-router";
import { useSelector } from "react-redux";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { selectCartItems, selectPromo } from "../features/cart/cartSlice";

const CartPage = () => {
  const items = useSelector(selectCartItems);
  const promo = useSelector(selectPromo);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-t border-black/10 py-5 text-sm text-black/60">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>›</span>
          <span className="text-black">Cart</span>
        </nav>

        <h1 className="heading-display text-3xl md:text-[40px]">Your Cart</h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl font-bold">Your cart is empty.</p>
            <Link
              to="/category"
              className="mt-6 inline-block rounded-full bg-black px-10 py-3.5 text-sm font-medium text-white hover:bg-black/80"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid items-start gap-5 md:mt-6 lg:grid-cols-[1fr_505px]">
            <ul className="divide-y divide-black/10 rounded-[20px] border border-black/10 p-4 md:p-6">
              {items.map((item) => (
                <CartItem key={item.key} item={item} />
              ))}
            </ul>

            <OrderSummary items={items} promo={promo} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
