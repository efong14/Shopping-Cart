import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { beforeEach, describe, expect, it } from 'vitest';
import { Buttons } from '@testing-library/user-event/dist/cjs/system/pointer/buttons.js';
// Try mocking the fetch?? Look at link in notes

const tester = [{ id: 0, image: null, title: 'a', price: '111' }];

describe('Product page loads and buttons work', () => {
  it('Page will load after fetch', () => {
    const fetchs = vi.fn();
    render(<Products dState={tester} fetchs={fetchs} />);
    expect(fetchs).toHaveBeenCalled();
    //   waitFor(() => {
    //     expect(screen.getByRole('button')).toMatch('0');
    //   });
    //   expect(screen.findByRole('j')).toBeDefined();
  });
});
