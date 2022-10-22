import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';
import { IMovie } from '../../interfaces';

describe('CardsList', () => {
  it('renders CardsList component', () => {
    const movies:IMovie[] = [];
    render(<CardsList movies={movies} isLoading={true}/>);
    expect(screen.getByTestId('cars-list')).toBeInTheDocument();
  });
});
