import './card.scss';

import React, { useMemo, useRef, useState } from 'react';
import { ICharacter } from '../../interfaces';
import { Link } from 'react-router-dom';

const Card = (props: { character: ICharacter }) => {
  const { character } = props;

  const fullInfoRef = useRef(null);

  // const showPopupMovieInfo = (title: string | null) => toggleOverlay(title);
  // const hidePopupMovieInfo = () => {
  //   if (fullInfoRef && fullInfoRef.current) {
  //     (fullInfoRef.current as unknown as HTMLInputElement).classList.add('hide');
  //     (fullInfoRef.current as unknown as HTMLInputElement).classList.remove('show');
  //   }
  //   setTimeout(() => {
  //     toggleOverlay(null);
  //     if (fullInfoRef && fullInfoRef.current) {
  //       (fullInfoRef.current as unknown as HTMLInputElement).classList.remove('hide');
  //     }
  //   }, 400);
  // };
  //
  // const startDownload = (): void => {
  //   setIsDownloading(true);
  //   setTimeout(() => setDownloaded(true), 4000);
  //   setTimeout(() => {
  //     setDownloaded(false);
  //     setIsDownloading(false);
  //   }, 7000);
  // };
  //
  // const hidePopupMovieInfoCallback = useCallback(hidePopupMovieInfo, [fullInfoRef, toggleOverlay]);
  //
  // useEffect(() => {
  //   if (isModalClosing && modalOpened === movie._id) {
  //     hidePopupMovieInfoCallback();
  //   }
  // }, [isModalClosing, modalOpened, movie._id, hidePopupMovieInfoCallback]);
  //
  // const fullInfoClass = useMemo(
  //   () => (modalOpened === movie._id ? 'show' : ''),
  //   [modalOpened, movie._id]
  // );
  // const movieClass = useMemo(
  //   () => (modalOpened === movie._id ? 'active' : ''),
  //   [modalOpened, movie._id]
  // );

  const uniqueUrl = useMemo(() => {
    const altName = character.alternate_names.length > 0 ? '-' + character.alternate_names[0] : '';
    return '/character/' + character.name + altName;
  }, [character]);

  return (
    <>
      <Link
        to={uniqueUrl}
        // key={character.name}
        className={`character`}
      >
        <h3 className="title">{character.name}</h3>
        {character.image ? (
          <div
            className="photo"
            // ref={fullInfoRef}
            // data-testid={`popup-id-${movie._id}`}
          >
            <img src={character.image} alt={character.name} />
          </div>
        ) : (
          <div className="info">
            {character.species && (
              <div className="field">
                <h4>Species</h4>: <p>{character.species}</p>
              </div>
            )}
            {character.alternate_names && character.alternate_names.length > 0 && (
              <div className="field">
                <h4>Alternate names</h4>:{' '}
                {character.alternate_names.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            )}
            {character.actor && (
              <div className="field">
                <h4>Actor</h4>: {character.actor}
              </div>
            )}
          </div>
        )}

        {/*<div className="close-modal" onClick={hidePopupMovieInfo}>*/}
        {/*  x*/}
        {/*</div>*/}
        {/*<h1>{movie.name}</h1>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Academy award nominations:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.academyAwardNominations}</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Academy award wins:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.academyAwardWins}</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Box office revenue in millions:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.boxOfficeRevenueInMillions}</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Budget in millions:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.budgetInMillions}</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Rotten tomatoes score:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.rottenTomatoesScore}</h3>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <div>*/}
        {/*    <h6>Runtime in minutes:</h6>*/}
        {/*  </div>*/}
        {/*  <h3>{movie.runtimeInMinutes}</h3>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={'download-btn'}*/}
        {/*  onClick={() => startDownload()}*/}
        {/*  style={{*/}
        {/*    display: `${isDownloading ? 'none' : 'block'}`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  download*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className="download-title-container"*/}
        {/*  data-testid="downloadProgress"*/}
        {/*  style={{*/}
        {/*    display: `${isDownloading ? 'block' : 'none'}`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <span className="download-title">{movie.name} - </span>*/}
        {/*    <span*/}
        {/*      className="download-text"*/}
        {/*      style={{*/}
        {/*        display: `${downloaded ? 'none' : 'block'}`,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      downloading...*/}
        {/*    </span>*/}
        {/*    <span*/}
        {/*      className="download-text-finished"*/}
        {/*      style={{*/}
        {/*        display: `${downloaded ? 'block' : 'none'}`,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      downloaded*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className={`download`}>*/}
        {/*    <div className={'indicator'} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*</div>*/}
      </Link>
    </>
  );
};

export default Card;
