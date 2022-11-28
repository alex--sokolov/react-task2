import React from 'react';
import './Cards-list.scss';
import useCharacters from '../../../hooks/useCharacters';
import { ICharacter, NotifyType } from '../../../interfaces';
import Card from '../Card/Card';
import Notify from '../Notify/Notify';
import Spinner from '../Spinner/Spinner';

const CardsList = () => {
  const { characters, isLoading, paginateInfo, searchTerm, updateCharacters } = useCharacters();

  const charactersList = (Array.isArray(characters) &&
    characters.length > 0 &&
    characters.map((character: ICharacter) => {
      const altName =
        character.alternate_names.length > 0 ? '-' + character.alternate_names[0] : '';
      const uniqueKey = character.name + altName;
      return <Card character={character} key={uniqueKey} />;
    })) || (
    <div style={{ margin: '0 auto' }}>
      Nothing is found for <i style={{ color: 'darkred' }}>{searchTerm}</i>
    </div>
  );

  const handleChangeLimit = async (limit: number) => {
    if (updateCharacters) {
      await updateCharacters(searchTerm, paginateInfo.currentPage, limit);
    }
  };

  const limitResults = Array.isArray(characters) && characters.length > 0 && (
    <>
      <select
        className="limit"
        value={paginateInfo.limit}
        onChange={(e) => handleChangeLimit(+e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="100">100</option>
      </select>
    </>
  );

  const paginateInfoNav = Array.isArray(characters) && characters.length > 0 && (
    <form className="paginate-info">
      <input type="text" />
    </form>
  );

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
          {limitResults}
          <div className="characters-list">{charactersList}</div>
          {paginateInfoNav}
        </>
      )}
    </section>
  );
};

export default CardsList;
