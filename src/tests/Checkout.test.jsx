import Checkout from '../components/Checkout/Checkout';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

// finish the checkout calculation breakdown of items

let tester = null;

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => ({
    addCartData: null,
    cartData: tester,
    modifyCartData: null,
  }),
}));

describe('Product page loads and buttons work', () => {
  it('Page show a loading screen while waiting for data', async () => {
    render(<Checkout />);
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Cart is empty!');
  });
});
