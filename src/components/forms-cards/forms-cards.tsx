import React from 'react';
import './forms-cards.scss';
import { IForm } from '../../interfaces';
import FormsCard from '../forms-card/forms-card';

const FormsCards = (props: { cards: IForm[] }) => {
  const { cards } = props;
  return (
    <section className="added-movies">
      <h1>You have added these movies:</h1>
      <div className="forms-cards" data-testid="forms-cards">
        {cards.map((card: IForm) => (
          <FormsCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default FormsCards;
