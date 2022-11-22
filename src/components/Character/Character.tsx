import './character.scss';

import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import useCharacters from '../../hooks/useCharacters';
import { NavLink, useLocation } from 'react-router-dom';
import { ICharacter } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import BreadcrumbTrail from '../Breadcrumbs/Breadcrumbs';

const Character = () => {
  const { characters } = useCharacters();
  const { pathname } = useLocation();

  const character = useMemo(() => {
    const characterParams = pathname.slice(11).split('-');
    return Array.isArray(characters)
      ? characters.find(
          (character: ICharacter) =>
            character.name === characterParams[0] &&
            character.alternate_names[0] === characterParams[1]
        )
      : null;
  }, [characters, pathname]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!character) {
      navigate('/');
    }
  }, [character]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const startDownload = (): void => {
    setIsDownloading(true);
    setTimeout(() => setDownloaded(true), 4000);
    setTimeout(() => {
      setDownloaded(false);
      setIsDownloading(false);
    }, 7000);
  };

  return (
    <>
      <div className="go-back" onClick={() => navigate(-1)}>
        Go back
      </div>
      <div className="character-container">
        <h3 className="title" style={{ color: 'violet' }}>
          {character?.name}
        </h3>{' '}
        (
        {character?.actor && (
          <span>
            {' '}
            <h4 style={{ fontStyle: 'italic', fontWeight: '400' }}>Actor: </h4>
            <h3 className="actor" style={{ color: 'goldenrod' }}>
              {character?.actor}
            </h3>
          </span>
        )}{' '}
        )
        <div className="content-container">
          {character?.image && (
            <div className="photo">
              <img src={character.image} alt={character.name} />
            </div>
          )}
          <div className="info-container">
            {character?.species && (
              <div className="field">
                <h4>Species</h4>: <p>{character?.species}</p>
              </div>
            )}
            {character?.alternate_names && character?.alternate_names.length > 0 && (
              <div className="field">
                <h4>Alternate names</h4>:{' '}
                {character?.alternate_names.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            )}
            {character?.gender && (
              <div className="field">
                <h4>Gender</h4>: <p>{character?.gender}</p>
              </div>
            )}
            {character?.house && (
              <div className="field">
                <h4>House</h4>: <p>{character?.house}</p>
              </div>
            )}
            {character?.dateOfBirth && (
              <div className="field">
                <h4>Date of birth</h4>: <p>{character?.dateOfBirth}</p>
              </div>
            )}
            {character?.yearOfBirth && (
              <div className="field">
                <h4>Year of birth</h4>: <p>{character?.yearOfBirth}</p>
              </div>
            )}
            {character?.wizard && (
              <div className="field">
                <h4>Wizard</h4>: <p>{character?.wizard ? 'yes' : 'no'}</p>
              </div>
            )}
            {character?.ancestry && (
              <div className="field">
                <h4>Ancestry</h4>: <p>{character?.ancestry}</p>
              </div>
            )}
            {character?.eyeColour && (
              <div className="field">
                <h4>Eye color</h4>: <p>{character?.eyeColour}</p>
              </div>
            )}
            {character?.hairColour && (
              <div className="field">
                <h4>Hair color</h4>: <p>{character?.hairColour}</p>
              </div>
            )}
            {(character?.wand?.wood || character?.wand?.core || character?.wand?.length) && (
              <>
                <div className="field">
                  <h4>Wand</h4>:
                </div>
                <div style={{ paddingLeft: '50px' }}>
                  {character?.wand?.wood && (
                    <div className="field">
                      <h4>wood</h4>: <p>{character?.wand?.wood}</p>
                    </div>
                  )}
                  {character?.wand?.core && (
                    <div className="field">
                      <h4>core</h4>: <p>{character?.wand?.core}</p>
                    </div>
                  )}
                  {character?.wand?.length && (
                    <div className="field">
                      <h4>length</h4>: <p>{character?.wand?.length}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {character?.patronus && (
              <div className="field" style={{ color: '#cc0000' }}>
                <h4>Patronus</h4>: <p>{character?.patronus}</p>
              </div>
            )}
            {character?.hogwartsStudent && (
              <div className="field">
                <h4>Student of Hogwarts</h4>: <p>{character?.hogwartsStudent ? 'yes' : 'no'}</p>
              </div>
            )}
            {character?.hogwartsStaff && (
              <div className="field">
                <h4>Stuff of Hogwarts</h4>: <p>{character?.hogwartsStaff ? 'yes' : 'no'}</p>
              </div>
            )}
            {character?.alternate_actors && character?.alternate_actors.length > 0 && (
              <div className="field">
                <h4>Alternate actors</h4>:{' '}
                {character?.alternate_actors.map((actor) => (
                  <p key={actor}>{actor}</p>
                ))}
              </div>
            )}
            {character?.alive && (
              <div className="field">
                <h4>Alive</h4>: <p>{character?.alive ? 'yes' : 'no'}</p>
              </div>
            )}
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
                <span className="download-title">{character?.name} - </span>
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
      </div>
    </>
  );
};

export default Character;
