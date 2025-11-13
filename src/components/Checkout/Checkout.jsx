import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import styles from './Checkout.module.css';

function CheckoutBtn({
  totalPrice,
  setTotalPrice,
  item,
  cartData,
  setCartData,
  modifyCartData,
  removeFromCartData,
  itemCounter,
  setItemCounter,
}) {
  const [productAmount, setProductAmount] = useState(item.itemAmount);
  const indexed = cartData.findIndex((cartItem) => cartItem.itemID === item.itemID);
  const itemOriginal = cartData[indexed];

  let price = Number(totalPrice);

  const addClick = () => {
    const itemAdd = { ...itemOriginal, itemAmount: itemOriginal.itemAmount + 1 };
    const newAmount = productAmount + 1;

    modifyCartData(indexed, itemAdd, cartData, setCartData);
    setProductAmount(newAmount);
    price += item.itemPrice;
    setTotalPrice(price.toFixed(2));
  };

  const subtractClick = () => {
    price -= item.itemPrice;
    setTotalPrice(price.toFixed(2));

    if (productAmount === 1) {
      removeFromCartData(indexed, cartData, setCartData, itemCounter, setItemCounter);
      return;
    }

    const itemSubtract = { ...itemOriginal, itemAmount: itemOriginal.itemAmount - 1 };
    const newAmount = productAmount - 1;

    modifyCartData(indexed, itemSubtract, cartData, setCartData);
    setProductAmount(newAmount);
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
  const { cartData, setCartData, modifyCartData, removeFromCartData, itemCounter, setItemCounter } =
    useOutletContext();

  if (!cartData) {
    return <p className={styles.empty}>Cart is empty!</p>;
  }

  let totalStorage = 0;

  cartData.map((item) => {
    totalStorage += item.itemPrice * item.itemAmount;
  });

  const [totalPrice, setTotalPrice] = useState(totalStorage.toFixed(2));

  if (totalPrice === '0.00') {
    return <p className={styles.empty}>Cart is empty!</p>;
  }

  return (
    <>
      <ScrollRestoration />
      <div className={styles.cartWrapper}>
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
                  <div className={styles.numberContainer}>
                    <div className={styles.itemPrice} role="itemPrice">
                      ${Number(item.itemPrice).toFixed(2)}
                    </div>
                    <div className={styles.btnContainer} role="btnContainer">
                      <CheckoutBtn
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                        item={item}
                        cartData={cartData}
                        setCartData={setCartData}
                        modifyCartData={modifyCartData}
                        removeFromCartData={removeFromCartData}
                        itemCounter={itemCounter}
                        setItemCounter={setItemCounter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.priceWrapper}>
          <div className={styles.summary}>Summary</div>
          <div className={styles.itemsTotalWrapper}>
            <div className={styles.itemsTotalHeader}>Item Subtotal:</div>
            <div className={styles.itemsTotal}>${totalPrice}</div>
          </div>
          <div className={styles.taxTotalWrapper}>
            <div className={styles.taxTotalHeader}>Taxes:</div>
            <div className={styles.taxTotal}>$0.00</div>
          </div>
          <div className={styles.shippingTotalWrapper}>
            <div className={styles.shippingTotalHeader}>Shipping:</div>
            <div className={styles.shippingTotal}>$0.00</div>
          </div>
          <div className={styles.finalTotalWrapper}>
            <div className={styles.finalTotalHeader}>Total:</div>
            <div className={styles.totalPrice} role="totalPrice">
              ${totalPrice}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Checkout };
