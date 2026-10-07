import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { getColorHex, getProductVariants } from "../data/variants";
import Header from "../components/layout/Header";
import ProductList from "../components/home/ProductList";
import ProductReviews from "../components/ProductReviews";
import Footer from "../components/layout/Footer";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null); // null => first available size
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      const data = await response.json();

      setProduct(data);

      const relatedResponse = await fetch(
        `https://dummyjson.com/products/category/${data.category}`
      );

      const relatedData = await relatedResponse.json();

      setRelatedProducts(
        relatedData.products.filter(
          (relatedProduct) => relatedProduct.id !== data.id
        )
      );
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const originalPrice =
    product.price / (1 - product.discountPercentage / 100);

  const variants = getProductVariants(product);
  const activeSize = selectedSize ?? variants.sizes[0];
  const activeColor = variants.colors[selectedColor];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        size: activeSize,
        color: activeColor,
        quantity,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
    <Header />

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-black">
              Home
            </Link>

            <span>/</span>

            <span>Shop</span>

            <span>/</span>

            <span>{product.category}</span>

            <span>/</span>

            <span className="text-black">
              {product.title}
            </span>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">

            <div className="flex flex-col-reverse gap-4 sm:flex-row">

              <div className="flex gap-3 sm:w-24 sm:flex-col">
                {product.images?.slice(0, 3).map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl bg-[#F0F0F0] ${
                      selectedImage === index
                        ? "ring-1 ring-black"
                        : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-hidden rounded-[20px] bg-[#F0F0F0]">
                <img
                  src={
                    product.images?.[selectedImage] ||
                    product.thumbnail
                  }
                  alt={product.title}
                  className="aspect-square w-full object-contain"
                />
              </div>
            </div>

            <div>

              <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)}/5
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>

                <span className="text-2xl font-bold text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-500">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </div>

              <p className="mt-5 border-b border-gray-200 pb-6 text-sm leading-6 text-gray-600">
                {product.description}
              </p>

              <div className="border-b border-gray-200 py-5">
                <p className="mb-3 text-sm text-gray-500">
                  Select Colors
                </p>

                <div className="flex gap-3">
                  {variants.colors.map((color, index) => (
                    <button
                      key={color}
                      title={color}
                      aria-label={color}
                      onClick={() => setSelectedColor(index)}
                      style={{ backgroundColor: getColorHex(color) }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20"
                    >
                      {selectedColor === index && (
                        <span
                          className={`text-sm ${
                            color === "White" ? "text-black" : "text-white"
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-b border-gray-200 py-5">
                <p className="mb-3 text-sm text-gray-500">
                  Choose Size
                </p>

                <div className="flex flex-wrap gap-2">
                  {variants.sizes.map(
                    (size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full px-5 py-2 text-sm ${
                          activeSize === size
                            ? "bg-black text-white"
                            : "bg-[#F0F0F0] text-gray-600"
                        }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <div className="flex items-center rounded-full bg-[#F0F0F0]">
                  <button
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="px-5 py-3 text-lg"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center text-sm">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((current) => current + 1)
                    }
                    className="px-5 py-3 text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80"
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </section>
        <ProductReviews reviews={product.reviews} />
        <ProductList subtitle="YOU MIGHT ALSO LIKE" start={8} />
      <Footer/>

      </main>

    </div>
  );
};

export default ProductDetailPage;