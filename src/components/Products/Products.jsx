import styles from './Products.module.css';
import { useEffect, useState } from 'react';
// Stick buttons to bottom of card?

const fetcher = (setter) => {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => setter(products));
};

function Buttons() {
  const [productAmount, setProductAmount] = useState(0);

  const addClick = () => {
    setProductAmount(productAmount + 1);
  };
  const subtractClick = () => {
    if (productAmount === 0) return;
    setProductAmount(productAmount - 1);
  };

  return (
    <>
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
    </>
  );
}

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
                    <Buttons />
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
