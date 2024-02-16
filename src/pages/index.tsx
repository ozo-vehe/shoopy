import LandingPage from "src/components/LandingPage/LandingPage";
import ProductDisplay from "src/components/ProductDisplay";
import { countryDetails, exchangeRate } from "src/utils/shopy";

import { useEffect, useState } from "react";

import { useAuthentication } from "src/lib/hooks/use-authentication";
import { useLocalContent } from "src/lib/hooks/use-local-content";
import Modal from "src/components/Modal";


const Home = () => {
  const { user } = useAuthentication();
  const { country } = useLocalContent();
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategpries] = useState([]);

  interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
  }

  const addToCart = (product: Product) => {

    if (user) {
      setCartItems((prevItems: any) => {
        let updatedItems = [];
        const itemExists: Boolean = prevItems.find((item: { id: string, quantity: number }) => item.id === product.id);
        if (itemExists) {
          updatedItems = prevItems.map((item: { id: string, quantity: number }) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...prevItems, { ...product, quantity: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      });
      setShowModal(true);
    } else {
      alert('Please sign in to continue.');
    }
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const getCountryDetails = async () => {
      if (!country) {
        return; // Handle the case when country is undefined
      }

      const { currency_iso, currency_name, currency_symbol, continent } = await countryDetails(country)
      const rate = await exchangeRate(currency_iso);
      const exchange_rate = rate.toFixed(0);

      sessionStorage.setItem("countryDetails", JSON.stringify({ currency_iso, currency_name, currency_symbol, exchange_rate, continent }));
    }

    const getProducts = async () => {
      let savedProduct: string = sessionStorage.getItem('products')!;

      if (!savedProduct) {
        const req = await fetch("https://fakestoreapi.com/products/");
        const res = await req.json();

        sessionStorage.setItem('products', JSON.stringify(res));
        savedProduct = sessionStorage.getItem('products')!;
      }
      setProducts(JSON.parse(savedProduct));
    };

    const getCategories = async () => {
      let savedCategories = sessionStorage.getItem('categories');

      if (!savedCategories) {
        const req = await fetch("https://fakestoreapi.com/products/categories");
        const res = await req.json();

        sessionStorage.setItem('categories', JSON.stringify(res));
        savedCategories = sessionStorage.getItem('categories');
      }
      setCategpries(JSON.parse(savedCategories ?? ""));
    };

    const getCartProducts = async () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }

    getCategories();
    getProducts();
    getCartProducts();

    if (user) {
      getCountryDetails();
    } else {
      console.log('no user profile')
    }
  }, [user, country]);

  return (
    <>
      <LandingPage />
      <ProductDisplay addToCart={addToCart} />
      {showModal && <Modal closeModal={closeModal} />}
    </>
  );
};

export default Home;
