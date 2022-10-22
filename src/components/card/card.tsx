import React, { Component } from 'react';
import './card.scss';
import { IMovie } from '../../interfaces';

export default class Card extends Component<Readonly<{ movie: IMovie }>, unknown> {
  constructor(props: Readonly<Readonly<{ movie: IMovie }>>) {
    super(props);
    this.showPopupMovieInfo = this.showPopupMovieInfo.bind(this);
  }

  showPopupMovieInfo() {}

  render(): React.ReactNode {
    const { movie } = this.props;

    return (
      <div key={movie._id} className="movie">
        <h3 className="title" data-testid="card-title" onClick={this.showPopupMovieInfo}>
          {movie.name}
        </h3>
      </div>
    );
  }
}
