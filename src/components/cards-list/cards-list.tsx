import React from 'react';
import './cards-list.scss';
import { ICharacter, NotifyType } from '../../interfaces';
import Spinner from '../spinner/spinner';
import Card from '../card/card';
import Notify from '../notify/notify';
import useCharacters from '../../hooks/useCharacters';

const CardsList = () => {
  const { characters, isLoading } = useCharacters();

  const charactersList =
    Array.isArray(characters) &&
    characters.length > 0 &&
    characters.map((character: ICharacter) => {
      const altName =
        character.alternate_names.length > 0 ? '-' + character.alternate_names[0] : '';
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
    });

  return (
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
