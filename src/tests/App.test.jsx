import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByRole('heading').textContent).toMatch(/test/i);
  });
});
