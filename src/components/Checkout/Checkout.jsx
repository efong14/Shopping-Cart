import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Checkout() {
  const { cartData } = useOutletContext();
  if (!cartData) {
    return <p>Cart is empty!</p>;
  }

  return (
    <>
      <div>Checkout</div>
      <div role="itemTitle">{cartData[cartData.length - 1].itemTitle}</div>
    </>
  );
}
