import React, { Component } from 'react';
import './main.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';
import { IState } from '../../interfaces';

class MainPage extends Component {
  state: Omit<IState, 'searchValue'> = {
    movies: [],
    isLoading: true,
    fetchError: null,
    isShowError: false,
  };

  render(): React.ReactNode {
    return (
      <div data-testid="main-page">
        <SearchBar changeMainState={this.setState.bind(this)} />
        <CardsList
          movies={this.state.movies}
          isLoading={this.state.isLoading}
          fetchError={this.state.fetchError}
          isShowError={this.state.isShowError}
        />
      </div>
    );
  }
}

export default MainPage;
