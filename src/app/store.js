import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";
import cartReducer, { saveCart } from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Keep the cart across page refreshes.
store.subscribe(() => saveCart(store.getState().cart));
