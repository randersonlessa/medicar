import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Medicar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Medicar/i);
  expect(linkElement).toBeInTheDocument();
});
