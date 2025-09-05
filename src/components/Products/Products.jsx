import { useOutletContext } from 'react-router-dom';
import styles from './Products.module.css';
import { useEffect, useState } from 'react';

const fetcher = (setter) => {
  fetch('https://fakestoreapi.com/products', { mode: 'cors' })
    .then((response) => response.json())
    .then((products) => setter(products))
    .catch((error) => console.log(error));
};

function Buttons({ addCartData, itemData }) {
  const [productAmount, setProductAmount] = useState(0);

  const addClick = () => {
    const newAmount = productAmount + 1;
    setProductAmount(newAmount);
  };
  const subtractClick = () => {
    if (productAmount === 0) return;
    const newAmount = productAmount - 1;
    setProductAmount(newAmount);
  };
  const addCartClick = () => {
    if (productAmount === 0) return;
    addCartData(itemData.id, itemData.title, itemData.image, itemData.price, productAmount);
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
      <button className={styles.addCart} onClick={addCartClick}>
        ADD TO CART
      </button>
    </>
  );
}

function Products({ fetchs }) {
  const [productList, setProductList] = useState(null);
  const { addCartData } = useOutletContext();

  function capitalize(x) {
    return String(x).charAt(0).toUpperCase() + String(x).slice(1);
  }

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
                  <div className={styles.wordBox}>
                    <div className={styles.productName}> {item.title} </div>
                    <div className={styles.productCategory}> {capitalize(item.category)} </div>
                  </div>
                  <div className={styles.numBox}>
                    <div className={styles.productPrice}> ${item.price} </div>
                    <div className={styles.productBtnContainer}>
                      <Buttons addCartData={addCartData} itemData={item} />
                    </div>
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
