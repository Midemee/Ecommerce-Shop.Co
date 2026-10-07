import { useState } from "react";
import emailIcon from "../../assets/email-icon.svg";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
  <section className="w-full">
  <div className="flex flex-col items-start gap-6 rounded-[20px] bg-black px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-10 md:px-16 md:py-12">
        <h2 className="heading-display max-w-sm text-2xl text-white md:text-4xl">
          Stay upto date about our latest offers
        </h2>

        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3.5">
          <div className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3.5">
            <img src={emailIcon} alt="" className="h-4 w-4 shrink-0" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/50"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-white px-5 py-3.5 text-sm font-medium transition-colors hover:bg-white/90"
          >
            Subscribe to Newsletter
          </button>

          <p role="status" className="text-xs text-white/70">
            {submitted && "Thanks — you're on the list!"}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;