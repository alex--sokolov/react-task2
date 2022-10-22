import React, { Component } from 'react';
import './cards-list.scss';
import CardStatic from '../cardStatic/cardStatic';
import { IMovie, IMovieStatic } from '../../interfaces';
import moviesStatic from '../../data/movies.json';
import Spinner from '../spinner/spinner';
import Card from '../card/card';

export default class CardsList extends Component<
  Readonly<{ movies: IMovie[]; isLoading: boolean }>,
  unknown
> {
  render(): React.ReactNode {
    const { movies, isLoading } = this.props;
    console.log('movies', movies);
    const listTitle =
      movies.length > 0
        ? 'Movie-list from "The Lord of the Rings" API'
        : 'That is a static initial movie-list, shown before your first search';
    const movieList =
      movies.length > 0
        ? movies.map((movie: IMovie) => {
            return <Card movie={movie} key={movie._id} />;
          })
        : moviesStatic.map((movie: IMovieStatic) => {
            return <CardStatic movie={movie} key={movie.id} />;
          });
    const movieListClass = movies.length > 0 ? 'movies-list' : 'movies-static-list';
    return (
      <section className="cards-list" data-testid="cars-list">
        {isLoading ? (
          <div className="spinner" style={{ position: 'absolute' }}>
            <Spinner isLoading />
          </div>
        ) : (
          <>
            <h1>{listTitle}</h1>
            <div className={movieListClass}>{movieList}</div>
          </>
        )}
      </section>
    );
  }
}
