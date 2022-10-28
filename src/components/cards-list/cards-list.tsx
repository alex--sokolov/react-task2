import React, { Component } from 'react';
import './cards-list.scss';
import CardStatic from '../cardStatic/cardStatic';
import { IFetchError, IMovie, IMovieStatic, NotifyType } from '../../interfaces';
import moviesStatic from '../../data/movies.json';
import Spinner from '../spinner/spinner';
import Card from '../card/card';
import Notify from '../notify/notify';

export default class CardsList extends Component<
  Readonly<{
    movies: IMovie[];
    isLoading: boolean;
    fetchError: IFetchError | null;
    isShowError: boolean;
    toggleOverlay: (modalId: string | null) => void;
    modalOpened: string | null;
    isModalClosing: boolean;
  }>,
  unknown
> {
  render(): React.ReactNode {
    const { movies, isLoading, fetchError, isShowError } = this.props;
    const listTitle =
      movies.length > 0
        ? 'Movie-list from "The Lord of the Rings" API'
        : 'Nothing found! That is a static movie-list (not from search)';
    const movieList =
      movies.length > 0
        ? movies.map((movie: IMovie) => {
            return (
              <Card
                movie={movie}
                key={movie._id}
                toggleOverlay={this.props.toggleOverlay}
                modalOpened={this.props.modalOpened}
                isModalClosing={this.props.isModalClosing}
              />
            );
          })
        : moviesStatic.map((movie: IMovieStatic) => {
            return <CardStatic movie={movie} key={movie.id} />;
          });
    const movieListClass = movies.length > 0 ? 'movies-list' : 'movies-static-list';
    return (
      <section className="cards-list" data-testid="cards-list">
        <Notify
          isShow={isShowError}
          message={`${fetchError?.errorCode} | ${fetchError?.errorMessage}`}
          type={NotifyType.ERROR}
        />
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
