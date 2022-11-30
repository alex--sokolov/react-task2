import React from 'react';
import './Forms-card.scss';
import { Adult, FormFields, IForm, MovieStatus } from '../../../interfaces';

const FormsCard = (props: { card: IForm }) => {
  const { card } = props;
  return (
    <div className="forms-card">
      <h1 className={FormFields.title} data-testid="form-card-title">
        {card.id}. {card.title}
      </h1>
      <div>
        <div className="img" data-testid="form-card-img">
          <img src={card.logo} alt={card.title} />
        </div>
        <div>
          <div className={FormFields.overview}>{card.overview}</div>
          <div className={FormFields.country} data-testid="form-card-country">
            <span>Country:</span> {card.country}
          </div>
          <div className="releaseStatus">
            <span>Release status:</span>
            {new Date(card.releaseDate).getTime() < Date.now()
              ? MovieStatus.released
              : MovieStatus.waiting}
          </div>
          <div className={FormFields.releaseDate as string}>
            <span>Release date:</span> {card.releaseDate.toString()}
          </div>
          <div className={FormFields.genre}>
            <span>{FormFields.genre}:</span> {card.genre}
          </div>
          <div className={FormFields.adult}>
            <span>{FormFields.adult}:</span> {card.adult ? Adult.true : Adult.false}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsCard;
