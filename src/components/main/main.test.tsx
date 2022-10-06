import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './main';

describe('MainPage', () => {
  it('renders MainPage component', () => {
    render(<MainPage />);
    expect(screen.getByText(/MainPage/i)).toBeInTheDocument();
  });
});
