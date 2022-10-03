import React, { Component } from 'react';
import './card.scss';
import movies from '../../data/movies.json';
import { IMovie } from '../../interfaces';

export default class Card extends Component {
  state = {
    cards: movies,
  };

  render(): React.ReactNode {
    console.log(this.state.cards);

    return (
      <div className="movies-list">
        {this.state.cards &&
          this.state.cards.map((card: IMovie) => {
            return (
              <div key={card.id} className="movie">
                <h1 className="title" data-testid="card-title">
                  {card.title}
                </h1>
                <div className="img" data-testid="card-img">
                  <img src={require(`../../data/img${card.poster_path}`)} alt="{card.title}" />
                </div>
                <div className="budget">
                  <span>Бюджет:</span> {card.budget} $
                </div>
                <h2 className="tagline" data-testid="card-tagline">
                  {card.tagline}
                </h2>
                <div className="popularity">
                  <span>Популярность:</span> {card.popularity}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
