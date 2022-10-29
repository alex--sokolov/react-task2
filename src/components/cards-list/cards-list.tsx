import React, { useMemo } from 'react';
import './cards-list.scss';
import CardStatic from '../cardStatic/cardStatic';
import { IFetchError, IMovie, IMovieStatic, NotifyType } from '../../interfaces';
import moviesStatic from '../../data/movies.json';
import Spinner from '../spinner/spinner';
import Card from '../card/card';
import Notify from '../notify/notify';

const CardsList = (props: {
  movies: IMovie[];
  isLoading: boolean;
  fetchError: IFetchError | null;
  isShowError: boolean;
  toggleOverlay: (modalId: string | null) => void;
  modalOpened: string | null;
  isModalClosing: boolean;
}) => {
  const { movies, isLoading, fetchError, isShowError, toggleOverlay, modalOpened, isModalClosing } =
    props;

  const listTitle = useMemo(() => {
    return movies.length > 0
      ? 'Movie-list from "The Lord of the Rings" API'
      : 'Nothing found! That is a static movie-list (not from search)';
  }, [movies]);

  const movieListClass = useMemo(
    () => (movies.length > 0 ? 'movies-list' : 'movies-static-list'),
    [movies]
  );

  const movieList =
    movies.length > 0
      ? movies.map((movie: IMovie) => {
          return (
            <Card
              movie={movie}
              key={movie._id}
              toggleOverlay={toggleOverlay}
              modalOpened={modalOpened}
              isModalClosing={isModalClosing}
            />
          );
        })
      : moviesStatic.map((movie: IMovieStatic) => {
          return <CardStatic movie={movie} key={movie.id} />;
        });

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
};

export default CardsList;
