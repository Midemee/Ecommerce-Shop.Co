import { useState } from "react";
import closeIcon from "../../assets/close-icon.svg";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-black text-white text-center text-xs sm:text-sm py-2.5 px-10">
      <p>
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="font-semibold underline underline-offset-2">
          Sign Up Now
        </a>
      </p>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <img src={closeIcon} alt="" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default AnnouncementBar;