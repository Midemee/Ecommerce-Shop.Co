
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    id,
    title,
    thumbnail,
    price,
    rating,
    discountPercentage,
  } = product;

  const originalPrice =
    price / (1 - discountPercentage / 100);

  return (
    <Link to={`/products/${id}`}>
      <article className="w-full cursor-pointer">

        <div className="overflow-hidden rounded-[20px] bg-[#F0F0F0]">
          <img
            src={thumbnail}
            alt={title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="mt-4">

          <h3 className="line-clamp-1 text-base font-bold">
            {title}
          </h3>

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

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
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
    </Link>
  );
};

export default ProductCard;
