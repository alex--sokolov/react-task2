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
        <div>{process.env.REACT_APP_NOT_API_URL}</div>
        <div>{process.env.REACT_APP_NOT_API_EMAIL}</div>
        <div>{process.env.REACT_APP_NOT_API_TOKEN}</div>
        <CardsList />
      </div>
    );
  }
}

export default MainPage;
