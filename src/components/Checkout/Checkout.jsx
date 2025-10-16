import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './Checkout.module.css';

function CheckoutBtn({ totalPrice, setTotalPrice, itemAmount, itemPrice }) {
  const [productAmount, setProductAmount] = useState(itemAmount);
  let price = totalPrice;

  const addClick = () => {
    const newAmount = productAmount + 1;

    setProductAmount(newAmount);
    price += itemPrice;
    setTotalPrice(price);
  };

  const subtractClick = () => {
    if (productAmount === 0) return;

    const newAmount = productAmount - 1;

    setProductAmount(newAmount);
    price -= itemPrice;
    setTotalPrice(price);
  };

  return (
    <>
      <div className={styles.amountContainer}>
        <button className={styles.subtract} onClick={subtractClick}>
          -
        </button>
        <div className={styles.productNum} role="itemAmount">
          {productAmount}
        </div>
        <button className={styles.add} onClick={addClick}>
          +
        </button>
      </div>
    </>
  );
}

function Checkout() {
  const { cartData } = useOutletContext();
  let totalStorage = 0;

  if (!cartData) {
    return <p className={styles.empty}>Cart is empty!</p>;
  }

  cartData.map((item) => {
    totalStorage += item.itemPrice * item.itemAmount;
  });

  const [totalPrice, setTotalPrice] = useState(totalStorage);

  return (
    <>
      <div>Checkout</div>
      <div className={styles.cartList}>
        {cartData.map((item) => {
          return (
            <div className={styles.cartItemCard} key={item.itemID} role="itemID">
              <div className={styles.itemImageContainer}>
                <img className={styles.itemImage} src={item.itemImage} alt="" role="itemImage" />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle} role="itemTitle">
                  {item.itemTitle}
                </div>
                <div className={styles.itemPrice} role="itemPrice">
                  <div>${item.itemPrice}</div>
                </div>
                <div className={styles.btnContainer} role="btnContainer">
                  <CheckoutBtn
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    itemAmount={item.itemAmount}
                    itemPrice={item.itemPrice}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.totalPrice} role="totalPrice">
        {totalPrice}
      </div>
    </>
  );
}

export { Checkout };
