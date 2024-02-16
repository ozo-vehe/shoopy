import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { useAuthentication } from "src/lib/hooks/use-authentication";

const ProductDisplay = ({addToCart}) => {
  const { user } = useAuthentication();
  const [products, setProducts] = useState([]);
  const [categories, setCategpries] = useState([]);
  const [active, setActive] = useState("electronics");

  // const filteredProduct = () => {

  // }
  useEffect(() => {
    console.log(user?.country);
    const getProducts = async () => {
      let savedProduct = sessionStorage.getItem('products');

      if(!savedProduct) {    
        const req = await fetch("https://fakestoreapi.com/products/");
        const res = await req.json();

        sessionStorage.setItem('products', JSON.stringify(res));
        savedProduct = sessionStorage.getItem('products');
      }
      setProducts(JSON.parse(savedProduct));
    };

    const getCategories = async () => {
      let savedCategories = sessionStorage.getItem('categories');

      if(!savedCategories) {    
        const req = await fetch("https://fakestoreapi.com/products/categories");
        const res = await req.json();

        sessionStorage.setItem('categories', JSON.stringify(res));
        savedCategories = sessionStorage.getItem('categories');
      }
      setCategpries(JSON.parse(savedCategories));
    };

    getCategories();
    getProducts();
  }, []);

  return (
    <div className="ProductDisplay mb-4 mt-16 px-12">
      <div className="flex flex-wrap gap-8 items-center justify-between mb-16">
        <div>
          <p className="text-[14px] text-custom-btn-gray mb-1">
            Popular item in the market
          </p>
          <h1 className="oswald text-[28px]">
            Trending{" "}
            {user ? (
              <span>
                Products in{" "}
                <span className="underline underline-offset-8 decoration-blue-500">{`${user.country}`}</span>
              </span>
            ) : (
              <span className="underline underline-offset-8 decoration-blue-500">
                Products
              </span>
            )}
          </h1>
        </div>

        <div>
          <ul className="flex items-center gap-4">
            {categories?.map((category, index) => (
              <li
                className={`capitalize px-1 sm:px-2 md:px-4 md:py-1 lg:px-4 lg:py-1 cursor-pointer text-[14px] lg:text-[16px] md:text-[16px] sm:text-[16px] ${
                  active === category
                    ? "border border-blue-500 bg-blue-500 text-slate-50"
                    : "border border-slate-700"
                }`}
                key={index}
                onClick={() => setActive(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-start">
        {products?.map((product) => (
          <>
            {product.category === active && (
              <Product
                key={product.id}
                product={product}
                filter={active}
                addToCart={addToCart}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
