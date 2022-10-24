import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';
import { IMovie } from '../../interfaces';

describe('CardsList', () => {
  it('renders CardsList component', () => {
    const movies: IMovie[] = [];
    const toggleOverlay = jest.fn();
    render(
      <CardsList
        movies={movies}
        isLoading={true}
        fetchError={null}
        isShowError={false}
        toggleOverlay={toggleOverlay}
        modalOpened={null}
        isModalClosing={false}
      />
    );
    expect(screen.getByTestId('cars-list')).toBeInTheDocument();
  });
});
