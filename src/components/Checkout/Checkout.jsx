import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './Checkout.module.css';
// Add buttons that manipulate amount like in product

export default function Checkout() {
  const { cartData } = useOutletContext();
  if (!cartData) {
    return <p className={styles.empty}>Cart is empty!</p>;
  }

  return (
    <>
      <div>Checkout</div>
      <div className={styles.cartList}>
        {cartData.map((item) => {
          return (
            <div className={styles.cartItemCard} key={item.itemID} role="itemID">
              <div className={styles.itemImage}>
                <img className={styles.itemImage} src={item.itemImage} alt="" role="itemImage" />
              </div>
              <div className={styles.itemTitle} role="itemTitle">
                {item.itemTitle}
              </div>
              <div className={styles.itemPrice} role="itemPrice">
                <div>Each</div>
                <div>{item.itemPrice}</div>
              </div>
              <div className={styles.itemAmount} role="itemAmount">
                Quantity: {item.itemAmount}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.totalPrice} role="totalPrice"></div>
    </>
  );
}
