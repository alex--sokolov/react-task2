import React, { Component } from 'react';
import './forms-cards.scss';
import { IForm } from '../../interfaces';
import FormsCard from '../forms-card/forms-card';

export default class FormsCards extends Component<Readonly<{ cards: IForm[] }>, unknown> {
  render(): React.ReactNode {
    const { cards } = this.props;
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
  }
}
