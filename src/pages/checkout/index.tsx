import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { useAuthentication } from 'src/lib/hooks/use-authentication';

const Checkout = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();
  const {user} = useAuthentication();
  const [userData, setUserData] = useState(user || undefined);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    router.push('/');
  };

  const clearCart = () => localStorage.removeItem('cart');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmationModal(true)
    clearCart();
  };

  useEffect(() => {
    if(user) setUserData(user);
  }, [user])

  return (
    <div className="CheckoutContainer">
      <div className="Checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            id="lastName"
            value={userData?.familyName} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="phone">Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            id="phone"
            value={userData?.phoneNumber} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            name="address" 
            id="address"
            value={userData?.streetAddress} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input 
            type="text" 
            name="postalCode" 
            id="postalCode"
            value={userData?.postalCode} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="city">City</label>
          <input 
            type="text" 
            name="city" 
            id="city"
            value={userData?.locality} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="country">Country</label>
          <input 
            type="text" 
            name="country" 
            id="country"
            value={userData?.country} 
            onChange={handleChange} 
            required 
          />

          <button type="submit" className="ContinueButton">Submit Order</button>
        </form>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal closeModal={closeConfirmationModal} />
      )}
    </div>
  );
};

export default Checkout;