import './Card.scss';

import React, { useMemo } from 'react';
import { ICharacter } from '../../../interfaces';
import { Link } from 'react-router-dom';

const Card = (props: { character: ICharacter }) => {
  const { character } = props;

  const uniqueUrl = useMemo(() => {
    const altName = character.alternate_names.length > 0 ? '-' + character.alternate_names[0] : '';
    return '/character/' + character.name + altName;
  }, [character]);

  return (
    <>
      <Link to={uniqueUrl} className={`character`}>
        <h3 className="title">{character.name}</h3>
        {character.image ? (
          <div className="photo">
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
                {character.alternate_names.map((name: string) => (
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
      </Link>
    </>
  );
};

export default Card;
