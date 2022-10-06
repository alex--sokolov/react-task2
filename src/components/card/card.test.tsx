import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './card';

describe('Card', () => {
  it('renders Card component', () => {
    render(<Card />);
    expect(screen.getAllByTestId('card-title')[0] as HTMLElement).toBeInTheDocument();
    expect(screen.getAllByTestId('card-img')[0] as HTMLImageElement).toBeInTheDocument();
    expect(screen.getAllByTestId('card-tagline')[0] as HTMLElement).toBeInTheDocument();
  });
});
