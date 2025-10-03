import Checkout from '../components/Checkout/Checkout';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import userEvent from '@testing-library/user-event';

// Cant use memory router as Products page NEEDS fetch to be mocked, with memory router fetch actually fetches. Mock cartData and change that per test to check if it outputs correctly.
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
