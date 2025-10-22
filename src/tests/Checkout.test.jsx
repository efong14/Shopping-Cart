import { Checkout } from '../components/Checkout/Checkout';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

let tester = null;
let modified = null;

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => ({
    cartData: tester,
    setCartData: null,
    modifyCartData: function test(indexed, item) {
      modified = [indexed, item.itemAmount];
    },
    removeFromCartData: function none() {
      modified = 0;
    },
  }),
}));

describe('Page load on null cartData', () => {
  it('Page show a loading screen while waiting for data', async () => {
    render(<Checkout />);
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Cart is empty!');
  });
});

describe('Product page loads when cartData exists and buttons work', () => {
  beforeEach(() => {
    tester = [
      { itemID: 0, itemImage: null, itemTitle: 'a', itemPrice: 1, itemAmount: 1 },
      { itemID: 1, itemImage: null, itemTitle: 'b', itemPrice: 1, itemAmount: 2 },
    ];
    render(<Checkout />);
  });
  it('Page displays product card if cartData is not null and loads correct data', () => {
    expect(screen.getAllByRole('itemTitle')[0].textContent).toEqual('a');
    expect(screen.getAllByRole('itemPrice')[0].textContent).toEqual('$1');
    expect(screen.getAllByRole('itemAmount')[0].textContent).toEqual('1');
    expect(screen.getByRole('totalPrice').textContent).toEqual('$3.00');
  });

  it('Clicking add will increase item amount and totalPrice by 1 instance', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[0];

    await user.click(add);
    expect(screen.getAllByRole('itemAmount')[0].textContent).toEqual('2');
    expect(screen.getByRole('totalPrice').textContent).toEqual('$4.00');
    expect(modified).toEqual([0, 2]);
  });

  it('Clicking subtract will decrease item amount and totalPrice by 1 instance', async () => {
    const user = userEvent.setup();
    const subtract = screen.getAllByRole('button', { name: '-' })[1];

    await user.click(subtract);
    expect(screen.getAllByRole('itemAmount')[1].textContent).toEqual('1');
    expect(screen.getByRole('totalPrice').textContent).toEqual('$2.00');
    expect(modified).toEqual([1, 1]);
  });

  it('Clicking subtract with productAmount at 1 will call removeFromCartData function', async () => {
    const user = userEvent.setup();
    const subtract = screen.getAllByRole('button', { name: '-' })[1];

    await user.click(subtract);
    await user.click(subtract);
    expect(modified).toEqual(0);
  });
});
