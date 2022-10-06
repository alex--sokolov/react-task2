import React from 'react';
import { render, screen } from '@testing-library/react';
import Page404 from './page404';

describe('Page404', () => {
  it('renders Page404 component', () => {
    render(<Page404 />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
