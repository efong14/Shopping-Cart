import { describe, expect, it } from 'vitest';
import { addCartData, modifyCartData } from '../components/Navbar/Navbar';

describe('addCartData function works as intended', () => {
  it('Creates a new array with an object within cartData if it is empty and sets itemCounter to 1', () => {
    let cartData = null;
    let itemCounter = 0;

    function setCartData(items) {
      cartData = items;
    }

    function setItemCounter() {
      itemCounter = 1;
    }

    addCartData(0, 'a', null, '111', 1, cartData, setCartData, itemCounter, setItemCounter);

    expect(cartData[0]).toEqual({
      itemID: 0,
      itemTitle: 'a',
      itemImage: null,
      itemPrice: '111',
      itemAmount: 1,
    });
  });

  it('Adds new object to cartData if cartData is not empty', () => {
    let cartData = [1];
    let itemCounter = 1;

    function setCartData() {
      null;
    }

    function setItemCounter() {
      itemCounter += 1;
    }

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

describe('modifyCartData function works as intended', () => {
  it('Modifies an existing entry in cartData', () => {
    let cartData = [{ id: 0, image: null, title: 'a', price: '111', amount: 1 }];
    function setCartData(items) {
      cartData = items;
    }

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
});
