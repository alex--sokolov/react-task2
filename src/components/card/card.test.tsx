import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './card';
import userEvent from '@testing-library/user-event/dist';
import { act } from 'react-dom/test-utils';
import { IMovie } from '../../interfaces';

describe('Card', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  it('renders Card component', async () => {
    const movie: IMovie = {
      academyAwardNominations: 30,
      academyAwardWins: 17,
      boxOfficeRevenueInMillions: 2917,
      budgetInMillions: 281,
      name: 'The Lord of the Rings Series',
      rottenTomatoesScore: 94,
      runtimeInMinutes: 558,
      _id: '5cd95395de30eff6ebccde56',
    };

    const toggleOverlay = jest.fn();

    render(
      <Card
        movie={movie}
        toggleOverlay={toggleOverlay}
        modalOpened={movie._id}
        isModalClosing={false}
      />
    );

    expect(screen.getByTestId('popup-id-5cd95395de30eff6ebccde56')).toBeInTheDocument();
    expect(screen.getByText('2917')).toBeInTheDocument();
    userEvent.click(screen.getByText('download'));
    expect(screen.getByTestId('downloadProgress')).toHaveStyle({ display: 'block' });
    expect(screen.getByText('downloading...')).toHaveStyle({ display: 'block' });
    expect(screen.getByText('downloaded')).toHaveStyle({ display: 'none' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });
    expect(screen.getByText('downloading...')).toHaveStyle({ display: 'none' });
    expect(screen.getByText('downloaded')).toHaveStyle({ display: 'block' });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 7000));
    });
    expect(screen.getByTestId('downloadProgress')).toHaveStyle({ display: 'none' });
  }, 15000);
});
