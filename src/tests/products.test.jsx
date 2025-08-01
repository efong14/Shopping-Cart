import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { beforeEach, describe, expect, it } from 'vitest';
import { Buttons } from '@testing-library/user-event/dist/cjs/system/pointer/buttons.js';

const tester = [{ id: 0, image: null, title: 'a', price: '111' }];
const fetchs = vi.fn((setter) => setTimeout(() => setter(tester), 150));

describe('Product page loads and buttons work', () => {
  it('The fetch function will be called upon reder', () => {
    render(<Products fetchs={fetchs} />);
    expect(fetchs).toBeCalled();
  });

  it('Page show a loading screen while waiting for data', async () => {
    render(<Products fetchs={fetchs} />);
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch('Loading!');
  });

  it('Page will load the product cards after fetching data', async () => {
    render(<Products fetchs={fetchs} />);

    await waitFor(() => {
      expect(screen.getAllByRole('button')[0].textContent).toMatch('-');
    });
  });
});
