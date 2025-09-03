import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Checkout() {
  const { cartData } = useOutletContext();
  if (!cartData) {
    return <div>Cart is empty!</div>;
  }

  return (
    <>
      <div>Checkout</div>
      <div>{cartData[cartData.length - 1].itemName}</div>
    </>
  );
}
