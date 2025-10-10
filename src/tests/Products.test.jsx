import { render, screen, waitFor } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

let valueHolder = null;

const tester = [
  { id: 0, image: null, title: 'a', price: '111' },
  { id: 1, image: null, title: 'b', price: '222' },
];
const fetchs = vi.fn((setter) => setTimeout(() => setter(tester), 150));

beforeEach(() => {
  render(<Products fetchs={fetchs} />);
});

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => ({
    addCartData: function (id, title, image, price, amount) {
      valueHolder = [id, title, image, price, amount];
    },
    cartData: [{ itemID: 0, itemTitle: 'a', itemImage: null, itemPrice: '111', itemAmount: 1 }],
    modifyCartData: function (indexed, itemModified) {
      valueHolder = [indexed, itemModified];
    },
  }),
}));

describe('Product page loads properly', () => {
  it('The fetch function will be called upon render', () => {
    expect(fetchs).toBeCalled();
  });

  it('Page show a loading screen while waiting for data', async () => {
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Loading.....');
  });

  it('Page will load the product card after fetching with fetched data', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
    });

    expect(screen.getByText('a')).toBeDefined();
    expect(screen.getByText('$111')).toBeDefined();
    expect(screen.getByAltText('a')).toBeDefined();
  });
});

describe('Buttons on page work as intended', () => {
  beforeEach(async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
    });
  });

  it('Pressing - & + buttons will decrement and increment amount of products', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[0];
    const subtract = screen.getAllByRole('button', { name: '-' })[0];

    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('0');

    await user.click(add);

    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('1');

    await user.click(subtract);

    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('0');
  });

  it('Pressing add to cart with productAmount at 0 will not trigger the rest of the function', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[0];
    const addToCart = screen.getAllByRole('button', { name: 'ADD TO CART' })[0];

    await user.click(addToCart);

    expect(valueHolder).toEqual(null);
  });

  it('Pressing add to cart with productAmount at 1 will call addCartData with correct the parameters and set amount to 0', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[1];
    const addToCart = screen.getAllByRole('button', { name: 'ADD TO CART' })[1];

    await user.click(add);
    await user.click(addToCart);

    expect(valueHolder).toEqual([1, 'b', null, '222', 1]);
    expect(screen.getAllByRole('itemAmount')[1].textContent).toEqual('0');
  });

  it('Pressing add to cart with productAmount at 1 and with the same product already in cart will call modifyCartData with correct the parameters', async () => {
    const user = userEvent.setup();
    const add = screen.getAllByRole('button', { name: '+' })[0];
    const addToCart = screen.getAllByRole('button', { name: 'ADD TO CART' })[0];

    await user.click(add);
    await user.click(addToCart);

    expect(valueHolder[0]).toEqual(0);
    expect(valueHolder[1]).toEqual({
      itemID: 0,
      itemTitle: 'a',
      itemImage: null,
      itemPrice: '111',
      itemAmount: 2,
    });
  });
});
