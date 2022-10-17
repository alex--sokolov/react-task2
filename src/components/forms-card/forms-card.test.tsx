import React from 'react';
import { render, screen } from '@testing-library/react';
import FormsCard from './forms-card';
import { Adult, Genre, IForm, MovieStatus } from '../../interfaces';

describe('FormsCard', () => {

  it('renders FormsCard component correctly', () => {
    const card: IForm = {
      id: 1,
      title: 'Mortal combat',
      overview: '',
      country: '',
      releaseDate: '2022-09-01',
      genre: Genre.thriller,
      isConfirmPolitics: true,
      adult: false,
      logo: undefined,
    }
    render(<FormsCard card={card} />);
    expect(screen.queryAllByTestId('form-card-title')[0] as HTMLElement).toBeInTheDocument();
    expect(screen.queryAllByTestId('form-card-img')[0] as HTMLImageElement).toBeInTheDocument();
    expect(screen.queryAllByTestId('form-card-country')[0] as HTMLElement).toBeInTheDocument();
    expect(screen.getByText(MovieStatus.released)).toBeInTheDocument();
    expect(screen.getByText(Adult.false)).toBeInTheDocument();
    card.releaseDate = '2028-10-22';
    card.adult = true;
    render(<FormsCard card={card}/>);
    expect(screen.getByText(MovieStatus.waiting)).toBeInTheDocument();
    expect(screen.getByText(Adult.true)).toBeInTheDocument();
  });
});
