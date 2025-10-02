import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function addCartData(itemID, itemTitle, itemImage, itemPrice, itemAmount, cartData, setCartData) {
  if (!cartData) {
    setCartData([{ itemID, itemTitle, itemImage, itemPrice, itemAmount }]);
    return;
  }

  const newItem = cartData;

  newItem.push({ itemID, itemTitle, itemImage, itemPrice, itemAmount });

  setCartData(newItem);
}

function modifyCartData(index, modified, cartData, setCartData) {
  const cartModified = cartData.toSpliced(index, 1, modified);

  setCartData(cartModified);
}

function Navbar() {
  const [cartData, setCartData] = useState(null);

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
      <Outlet context={{ addCartData, modifyCartData, cartData, setCartData }} />
    </>
  );
}
export { Navbar, addCartData, modifyCartData };
