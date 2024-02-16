// Discount price based on continent and category of product
export const discountCalculator = (price: Number | String, category: String, continent: String) => {
  if (continent === "Africa" || continent === "Asia") {
    let discount = 0;
    let finalPrice = 0;
    switch (category) {
      case "electronics":
        discount = Number(price) * 0.2;
        finalPrice = Number(price) - discount;
        return finalPrice.toFixed(0);
      case "jewelery":
        discount = Number(price) * 0.35;
        finalPrice = Number(price) - discount;
        return finalPrice.toFixed(0);
      case "men's clothing":
        discount = Number(price) * 0.07;
        finalPrice = Number(price) - discount;
        return finalPrice.toFixed(0);
      case "women's clothing":
        discount = Number(price) * 0.07;
        finalPrice = Number(price) - discount;
        return finalPrice.toFixed(0);
      default:
        discount = Number(price) * 0.1;
        finalPrice = Number(price) - discount;
        return finalPrice.toFixed(0);
    }
  } else return price;
};