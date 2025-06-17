import { useState } from 'react';
import styles from './Homepage.module.css';
import homepageItems from '../Database';

function Homepage() {
  return (
    <>
      <h1>The Store</h1>
      <h2>The one stop shop for all your needs</h2>
      <div className="listContainer">
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
