import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// LOADING SCREEN FOR PRODUCT PAGE
// IMPORTATT!!!

export default function Navbar() {
  const [counter, setCounter] = useState(0);
  function addCount() {
    setCounter(counter + 1);
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
      <Outlet context={{ addCount, counter }} />
    </>
  );
}
