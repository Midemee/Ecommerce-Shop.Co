import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "shopco-cart";

// Promo codes are hard-coded because dummyJSON has no coupon endpoint.
// "SHOP20" matches the "20% off your first order" announcement bar.
export const PROMO_CODES = {
  SHOP20: 20,
};

export const DELIVERY_FEE = 15;

const loadCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore corrupt / unavailable storage
  }
  return { items: [], promo: null };
};

export const saveCart = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore (private mode, quota, ...)
  }
};

// The same product in a different size / colour is a different cart line.
export const getCartKey = (id, size, color) => `${id}-${size}-${color}`;

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action) => {
      const { id, title, thumbnail, price, size, color, quantity = 1 } =
        action.payload;
      const key = getCartKey(id, size, color);
      const existing = state.items.find((item) => item.key === key);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          key,
          id,
          title,
          thumbnail,
          price,
          size,
          color,
          quantity,
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.key === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.key === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.key !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.promo = null;
    },
    applyPromo: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (PROMO_CODES[code]) {
        state.promo = { code, percent: PROMO_CODES[code] };
      }
    },
    removePromo: (state) => {
      state.promo = null;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  applyPromo,
  removePromo,
} = cartSlice.actions;

// ---- selectors -----------------------------------------------------------
export const selectCartItems = (state) => state.cart.items;
export const selectPromo = (state) => state.cart.promo;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotals = (items, promo) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promo ? (subtotal * promo.percent) / 100 : 0;
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
};

export default cartSlice.reducer;
