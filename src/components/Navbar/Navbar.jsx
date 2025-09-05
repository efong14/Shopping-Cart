import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// LOADING SCREEN FOR PRODUCT PAGE
// figure out how to use cartdata as a prop with context.
// IMPORTATT!!!

export default function Navbar() {
  const [cartData, setCartData] = useState(null);
  function addCartData(itemID, itemTitle, itemImage, itemPrice, itemDesc, itemAmount) {
    if (!cartData) {
      setCartData([{ itemID, itemTitle, itemImage, itemPrice, itemDesc, itemAmount }]);
      return;
    }
    const newItem = cartData;
    newItem.push({ itemID, itemTitle, itemImage, itemPrice, itemDesc, itemAmount });
    setCartData(newItem);
  }
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.home}>
            Home
          </Link>
          <Link to="/nav/products" className={styles.products}>
            Products
          </Link>
        </div>
        <Link to="/nav/checkout" className={styles.checkout}>
          Checkout
        </Link>
      </div>
      <Outlet context={{ addCartData, cartData }} />
    </>
  );
}
