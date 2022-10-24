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
    modalOpened: null,
    isModalClosing: false,
  };

  overlayClass = (): string => (this.state.modalOpened ? 'show' : '');

  closeModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalClosing: true,
    }));
  };

  toggleOverlay = (modalId?: string | null): void => {
    this.setState((prevState) => ({
      ...prevState,
      modalOpened: modalId,
      isModalClosing: false,
    }));
  };

  render(): React.ReactNode {
    return (
      <>
        <div
          id="overlay"
          className={`overlay ${this.overlayClass()}`}
          onClick={() => this.closeModal()}
        />
        <div data-testid="main-page">
          <SearchBar changeMainState={this.setState.bind(this)} />
          <CardsList
            movies={this.state.movies}
            isLoading={this.state.isLoading}
            fetchError={this.state.fetchError}
            isShowError={this.state.isShowError}
            toggleOverlay={this.toggleOverlay}
            modalOpened={this.state.modalOpened}
            isModalClosing={this.state.isModalClosing}
          />
        </div>
      </>
    );
  }
}

export default MainPage;
