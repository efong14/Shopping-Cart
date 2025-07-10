import styles from './Products.module.css';
import { useEffect, useState } from 'react';

export default function Products() {
  const [productList, setProductList] = useState(null);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((products) => setProductList(products));
  }, []);
  return (
    productList && (
      <>
        <div className={styles.productWrapper}>
          <ul className={styles.productList}>
            {productList.map((item) => {
              return (
                <div className={styles.productCard} key={item.id}>
                  <img className={styles.productImg} src={item.image} alt={item.title} />
                  <div className={styles.infoBox}>
                    <div className={styles.textBox}>
                      <div className={styles.productName}> {item.title} </div>
                      <div className={styles.productPrice}> ${item.price} </div>
                    </div>
                    <div className={styles.productBtnContainer}>
                      <div className={styles.amountContainer}>
                        <button className={styles.subtract}>-</button>
                        <div className={styles.productNum}>0</div>
                        <button className={styles.add}>+</button>
                      </div>
                      <button className={styles.addCart}>ADD TO CART</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </>
    )
  );
}
