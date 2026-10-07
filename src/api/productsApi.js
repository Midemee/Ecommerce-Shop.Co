import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_APP_BASEURL;
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // NEW: the whole catalogue in one request (limit=0 => no limit).
    // The category page filters / sorts / paginates this list on the client.
    getCatalog: builder.query({
      query: () => "/products?limit=0",
      transformResponse: (response) => response.products,
    }),

    // NEW: [{ slug, name, url }, ...]
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetCatalogQuery,
  useGetCategoriesQuery,
} = productsApi;
