import React, { useEffect, useState } from 'react';
import './Cards-list.scss';
import useCharacters from '../../../hooks/useCharacters';
import { ICharacter, NotifyType } from '../../../interfaces';
import Card from '../Card/Card';
import Notify from '../Notify/Notify';
import Spinner from '../Spinner/Spinner';

const CardsList = () => {
  const { characters, isLoading, paginateInfo, searchTerm, updateCharacters } = useCharacters();

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const [isShowError, setIsShowError] = useState<boolean>(false);

  const [paginationLinks, setPaginationLinks] = useState<number[]>([1]);

  console.log('PAGINATION: ', paginationLinks);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    const current = paginateInfo.currentPage;
    const max = paginateInfo.maxPage;
    const pagLinks = [1];

    if (current >= 2) {
      pagLinks.push(current);
    }
    if (current > 2) {
      pagLinks.push(current - 1);
    }
    if (current < max) {
      pagLinks.push(max);
    }
    if (current < max - 1) {
      pagLinks.push(current + 1);
    }
    pagLinks.sort((a, b) => a - b);
    setPaginationLinks(pagLinks);
  }, [paginateInfo.currentPage, paginateInfo.maxPage]);

  useEffect(() => {
    if (!Array.isArray(characters)) {
      setIsShowError(true);
    }
    setTimeout(() => {
      setIsShowError(false);
    }, 3000);
  }, [characters]);

  const charactersList = (Array.isArray(characters) &&
    characters.length > 0 &&
    characters.map((character: ICharacter) => {
      const altName =
        character.alternate_names.length > 0 ? '-' + character.alternate_names[0] : '';
      const uniqueKey = character.name + altName;
      return <Card character={character} key={uniqueKey} />;
    })) || (
    <div style={{ margin: '0 auto' }}>
      Nothing is found{' '}
      {Array.isArray(characters) ? (
        <>
          for <i style={{ color: 'darkred' }}>{searchTerm}</i>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const handleChangeLimit = async (limit: number) => {
    if (updateCharacters) {
      await updateCharacters(searchTerm, 1, limit);
    }
  };

  const handleClickPagination = async (page: number) => {
    if (updateCharacters) {
      await updateCharacters(searchTerm, page, paginateInfo.limit);
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
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </>
  );

  // <div className="pagination">
  //   {paginationLinks.map((link, index, links) => {
  //     console.log(link);
  //     const activeClazz = link === paginateInfo.currentPage ? 'active' : '';
  //     const pointsClazz = index > 0 && links[index - 1] < links[index] - 1 ? 'points' : '';
  //     return (
  //       <div
  //         key={crypto.randomUUID()}
  //         onClick={async (e) => {
  //           await handleClickPagination(+(e.target as HTMLElement).innerText);
  //         }}
  //         className={`${activeClazz} ${pointsClazz}`}
  //       >
  //         {link}
  //       </div>
  //     );
  //   })}
  // </div>

  const paginateInfoNav = Array.isArray(characters) && characters.length > 0 && (
    <div className="pagination">
      {paginationLinks.map((link, index, links) => {
        console.log(link);
        const activeClazz = link === paginateInfo.currentPage ? 'active' : '';
        return (
          <div key={crypto.randomUUID()} style={{ display: 'flex' }}>
            {index > 0 && links[index - 1] < links[index] - 1 && <div>...</div>}
            <div
              key={crypto.randomUUID()}
              onClick={async (e) => {
                await handleClickPagination(+(e.target as HTMLElement).innerText);
              }}
              className={`link ${activeClazz}`}
            >
              {link}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {!isFirstRender ? (
        <section className="cards-list" data-testid="cards-list">
          <Notify
            isShow={isShowError}
            message={
              !Array.isArray(characters)
                ? `${characters?.errorCode} | ${characters?.errorMessage}`
                : ''
            }
            type={NotifyType.ERROR}
          />
          <h1>Harry Potter characters</h1>
          {limitResults}
          {isLoading ? (
            <div className="spinner" style={{ position: 'absolute' }}>
              <Spinner isLoading />
            </div>
          ) : (
            <>
              <div className="characters-list">{charactersList}</div>
              {paginateInfoNav}
            </>
          )}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default CardsList;
