import React, { Component } from 'react';
import './card.scss';

import { IMovie } from '../../interfaces';

export default class Card extends Component<Readonly<{ movie: any }>, unknown> {

  render(): React.ReactNode {
    console.log('this.props');
    const {movie} = this.props;
    console.log('movie', movie);
    return (
        <div key={movie.id} className="movie">
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
