/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAuthentication } from "src/lib/hooks/use-authentication";
import { useLocalContent } from "src/lib/hooks/use-local-content";
import { countryDetails, exchangeRate } from "src/utils/shopy";
import { discountCalculator } from "src/utils/discountCalculator";

export default function Product({ product, addToCart }) {
  const { country } = useLocalContent();
  const { title, image, price, category } = product;
  // const { user } = useContext(UserContext)
  const { user } = useAuthentication();
  const [exchangeRatePrice, setExchangeRatePrice] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [continent, setContinent] = useState("");

  // Discount price based on continent and category of product
  const discountPrice = (price, category) => {
    return Number(discountCalculator(price, category, continent));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const categoryDiscount = (category) => {
    let discount = 0;
    switch (category) {
      case "electronics":
        discount = 100 * 0.2;
        return discount.toFixed(0);
      case "jewelery":
        discount = 100 * 0.35;
        return discount.toFixed(0);
      case "men's clothing":
        discount = 100 * 0.07;
        return discount.toFixed(0);
      case "women's clothing":
        discount = 100 * 0.07;
        return discount.toFixed(0);
      default:
        discount = 100 * 0.1;
        return discount.toFixed(0);
    }
  };

  useEffect(() => {
    const getCountryDetails = async () => {
      if (!country) {
        return; // Handle the case when country is undefined
      }

      const { currency_iso, currency_name, currency_symbol, continent } =
        await countryDetails(country);
      const rate = await exchangeRate(currency_iso);
      const exchange_rate = rate.toFixed(0);

      setExchangeRatePrice(exchange_rate);
      setCurrencySymbol(currency_symbol);
      setContinent(continent);

      sessionStorage.setItem(
        "countryDetails",
        JSON.stringify({
          currency_iso,
          currency_name,
          currency_symbol,
          exchange_rate,
          continent,
        })
      );
    };

    if (user) {
      const countryDetails = sessionStorage.getItem("countryDetails");
      if (countryDetails) {
        const { currency_symbol, exchange_rate, continent } =
          JSON.parse(countryDetails);
        setExchangeRatePrice(exchange_rate);
        setCurrencySymbol(currency_symbol);
        setContinent(continent);
      } else {
        getCountryDetails();
      }
    }
  }, [user]);

  return (
    <div className="group product mb-8 cursor-pointer">
      <div className="relative border border-slate-100 h-[350px] lg:h-[300px] md:h-[250px] sm:h-[350px] overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
        <div className="z-50 flex items-center justify-center absolute bottom-0 bg-black/40 w-full h-24 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute flex gap-x-4 z-10">
            <img
              className="icon cursor-pointer p-3 w-12 h-12 bg-blue-500/80 hover:bg-blue-600 duration-300 transition-all"
              src="https://img.icons8.com/material-outlined/ffffff/24/shopping-cart--v1.png"
              alt="shopping-cart"
              onClick={() => addToCart(product)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4 px-2">
        <h3 className="group-hover:text-blue-500 transition-all duration-300 capitalize font-[600] text-[18px] mb-4 mt-1 text-center">
          {title}
        </h3>
        <div className="capitalize text-slate-600">
          {user ? (
            <div className="flex text-[20px] font-bold items-center gap-1">
              <span>
                {currencySymbol}{" "}
                {formatPrice(Number(discountPrice(price, category)) * exchangeRatePrice)}
              </span>
              {user.country === "Nigeria" && (
                <span className="discount text-blue-500 text-[12px] font-[400]">{`(-${categoryDiscount(
                  category
                )}%)`}</span>
              )}
            </div>
          ) : (
            <span className="font-bold text-[20px]">${price}.00</span>
          )}
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};
