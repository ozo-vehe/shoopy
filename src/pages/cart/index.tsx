/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthentication } from "src/lib/hooks/use-authentication";
import { discountCalculator } from 'src/utils/discountCalculator';

const Cart = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const { user } = useAuthentication();
  const [continent, setContinent] = useState('');
  const [cartItems, setCartItems] = useState<{ id: string, image: string, title: string, quantity: number, price: number, category: string }[]>([]);
  const router = useRouter();

  const formatPrice = (price: String | Number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Discount price based on continent and category of product
  const discountPrice = (price: String | Number, category: String) => {
    discountCalculator(price, category, continent);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const priceTotal = total + item.quantity * (Number(discountPrice(item.price, item.category)) * exchangeRate);
      return priceTotal;
    }, 0);
  };

  const goToCheckout = () => {
    if (user) router.push('/checkout');
    else {
      alert('Please sign in to continue.');
    };
  };


  useEffect(() => {
    const getCartProducts = async () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
    const countryDetails: any = sessionStorage.getItem('countryDetails');
    const { currency_symbol, exchange_rate, continent } = JSON.parse(countryDetails);
    setCurrencySymbol(currency_symbol);
    setExchangeRate(exchange_rate);
    setContinent(continent);
    getCartProducts();
  }, [user]);

  return (
    <div className="Cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={4}>Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.image} alt={item.title} /></td>
                <td className='capitalize'>{item.title}</td>
                <td>{item.quantity}</td>
                <td>
                  {user ? (
                    `${currencySymbol} ${formatPrice(Number(discountPrice(item.price, item.category)) * exchangeRate)}`
                  ) : (
                    item.price
                  )
                  }</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Total</td>
            <td>{currencySymbol} {formatPrice(getTotalPrice())}</td>
          </tr>
        </tfoot>
      </table>
      <button onClick={goToCheckout} disabled={cartItems.length === 0}>Go to Checkout</button>
    </div>
  );
};

export default Cart;