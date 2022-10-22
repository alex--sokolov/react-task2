import React, { Component } from 'react';
import './main.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';
import { IState } from '../../interfaces';

class MainPage extends Component {
  state: Pick<IState, 'movies' | 'isLoading'> = {
    movies: [],
    isLoading: true,
  };

  render(): React.ReactNode {
    return (
      <div data-testid="main-page">
        MainPage
        <SearchBar changeMainState={this.setState.bind(this)} />
        <div>{process.env.REACT_APP_API_URL}</div>
        <div>{process.env.REACT_APP_API_EMAIL}</div>
        <div>{process.env.REACT_APP_API_TOKEN}</div>
        <CardsList movies={this.state.movies} isLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default MainPage;
