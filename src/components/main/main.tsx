import React, { FC, useReducer, useState } from 'react';
import './main.scss';
import SearchBar from '../search-bar/search-bar';
import CardsList from '../cards-list/cards-list';
import {
  IActionCharacters,
  ICharacter,
  IFetchError,
  IMovie,
  IStateCharacter,
} from '../../interfaces';

const MainPage: FC = () => {
  // const [modalOpened, setModalOpened] = useState<string | null>(null);
  // const [isModalClosing, setIsModalClosing] = useState<boolean>(false);
  // const [movies, setMovies] = useState<IMovie[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [fetchError, setFetchError] = useState<IFetchError | null>(null);
  // const [isShowError, setIsShowError] = useState<boolean>(false);

  // const closeModal = () => {
  //   setIsModalClosing(true);
  // };

  // const toggleOverlay = (modalId: string | null = null): void => {
  //   setModalOpened(modalId);
  //   setIsModalClosing(false);
  // };

  return (
    <>
      <div
        id="overlay"
        // className={`overlay ${modalOpened ? 'show' : ''}`}
        // onClick={closeModal}
        data-testid="overlay"
      />
      <div data-testid="main-page">
        {/*<SearchBar*/}
        {/*  setMovies={setMovies}*/}
        {/*  setIsLoading={setIsLoading}*/}
        {/*  setFetchError={setFetchError}*/}
        {/*  setIsShowError={setIsShowError}*/}
        {/*/>*/}
        {/*<CardsList*/}
        {/*  movies={movies}*/}
        {/*  isLoading={isLoading}*/}
        {/*  fetchError={fetchError}*/}
        {/*  isShowError={isShowError}*/}
        {/*  toggleOverlay={toggleOverlay}*/}
        {/*  modalOpened={modalOpened}*/}
        {/*  isModalClosing={isModalClosing}*/}
        {/*/>*/}
        <SearchBar />
        <CardsList />
      </div>
    </>
  );
};

export default MainPage;
