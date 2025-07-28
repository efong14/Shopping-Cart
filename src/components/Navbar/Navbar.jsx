import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Navbar() {
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
      <Outlet />
    </>
  );
}
