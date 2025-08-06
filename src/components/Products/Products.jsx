import styles from './Products.module.css';
import { useEffect, useState } from 'react';
// Try moving the buttons into another component in this file only, so that state is individual per card OR make a factory funtion?

const fetcher = (setter) => {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => setter(products));
};

function Products({ fetchs }) {
  const [productList, setProductList] = useState(null);
  const [productAmount, setProductAmount] = useState(0);

  const addClick = () => {
    setProductAmount(productAmount + 1);
  };
  const subtractClick = () => {
    setProductAmount(productAmount - 1);
  };

  useEffect(() => {
    fetchs(setProductList);
  }, []);

  if (!productList) {
    return <p> Loading!</p>;
  }
  return (
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
                      <button className={styles.subtract} onClick={subtractClick}>
                        -
                      </button>
                      <div className={styles.productNum} role="amount">
                        {productAmount}
                      </div>
                      <button className={styles.add} onClick={addClick}>
                        +
                      </button>
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
  );
}

export { Products, fetcher };
