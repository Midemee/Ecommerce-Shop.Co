const ProductReviews = ({ reviews = [] }) => {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-3 border-b border-gray-200">
        <button className="border-b-2 border-black pb-4 text-sm font-medium">
          Product Details
        </button>

        <button className="border-b-2 border-black pb-4 text-sm font-medium">
          Rating & Reviews
        </button>

        <button className="pb-4 text-sm text-gray-500">
          FAQs
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold">
          All Reviews
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({reviews.length})
          </span>
        </h2>

        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0]">
            ⚙
          </button>

          <button className="rounded-full bg-[#F0F0F0] px-5 py-2 text-sm">
            Latest
          </button>

          <button className="rounded-full bg-black px-5 py-2 text-sm text-white">
            Write a Review
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {reviews.map((review, index) => (
          <article
            key={`${review.reviewerEmail}-${index}`}
            className="rounded-2xl border border-gray-200 p-5"
          >

            <div className="flex items-center justify-between">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= Math.round(review.rating)
                      ? "★"
                      : "☆"}
                  </span>
                ))}
              </div>

              <button className="text-gray-400">
                ...
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <h3 className="font-semibold">
                {review.reviewerName}
              </h3>

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                ✓
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              "{review.comment}"
            </p>

            <p className="mt-4 text-xs text-gray-500">
              Posted on{" "}
              {new Date(review.date).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          </article>
        ))}
      </div>

      {/* Load more */}
      {reviews.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button className="rounded-full border border-gray-200 px-8 py-3 text-sm font-medium transition hover:bg-gray-50">
            Load More Reviews
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductReviews;