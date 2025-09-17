import { render, screen, waitFor } from '@testing-library/react';
import Checkout from '../components/Checkout/Checkout';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

let test = null;

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => ({
    addCartData: null,
    cartData: test,
  }),
}));

afterEach(() => {
  test = [
    {
      itemId: 0,
      itemTitle: 'Test',
      itemImage: null,
      itemPrice: 0.0,
      itemDesc: 'None',
      itemAmount: 1,
    },
  ];
});

describe('Product page loads and buttons work', () => {
  it('Page show a loading screen while waiting for data', async () => {
    render(<Checkout />);
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Cart is empty!');
  });

  it('Page will load cart if it has items', async () => {
    render(<Checkout />);
    expect(screen.getAllByRole('itemTitle')[0].textContent).toMatch('Test');
  });

  //   it('Page will load the product card after fetching with fetched data', async () => {
  //     await waitFor(() => {
  //       expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
  //     });
  //     expect(screen.getByText('a')).toBeDefined();
  //     expect(screen.getByText('$111')).toBeDefined();
  //     expect(screen.getByAltText('a')).toBeDefined();
  //   });

  //   it('Pressing - & + buttons will decrement and increment amount of products', async () => {
  //     const user = userEvent.setup();
  //     await waitFor(() => {
  //       expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
  //     });
  //     const add = screen.getByRole('button', { name: '+' });
  //     const subtract = screen.getByRole('button', { name: '-' });
  //     expect(screen.getByRole('amount').textContent).toMatch('0');
  //     await user.click(add);
  //     expect(screen.getByRole('amount').textContent).toMatch('1');
  //     await user.click(subtract);
  //     expect(screen.getByRole('amount').textContent).toMatch('0');
  //   });
});
