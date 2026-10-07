import { getProductVariants } from "../data/variants";

export const PRICE_MIN = 0;
export const PRICE_MAX = 1000; // slider upper bound; at the bound = "no upper limit"
export const PAGE_SIZE = 9;

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
  { value: "newest", label: "Newest" },
];

const sorters = {
  popular: (a, b) => b.rating - a.rating,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  discount: (a, b) => b.discountPercentage - a.discountPercentage,
  newest: (a, b) =>
    new Date(b.meta?.createdAt ?? 0) - new Date(a.meta?.createdAt ?? 0),
};

export const filterProducts = (products, filters) => {
  const { category, style, q, min, max, colors, sizes } = filters;
  const query = q.trim().toLowerCase();

  return products.filter((product) => {
    if (category && product.category !== category) return false;

    if (query) {
      const haystack = `${product.title} ${product.brand ?? ""} ${
        product.category
      } ${(product.tags ?? []).join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (product.price < min) return false;
    if (max < PRICE_MAX && product.price > max) return false;

    const variants = getProductVariants(product);
    if (style && variants.dressStyle !== style) return false;
    if (colors.length && !colors.some((c) => variants.colors.includes(c)))
      return false;
    if (sizes.length && !sizes.some((s) => variants.sizes.includes(s)))
      return false;

    return true;
  });
};

export const sortProducts = (products, sort) =>
  [...products].sort(sorters[sort] ?? sorters.popular);

// ---- URL <-> filters -------------------------------------------------------
const toList = (value) => (value ? value.split(",").filter(Boolean) : []);

export const paramsToFilters = (params) => ({
  category: params.get("category") ?? "",
  style: params.get("style") ?? "",
  q: params.get("q") ?? "",
  min: Number(params.get("min")) || PRICE_MIN,
  max: Number(params.get("max")) || PRICE_MAX,
  colors: toList(params.get("colors")),
  sizes: toList(params.get("sizes")),
  sort: params.get("sort") ?? "popular",
  page: Math.max(1, Number(params.get("page")) || 1),
});

export const filtersToParams = (filters) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.style) params.style = filters.style;
  if (filters.q) params.q = filters.q;
  if (filters.min > PRICE_MIN) params.min = String(filters.min);
  if (filters.max < PRICE_MAX) params.max = String(filters.max);
  if (filters.colors.length) params.colors = filters.colors.join(",");
  if (filters.sizes.length) params.sizes = filters.sizes.join(",");
  if (filters.sort !== "popular") params.sort = filters.sort;
  if (filters.page > 1) params.page = String(filters.page);
  return params;
};

// 1 2 … 9 10  (always shows first, last and the neighbours of the current page)
export const getPageNumbers = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push("...");
    result.push(page);
  });
  return result;
};
