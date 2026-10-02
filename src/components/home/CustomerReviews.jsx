import stars from "../../assets/stars.svg";
const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      review:
        "The quality of the clothes is amazing. Everything looks exactly like the pictures and the fit is perfect!",
      date: "Posted on August 14, 2026",
    },
    {
      id: 2,
      name: "Alex K.",
      review:
        "I absolutely love my new pieces. The delivery was quick and the quality exceeded my expectations.",
      date: "Posted on August 10, 2026",
    },
    {
      id: 3,
      name: "James L.",
      review:
        "Great shopping experience from start to finish. The clothes are stylish, comfortable, and well made.",
      date: "Posted on August 5, 2026",
    },
    {
      id: 4,
      name: "Olivia R.",
      review:
        "I've ordered several times and I've never been disappointed. The quality is consistently excellent.",
      date: "Posted on July 29, 2026",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      {/* Heading */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-4xl font-extrabold uppercase md:text-5xl">
          Our Happy Customers
        </h2>

        <div className="flex gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Previous reviews"
          >
            ←
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Next reviews"
          >
            →
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-[20px] border border-gray-200 p-6"
          >
            {/* Stars */}
            <img
              src={stars}           
              alt="5 star rating"
              className="h-auto w-[110px]"
            />

            {/* Customer name */}
            <div className="mt-4 flex items-center gap-2">
              <h3 className="text-lg font-bold">
                {review.name}
              </h3>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                ✓
              </span>
            </div>

            {/* Review */}
            <p className="mt-3 text-sm leading-6 text-gray-600">
              "{review.review}"
            </p>

            {/* Date */}
            <p className="mt-5 text-sm text-gray-400">
              {review.date}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;