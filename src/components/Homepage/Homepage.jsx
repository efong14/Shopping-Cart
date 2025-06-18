import { useState } from 'react';
import styles from './Homepage.module.css';
import homepageItems from '../Database';

function Homepage() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div>
          <h1>THE STORE</h1>
          <h2>The one stop shop for all your needs</h2>
        </div>
        <ul>
          {homepageItems.map((item) => (
            <li key={item.id}>
              <img src={item.img} alt="" />
              {item.category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Homepage;
