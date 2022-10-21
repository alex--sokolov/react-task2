import React, { Component } from 'react';
import './main.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';

class MainPage extends Component {

  state = {
    movies: [],
  }

  render(): React.ReactNode {
    return (
      <div data-testid="main-page">
        MainPage
        <SearchBar changeMovieState = {this.setState.bind(this)} />
        <div>{process.env.REACT_APP_API_URL}</div>
        <div>{process.env.REACT_APP_API_EMAIL}</div>
        <div>{process.env.REACT_APP_API_TOKEN}</div>
        <CardsList movies = {this.state.movies} />
      </div>
    );
  }
}

export default MainPage;
