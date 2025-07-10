import { useState } from 'react';
import styles from './Homepage.module.css';
import clean from '../../img/clean.jpg';
import garden from '../../img/garden.jpg';
import tools from '../../img/tools.jpg';
import can from '../../img/can.jpg';
import fresh from '../../img/fresh.jpg';
import meat from '../../img/meat.jpg';

const homepageItems = [
  { id: 0, category: 'Cleaning', img: clean },
  { id: 1, category: 'Gardening', img: garden },
  { id: 2, category: 'Home Improvement', img: tools },
  { id: 3, category: 'Canned Goods', img: can },
  { id: 4, category: 'Fresh Produce', img: fresh },
  { id: 5, category: 'Raw Meats', img: meat },
];

function Homepage() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.store}>THE STORE</h1>
          <h2 className={styles.h2}>The one stop shop for all your needs</h2>
        </div>
        <ul className={styles.ul}>
          {homepageItems.map((item) => (
            <li className={styles.li} key={item.id}>
              <img className={styles.img} src={item.img} alt="" />
              {item.category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Homepage;
