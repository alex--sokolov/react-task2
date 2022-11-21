import React, { useContext, useMemo, useState } from 'react';
import './cards-list.scss';
import CardStatic from '../cardStatic/cardStatic';
import { ICharacter, IFetchError, IMovie, IMovieStatic, NotifyType } from '../../interfaces';
import moviesStatic from '../../data/movies.json';
import Spinner from '../spinner/spinner';
import Card from '../card/card';
import Notify from '../notify/notify';
import useCharacters from '../Characters/CharacterContext';

// const CardsList = (props: {
//   movies: IMovie[];
//   isLoading: boolean;
//   fetchError: IFetchError | null;
//   isShowError: boolean;
//   toggleOverlay: (modalId: string | null) => void;
//   modalOpened: string | null;
//   isModalClosing: boolean;
// }) => {
//   const { movies, isLoading, fetchError, isShowError, toggleOverlay, modalOpened, isModalClosing } =
//     props;

const CardsList = () => {
  const { characters, isLoading } = useCharacters();
  console.log('isLoading: ', isLoading);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  // const listTitle = useMemo(() => {
  //   return movies.length > 0
  //     ? 'Movie-list from "The Lord of the Rings" API'
  //     : 'Nothing found! That is a static movie-list (not from search)';
  // }, [movies]);
  //
  // const movieListClass = useMemo(
  //   () => (movies.length > 0 ? 'movies-list' : 'movies-static-list'),
  //   [movies]
  // );
  //
  // const movieList =
  //   movies.length > 0
  //     ? movies.map((movie: IMovie) => {
  //         return (
  //           <Card
  //             movie={movie}
  //             key={movie._id}
  //             toggleOverlay={toggleOverlay}
  //             modalOpened={modalOpened}
  //             isModalClosing={isModalClosing}
  //           />
  //         );
  //       })
  //     : moviesStatic.map((movie: IMovieStatic) => {
  //         return <CardStatic movie={movie} key={movie.id} />;
  //       });

  const charactersList =
    Array.isArray(characters) && characters.length > 0 ? (
      characters.map((character: ICharacter) => {
        const altName = character.alternate_names.length > 0 ? character.alternate_names[0] : '';
        const uniqueKey = character.name + altName;
        return (
          <Card
            character={character}
            key={uniqueKey}
            // toggleOverlay={toggleOverlay}
            // modalOpened={modalOpened}
            // isModalClosing={isModalClosing}
          />
        );
      })
    ) : (
      <>Nothing is found - {JSON.stringify(isLoading)}</>
    );

  return (
    // <section className="cards-list" data-testid="cards-list">
    //   <Notify
    //     isShow={Array.isArray(characters)}
    //     message={!Array.isArray(characters) ? `${characters?.errorCode} | ${characters?.errorMessage}` : ''}
    //     type={NotifyType.ERROR}
    //   />
    //   {isLoading ? (
    //     <div className="spinner" style={{ position: 'absolute' }}>
    //       <Spinner isLoading />
    //     </div>
    //   ) : (
    //     <>
    //       <h1>{listTitle}</h1>
    //       <div className={movieListClass}>{movieList}</div>
    //     </>
    //   )}
    // </section>
    <section className="cards-list" data-testid="cards-list">
      <Notify
        isShow={!Array.isArray(characters)}
        message={
          !Array.isArray(characters) ? `${characters?.errorCode} | ${characters?.errorMessage}` : ''
        }
        type={NotifyType.ERROR}
      />
      {isLoading ? (
        <div className="spinner" style={{ position: 'absolute' }}>
          <Spinner isLoading />
        </div>
      ) : (
        <>
          <h1>Harry Potter characters</h1>
          <div className="characters-list">{charactersList}</div>
        </>
      )}
    </section>
  );
};

export default CardsList;
