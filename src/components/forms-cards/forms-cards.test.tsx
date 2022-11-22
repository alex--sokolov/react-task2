import React from 'react';
import { render, screen } from '@testing-library/react';
import FormsCards from './forms-cards';
import { Genre, IForm } from '../../interfaces';

describe('FormsCard', () => {
  it('renders FormsCard component correctly', () => {
    const cards: IForm[] = [];
    render(<FormsCards cards={cards} />);
    expect(screen.queryAllByTestId('form-card-title')[0] as HTMLElement).toBeUndefined();

    cards.push({
      id: 1,
      title: 'Mortal combat',
      overview: '',
      country: '',
      releaseDate: '2022-09-01',
      genre: Genre.thriller,
      isConfirmPolitics: true,
      adult: true,
      logo: undefined,
    });

    render(<FormsCards cards={cards} />);
    expect(screen.queryAllByTestId('form-card-title')[0] as HTMLElement).toBeInTheDocument();
    expect(screen.queryByText(Genre.thriller)).toBeInTheDocument();
    expect(screen.queryByText('Hardcore')).toBeInTheDocument();
    expect(screen.queryByText('Regular')).toBeNull();
  });
});
