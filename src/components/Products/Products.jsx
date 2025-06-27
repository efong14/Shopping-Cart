import styles from './Products.module.css';
import { tester } from '../Database';

export default function Products() {
  return (
    <>
      <ul>
        {tester.map((item) => {
          return (
            <div className={styles.productCard} key={item.id}>
              <div className={styles.productName}> {item.name} </div>
              <img className={styles.productImg} src="" alt={item.img} />
              <div className={styles.productPrice}> {item.price} </div>
              <div className={styles.productBtnContainer}>
                <button className={styles.subtract}>-</button>
                <div className={styles.productNum}>1</div>
                <button className={styles.add}>+</button>
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
