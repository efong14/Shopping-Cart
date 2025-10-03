import { render, screen } from '@testing-library/react';
import Homepage from '../components/Homepage/Homepage';
import { describe, expect, it } from 'vitest';
// add test to check snapshot?

describe('Homepage', () => {
  it('renders headline', () => {
    render(<Homepage />);

    expect(screen.getAllByRole('heading')[0].textContent).toMatch(/THE STORE/i);
  });
});
