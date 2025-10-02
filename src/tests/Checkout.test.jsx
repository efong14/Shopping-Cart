import routes from '../routes';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Cant use memory router as Products page NEEDS fetch to be mocked, with memory router fetch actually fetches. Mock cartData and change that per test to check if it outputs correctly.

// Change addtoCart related functions to be testable agnositally? Its easy just make it take setCartData as a parameter

// Test cart + Memory router here as we mock outlet context in the the other file + this is where it actually affects the page?

describe('Product page loads and buttons work', () => {
  it('Page show a loading screen while waiting for data', async () => {
    const user = userEvent.setup();
    const productLink = screen.getByRole('link', { name: 'Products' });

    await user.click(productLink);
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Cart is empty!');
  });
});
