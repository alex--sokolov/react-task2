import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';

describe('CardsList', () => {
  it('renders CardsList component', () => {
    render(<CardsList />);
    expect(screen.getByTestId('cars-list')).toBeInTheDocument();
  });
});
