import React, { Component } from 'react';
import './cardStatic.scss';
import { IMovieStatic } from '../../interfaces';

export default class CardStatic extends Component<Readonly<{ movie: IMovieStatic }>, unknown> {
  render(): React.ReactNode {
    const { movie } = this.props;
    return (
      <div key={movie.id} className="movie-static">
        <h1 className="title" data-testid="card-title">
          {movie.title}
        </h1>
        <div className="img" data-testid="card-img">
          <img src={require(`../../data/img${movie.poster_path}`)} alt="{card.title}" />
        </div>
        <div className="budget">
          <span>Бюджет:</span> {movie.budget} $
        </div>
        <h2 className="tagline" data-testid="card-tagline">
          {movie.tagline}
        </h2>
        <div className="popularity">
          <span>Популярность:</span> {movie.popularity}
        </div>
      </div>
    );
  }
}
