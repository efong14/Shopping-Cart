import { describe, expect, it } from 'vitest';
import { addCartData, modifyCartData, removeFromCartData } from '../components/Navbar/Navbar';

let cartData = null;
let itemCounter = 0;

function setCartData(items) {
  cartData = items;
}

function setItemCounter() {
  itemCounter += 1;
}

describe('addCartData function works as intended', () => {
  it('Creates a new array with an object within cartData if it is empty and sets itemCounter to 1', () => {
    addCartData(0, 'a', null, '111', 1, cartData, setCartData, itemCounter, setItemCounter);

    expect(cartData[0]).toEqual({
      itemID: 0,
      itemTitle: 'a',
      itemImage: null,
      itemPrice: '111',
      itemAmount: 1,
    });
    expect(itemCounter).toEqual(1);
  });

  it('Adds new object to cartData if cartData is not empty', () => {
    cartData = [1];
    itemCounter = 1;

    addCartData(0, 'a', null, '111', 1, cartData, setCartData, itemCounter, setItemCounter);

    expect(cartData[1]).toEqual({
      itemID: 0,
      itemTitle: 'a',
      itemImage: null,
      itemPrice: '111',
      itemAmount: 1,
    });
  });
});

describe('Functions modify existing cartData', () => {
  it('Modifies an existing entry in cartData', () => {
    cartData = [{ id: 0, image: null, title: 'a', price: '111', amount: 1 }];

    modifyCartData(
      0,
      {
        itemID: 0,
        itemTitle: 'a',
        itemImage: null,
        itemPrice: '111',
        itemAmount: 2,
      },
      cartData,
      setCartData
    );

    expect(cartData[0]).toEqual({
      itemID: 0,
      itemTitle: 'a',
      itemImage: null,
      itemPrice: '111',
      itemAmount: 2,
    });
  });
  it('removeFromCartData removes item from cartData', () => {
    cartData = [1, 2];
    removeFromCartData(0, cartData, setCartData);
    expect(cartData[0]).toEqual(2);
  });
});
