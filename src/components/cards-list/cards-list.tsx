import React, { Component } from 'react';
import './cards-list.scss';
import Card from '../card/card';

export default class CardsList extends Component {
  render(): React.ReactNode {
    return (
      <section className="cards-list" data-testid="cars-list">
        <Card />
      </section>
    );
  }
}
