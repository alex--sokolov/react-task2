import React from 'react';
import { render, screen } from '@testing-library/react';
import FormsCard from './forms-card';
import { Genre } from '../../interfaces';

describe('Card', () => {
  it('renders Card component', () => {
    const card = {
      id: 1,
      title: '',
      overview: '',
      country: '',
      releaseDate: '',
      genre: Genre.default,
      isConfirmPolitics: false,
      adult: false,
      logo: undefined,
    }
    render(<FormsCard key={card.id} card={card}/>);
    expect(screen.getAllByTestId('card-title')[0] as HTMLElement).toBeInTheDocument();
    expect(screen.getAllByTestId('card-img')[0] as HTMLImageElement).toBeInTheDocument();
    expect(screen.getAllByTestId('card-tagline')[0] as HTMLElement).toBeInTheDocument();
  });
});
