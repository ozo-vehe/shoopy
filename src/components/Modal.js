import React from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({ closeModal }) => {
  const router = useRouter();

  const goToCart = () => {
    closeModal();
    router.push('/cart');
  };

  return (
    <div className="ModalOverlay">
      <div className="Modal">
        <p>Item successfully added to cart!</p>
        <button onClick={goToCart}>Go to Cart</button>
        <button onClick={closeModal}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Modal;