import React, { Component, RefObject } from 'react';
import './card.scss';
import { IMovie, IStateDownload } from '../../interfaces';

export default class Card extends Component<
  Readonly<{
    movie: IMovie;
    toggleOverlay: (modalId: string | null) => void;
    modalOpened: string | null;
    isModalClosing: boolean;
  }>,
  unknown
> {
  constructor(
    props: Readonly<
      Readonly<{
        movie: IMovie;
        toggleOverlay: (modalId: string | null) => void;
        modalOpened: string | null;
        isModalClosing: boolean;
      }>
    >
  ) {
    super(props);
    this.showPopupMovieInfo = this.showPopupMovieInfo.bind(this);
    this.hidePopupMovieInfo = this.hidePopupMovieInfo.bind(this);
    this.startDownload = this.startDownload.bind(this);
    this.fullInfoRef = React.createRef();
    this.downloadRef = React.createRef();
  }

  fullInfoRef: RefObject<HTMLDivElement>;
  downloadRef: RefObject<HTMLDivElement>;

  state: IStateDownload = {
    isDownloading: false,
    downloaded: false,
  };

  showPopupMovieInfo(title: string | null) {
    this.props.toggleOverlay(title);
  }

  hidePopupMovieInfo() {
    this.fullInfoRef.current?.classList.add('hide');
    this.fullInfoRef.current?.classList.remove('show');
    setTimeout(() => {
      this.props.toggleOverlay(null);
      this.fullInfoRef.current?.classList.remove('hide');
    }, 400);
  }

  startDownload(): void {
    this.setState((prevState: IStateDownload) => ({
      ...prevState,
      isDownloading: true,
    }));

    setTimeout(() => {
      this.setState((prevState: IStateDownload) => ({
        ...prevState,
        downloaded: true,
      }));
    }, 4000);
    setTimeout(() => {
      this.setState((prevState: IStateDownload) => ({
        ...prevState,
        downloaded: false,
        isDownloading: false,
      }));
    }, 7000);
  }

  componentDidUpdate() {
    if (this.props.isModalClosing && this.props.modalOpened === this.props.movie._id) {
      this.hidePopupMovieInfo();
    }
  }

  render(): React.ReactNode {
    const { movie } = this.props;
    const fullInfoClass = this.props.modalOpened === movie._id ? 'show' : '';
    const movieClass = this.props.modalOpened === movie._id ? 'active' : '';
    return (
      <>
        <div
          key={movie._id}
          className={`movie ${movieClass}`}
          data-testid={`movie-id-${movie._id}`}
          onClick={() => {
            this.showPopupMovieInfo(movie._id);
          }}
        >
          <h3 className="title">{movie.name}</h3>
          <div
            className={`full-info ${fullInfoClass}`}
            ref={this.fullInfoRef}
            data-testid={`popup-id-${movie._id}`}
          >
            <div className="close-modal" onClick={this.hidePopupMovieInfo}>
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
              onClick={() => this.startDownload()}
              style={{
                display: `${this.state.isDownloading ? 'none' : 'block'}`,
              }}
            >
              download
            </div>
            <div
              className="download-title-container"
              data-testid="downloadProgress"
              style={{
                display: `${this.state.isDownloading ? 'block' : 'none'}`,
              }}
            >
              <div>
                <span className="download-title">{movie.name} - </span>
                <span
                  className="download-text"
                  style={{
                    display: `${this.state.downloaded ? 'none' : 'block'}`,
                  }}
                >
                  downloading...
                </span>
                <span
                  className="download-text-finished"
                  style={{
                    display: `${this.state.downloaded ? 'block' : 'none'}`,
                  }}
                >
                  downloaded
                </span>
              </div>
              <div className={`download`} ref={this.downloadRef}>
                <div className={'indicator'} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
