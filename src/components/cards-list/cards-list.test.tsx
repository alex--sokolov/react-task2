import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsList from './cards-list';
import { IFetchError, IMovie } from '../../interfaces';

describe('CardsList', () => {

  it('renders CardsList component with empty movies', () => {
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
    expect(screen.getByTestId('cards-list')).toBeInTheDocument();
  });

  it('renders CardsList component with non-empty movies', () => {
    const movies: IMovie[] = [
      {
        academyAwardNominations: 1,
        academyAwardWins: 2,
        boxOfficeRevenueInMillions: 3,
        budgetInMillions: 4,
        name: 'Superfilm',
        rottenTomatoesScore: 5,
        runtimeInMinutes: 42,
        _id: '555',
      },
    ];
    const toggleOverlay = jest.fn();
    render(
      <CardsList
        movies={movies}
        isLoading={false}
        fetchError={null}
        isShowError={false}
        toggleOverlay={toggleOverlay}
        modalOpened={null}
        isModalClosing={false}
      />
    );
    expect(screen.getByText('Movie-list from "The Lord of the Rings" API')).toBeInTheDocument();
    expect(screen.getByText('Superfilm -')).toBeInTheDocument();
  });

  it('renders CardsList component with error', () => {
    const movies: IMovie[] = [];
    const fetchError: IFetchError | null = {
      errorCode: 404,
      errorMessage: 'Not Found',
    };
    const toggleOverlay = jest.fn();
    render(
      <CardsList
        movies={movies}
        isLoading={false}
        fetchError={fetchError}
        isShowError={true}
        toggleOverlay={toggleOverlay}
        modalOpened={null}
        isModalClosing={false}
      />
    );
    expect(screen.getByTestId('notify')).toBeInTheDocument();
    expect(screen.getByTestId('notify')).toHaveClass('show');
    expect(screen.getByText('404 | Not Found')).toBeInTheDocument();
  });
});
