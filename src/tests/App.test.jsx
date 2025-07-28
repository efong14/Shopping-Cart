import { render, screen } from '@testing-library/react';
import App from '../components/Homepage/Homepage';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getAllByRole('heading')[0].textContent).toMatch(/THE STORE/i);
  });
});
