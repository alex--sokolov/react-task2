import React, { Component } from 'react';
import './forms-card.scss';
import { IForm } from '../../interfaces';

export default class FormsCard extends Component<Readonly<{ card: IForm }>, unknown> {
  render(): React.ReactNode {
    const { card } = this.props;
    return (
      <div className="forms-card">
        <h1 className="title" data-testid="form-card-title">
          {card.id}. {card.title}
        </h1>
        <div>
          <div className="img" data-testid="form-card-img">
            <img src={card.logo} alt={card.title} />
          </div>
          <div>
            <div className="overview">{card.overview}</div>
            <div className="country" data-testid="form-card-country">
              <span>Country:</span> {card.country}
            </div>
            <div className="releaseDate">
              <span>Release date:</span> {card.releaseDate}
            </div>
            <div className="genre">
              <span>Genre:</span> {card.genre}
            </div>
            <div className="adult">
              <span>Censored:</span> {card.isConfirmPolitics ? 'Yes' : 'No'}
            </div>
            <div className="adult">
              <span>Adult:</span> {card.adult ? 'Hardcore' : 'Regular'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
