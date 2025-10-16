import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiShoppingOutline } from '@mdi/js';

function addCartData(
  itemID,
  itemTitle,
  itemImage,
  itemPrice,
  itemAmount,
  cartData,
  setCartData,
  itemCounter,
  setItemCounter
) {
  if (!cartData) {
    setCartData([{ itemID, itemTitle, itemImage, itemPrice, itemAmount }]);
    setItemCounter(1);
    return;
  }

  const newItem = cartData;
  const newItemCounter = itemCounter + 1;

  newItem.push({ itemID, itemTitle, itemImage, itemPrice, itemAmount });

  setCartData(newItem);
  setItemCounter(newItemCounter);
}

function modifyCartData(index, modified, cartData, setCartData) {
  const cartModified = cartData.toSpliced(index, 1, modified);

  setCartData(cartModified);
}

function removeFromCartData(index, cartData, setCartData) {
  const cartModified = cartData.toSpliced(index, 1);

  setCartData(cartModified);
}

function Navbar() {
  const [cartData, setCartData] = useState(null);
  const [itemCounter, setItemCounter] = useState(0);

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
        <div className={styles.rightSide}>
          <Link to="/nav/checkout" className={styles.checkout}>
            <Icon path={mdiShoppingOutline} size={2} />
          </Link>
          {itemCounter > 0 && (
            <div className={styles.itemCounter} role="itemCounter">
              {itemCounter}
            </div>
          )}
        </div>
      </div>
      <Outlet
        context={{
          addCartData,
          modifyCartData,
          removeFromCartData,
          cartData,
          setCartData,
          itemCounter,
          setItemCounter,
        }}
      />
    </>
  );
}
export { Navbar, addCartData, modifyCartData, removeFromCartData };
