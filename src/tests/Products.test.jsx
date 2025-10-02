import { render, screen, waitFor } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

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
    addCartData: null,
    cartData: null,
    modifyCartData: null,
  }),
}));

describe('Product page loads and buttons work', () => {
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

  it('Pressing - & + buttons will decrement and increment amount of products', async () => {
    const user = userEvent.setup();
    await waitFor(() => {
      expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
    });
    const add = screen.getAllByRole('button', { name: '+' })[0];
    const subtract = screen.getAllByRole('button', { name: '-' })[0];
    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('0');
    await user.click(add);
    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('1');
    await user.click(subtract);
    expect(screen.getAllByRole('itemAmount')[0].textContent).toMatch('0');
  });
});
