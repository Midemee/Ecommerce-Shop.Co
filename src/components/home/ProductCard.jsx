const ProductCard = ({ product }) => {
  const {
    title,
    thumbnail,
    price,
    rating,
    discountPercentage,
  } = product;

  // Calculate the original price before discount
  const originalPrice =
    price / (1 - discountPercentage / 100);

  return (
    <article className="w-full">
      {/* Product Image */}
      <div className="overflow-hidden rounded-[20px] bg-[#F0F0F0]">
        <img
          src={thumbnail}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="mt-4">
        {/* Product Name */}
        <h3 className="line-clamp-1 text-base font-bold">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={
                  star <= Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>

          <span className="text-sm text-gray-600">
            {rating.toFixed(1)}/5
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold">
            ${price.toFixed(2)}
          </span>

          <span className="text-xl font-bold text-gray-400 line-through">
            ${originalPrice.toFixed(2)}
          </span>

          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-500">
            -{Math.round(discountPercentage)}%
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;