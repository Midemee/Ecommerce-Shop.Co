import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/home/ProductCard";
import FilterPanel, { SlidersIcon } from "../components/category/FilterPanel";
import Pagination from "../components/category/Pagination";
import { useGetCatalogQuery, useGetCategoriesQuery } from "../api/productsApi";
import {
  PAGE_SIZE,
  SORT_OPTIONS,
  filterProducts,
  filtersToParams,
  paramsToFilters,
  sortProducts,
} from "../utils/filterProducts";

const CategoryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile sheet only

  const { data: products = [], isLoading, isError } = useGetCatalogQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  // The URL is the single source of truth for the *applied* filters.
  const filters = paramsToFilters(searchParams);

  const updateFilters = (changes) => {
    // Any change except paging itself sends you back to page 1.
    const next = { ...filters, page: 1, ...changes };
    setSearchParams(filtersToParams(next));
  };

  const results = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, searchParams]
  );

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const startIndex = (page - 1) * PAGE_SIZE;
  const visible = results.slice(startIndex, startIndex + PAGE_SIZE);

  const title = filters.q
    ? `Results for "${filters.q}"`
    : filters.style ||
      categories.find((c) => c.slug === filters.category)?.name ||
      "All Products";

  const goToPage = (nextPage) => {
    updateFilters({ page: nextPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 border-t border-black/10 py-5 text-sm text-black/60">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span>›</span>
          <span className="text-black">{title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[295px_1fr]">
          {/* key => remount (and reseed the draft) whenever applied filters change */}
          <FilterPanel
            key={searchParams.toString()}
            initial={filters}
            categories={categories}
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onApply={(changes) => updateFilters(changes)}
          />

          <section>
            {/* Title row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-bold md:text-[32px]">{title}</h1>

              <div className="flex items-center gap-3 text-sm text-black/60">
                <span>
                  {results.length === 0
                    ? "Showing 0 Products"
                    : `Showing ${startIndex + 1}-${Math.min(
                        startIndex + PAGE_SIZE,
                        results.length
                      )} of ${results.length} Products`}
                </span>

                <label className="hidden items-center gap-1 sm:flex">
                  Sort by:
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="cursor-pointer bg-transparent font-medium text-black outline-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                {/* mobile: open filter sheet */}
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  aria-label="Open filters"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F0F0F0] text-black lg:hidden"
                >
                  <SlidersIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* mobile sort (the inline one is hidden below sm) */}
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              aria-label="Sort products"
              className="mt-4 w-full rounded-full bg-[#F0F0F0] px-4 py-2.5 text-sm outline-none sm:hidden"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>

            {/* Product grid */}
            {isLoading && <p className="py-20 text-center">Loading products...</p>}

            {isError && (
              <p className="py-20 text-center">
                Something went wrong while loading products.
              </p>
            )}

            {!isLoading && !isError && results.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg font-bold">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="mt-4 cursor-pointer rounded-full border border-black px-8 py-3 text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
