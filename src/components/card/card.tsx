import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './card.scss';
import { IMovie } from '../../interfaces';

const Card = (props: {
  movie: IMovie;
  toggleOverlay: (modalId: string | null) => void;
  modalOpened: string | null;
  isModalClosing: boolean;
}) => {
  const { movie, toggleOverlay, modalOpened, isModalClosing } = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const fullInfoRef = useRef(null);
  const showPopupMovieInfo = (title: string | null) => toggleOverlay(title);
  const hidePopupMovieInfo = () => {
    (fullInfoRef.current as unknown as HTMLInputElement).classList.add('hide');
    (fullInfoRef.current as unknown as HTMLInputElement).classList.remove('show');
    setTimeout(() => {
      toggleOverlay(null);
      (fullInfoRef.current as unknown as HTMLInputElement).classList.remove('hide');
    }, 400);
  };

  const startDownload = (): void => {
    setIsDownloading(true);
    setTimeout(() => setDownloaded(true), 4000);
    setTimeout(() => {
      setDownloaded(false);
      setIsDownloading(false);
    }, 7000);
  };

  const hidePopupMovieInfoCallback = useCallback(hidePopupMovieInfo, [fullInfoRef, toggleOverlay]);

  useEffect(() => {
    if (isModalClosing && modalOpened === movie._id) {
      hidePopupMovieInfoCallback();
    }
  }, [isModalClosing, modalOpened, movie._id, hidePopupMovieInfoCallback]);

  const fullInfoClass = useMemo(
    () => (modalOpened === movie._id ? 'show' : ''),
    [modalOpened, movie._id]
  );
  const movieClass = useMemo(
    () => (modalOpened === movie._id ? 'active' : ''),
    [modalOpened, movie._id]
  );
  return (
    <>
      <div
        key={movie._id}
        className={`movie ${movieClass}`}
        data-testid={`movie-id-${movie._id}`}
        onClick={() => {
          showPopupMovieInfo(movie._id);
        }}
      >
        <h3 className="title">{movie.name}</h3>
        <div
          className={`full-info ${fullInfoClass}`}
          ref={fullInfoRef}
          data-testid={`popup-id-${movie._id}`}
        >
          <div className="close-modal" onClick={hidePopupMovieInfo}>
            x
          </div>
          <h1>{movie.name}</h1>
          <div>
            <div>
              <h6>Academy award nominations:</h6>
            </div>
            <h3>{movie.academyAwardNominations}</h3>
          </div>
          <div>
            <div>
              <h6>Academy award wins:</h6>
            </div>
            <h3>{movie.academyAwardWins}</h3>
          </div>
          <div>
            <div>
              <h6>Box office revenue in millions:</h6>
            </div>
            <h3>{movie.boxOfficeRevenueInMillions}</h3>
          </div>
          <div>
            <div>
              <h6>Budget in millions:</h6>
            </div>
            <h3>{movie.budgetInMillions}</h3>
          </div>
          <div>
            <div>
              <h6>Rotten tomatoes score:</h6>
            </div>
            <h3>{movie.rottenTomatoesScore}</h3>
          </div>
          <div>
            <div>
              <h6>Runtime in minutes:</h6>
            </div>
            <h3>{movie.runtimeInMinutes}</h3>
          </div>
          <div
            className={'download-btn'}
            onClick={() => startDownload()}
            style={{
              display: `${isDownloading ? 'none' : 'block'}`,
            }}
          >
            download
          </div>
          <div
            className="download-title-container"
            data-testid="downloadProgress"
            style={{
              display: `${isDownloading ? 'block' : 'none'}`,
            }}
          >
            <div>
              <span className="download-title">{movie.name} - </span>
              <span
                className="download-text"
                style={{
                  display: `${downloaded ? 'none' : 'block'}`,
                }}
              >
                downloading...
              </span>
              <span
                className="download-text-finished"
                style={{
                  display: `${downloaded ? 'block' : 'none'}`,
                }}
              >
                downloaded
              </span>
            </div>
            <div className={`download`}>
              <div className={'indicator'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
