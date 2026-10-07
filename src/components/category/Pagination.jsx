import arrowLeft from "../../assets/arrow-left-bold.svg";
import arrowRight from "../../assets/arrow-right-bold.svg";
import { getPageNumbers } from "../../utils/filterProducts";

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between border-t border-black/10 pt-6"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        <img src={arrowLeft} alt="" className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <ul className="flex items-center gap-1 text-sm">
        {getPageNumbers(page, totalPages).map((item, index) =>
          item === "..." ? (
            <li key={`gap-${index}`} className="px-2 text-black/50">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={item === page ? "page" : undefined}
                className={`h-10 w-10 cursor-pointer rounded-lg ${
                  item === page ? "bg-[#F0F0F0] font-medium" : "text-black/50 hover:bg-[#F0F0F0]"
                }`}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <img src={arrowRight} alt="" className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
