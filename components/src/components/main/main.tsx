import React, { Component } from 'react';
import './main.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';

class MainPage extends Component {
  render(): React.ReactNode {
    return (
      <div data-testid="main-page">
        MainPage
        <SearchBar />
        <CardsList />
      </div>
    );
  }
}

export default MainPage;
