import React, { FC } from 'react';
import './Main.scss';
import SearchBar from '../../ui/Search-bar/Search-bar';
import CardsList from '../../ui/Cards-list/Cards-list';

const MainPage: FC = () => {
  return (
    <>
      <div id="overlay" />
      <section className="characters-container">
        <SearchBar />
        <CardsList />
      </section>
    </>
  );
};

export default MainPage;
