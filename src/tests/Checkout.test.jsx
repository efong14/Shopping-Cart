import { Checkout } from '../components/Checkout/Checkout';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { removeFromCartData } from '../components/Navbar/Navbar';

// Setup test for remoeFromCartData setup test for removeFromCartData in navbar

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
    removeFromCartData: null,
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
      { itemID: 0, itemImage: null, itemTitle: 'a', itemPrice: 111, itemAmount: 1 },
      { itemID: 1, itemImage: null, itemTitle: 'b', itemPrice: 222, itemAmount: 2 },
    ];
    render(<Checkout />);
  });
  it('Page displays product card if cartData is not null and loads correct data', () => {
    expect(screen.getByText('a')).toBeDefined();
    expect(screen.getByText('$111')).toBeDefined();
    expect(screen.getByText(1)).toBeDefined();
  });
  it('Add and subtract buttons affect itemAmount and totalPrice appropriately and sends correct data to modifyCartData', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[0];
    const subtract = screen.getAllByRole('button', { name: '-' })[0];

    expect(screen.getAllByRole('itemAmount')[0].textContent).toEqual('1');
    expect(screen.getByRole('totalPrice').textContent).toEqual('555.00');
    await user.click(add);
    expect(screen.getAllByRole('itemAmount')[0].textContent).toEqual('2');
    expect(screen.getByRole('totalPrice').textContent).toEqual('666.00');
    expect(modified).toEqual([0, 2]);
    await user.click(subtract);
    expect(screen.getAllByRole('itemAmount')[0].textContent).toEqual('1');
    expect(screen.getByRole('totalPrice').textContent).toEqual('555.00');
    expect(modified).toEqual([0, 0]);
  });
});
