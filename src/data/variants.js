// dummyJSON products have no colour / size / dress-style fields, but the Figma
// design filters on all three and the cart shows size + colour per item.
//
// So we derive them deterministically from the product id. The same product
// always gets the same variants, which keeps the category filters, the product
// page and the cart consistent with each other.
//
// If you ever move to a real backend, replace `getProductVariants` with the
// real product fields and nothing else needs to change.

export const COLORS = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Cyan", hex: "#06CAF5" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
];

export const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

export const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];

export const getProductVariants = (product) => {
  const id = product.id;

  // 3 distinct colours (step 1, 2 or 3 over a list of 10 never collides)
  const start = id % COLORS.length;
  const step = 1 + (id % 3);
  const colors = [0, 1, 2].map(
    (i) => COLORS[(start + i * step) % COLORS.length].name
  );

  // 4 consecutive sizes
  const sizeStart = id % (SIZES.length - 3);
  const sizes = SIZES.slice(sizeStart, sizeStart + 4);

  const dressStyle = DRESS_STYLES[id % DRESS_STYLES.length];

  return { colors, sizes, dressStyle };
};

export const getColorHex = (name) =>
  COLORS.find((color) => color.name === name)?.hex ?? "#000000";
