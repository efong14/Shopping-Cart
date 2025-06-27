import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <div className={styles.navBar}>
        <Link to="/" className={styles.navButton}>
          Home
        </Link>
        <Link to="/nav/products" className={styles.navButton}>
          Products
        </Link>
        <Link to="/nav/checkout" className={styles.navButton}>
          Checkout
        </Link>
      </div>
      <Outlet />
    </>
  );
}
