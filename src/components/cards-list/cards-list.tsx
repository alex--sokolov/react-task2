import React, { Component } from 'react';
import './cards-list.scss';
import Card from '../card/card';
import { IMovie } from '../../interfaces';
import moviesStatic from '../../data/movies.json';

export default class CardsList extends Component<Readonly<{ movies: any }>, unknown> {


  render(): React.ReactNode {
    const {movies} = this.props;
    console.log('movies', movies);

    return (
      <section className="cards-list" data-testid="cars-list">
        {movies.length > 0 ?
          <h2>
            You have {movies.length} movies.
          </h2>
          :
          <>
            <h1>That is a static initial movie-list, shown before your first search</h1>
            <div className="movies-list">
              {moviesStatic.map((movie: IMovie) => {
                return (
                  <Card movie={movie} key={movie.id} />
                );
              })}
            </div>
          </>}
      </section>
    );
  }
}
