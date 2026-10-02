import { useGetAllProductsQuery } from "../../api/productsApi";
import ProductCard from "./ProductCard";
import { useState } from "react";

const ProductList = ({ subtitle, start = 0, limit = 4 }) => {
  const [showAll, setShowAll] = useState(false);

  const {data, isLoading, isError} = useGetAllProductsQuery();

  const rawProducts = data?.products || [];

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Something went wrong while loading products.</p>;
  }

  const visibleProducts = showAll ? rawProducts : rawProducts.slice(start, start + limit);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="pb-10 text-center text-4xl font-extrabold md:text-5xl">
        {subtitle}
      </h2>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button onClick={() => setShowAll((previous) => !previous)} className="rounded-full border border-black px-10 py-3">
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
    </section>
  );
};

export default ProductList;