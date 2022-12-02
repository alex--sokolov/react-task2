import React, { useEffect, useState } from 'react';
import './Cards-list.scss';
import useCharacters from '../../../hooks/useCharacters';
import { ESortDirection, ESortField, ICharacter, NotifyType } from '../../../interfaces';
import Card from '../Card/Card';
import Notify from '../Notify/Notify';
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';
import { CharactersRootState, useCharactersDispatch } from '../../../store';
import { updateCharacters } from '../../../store/characterSlice';

const CardsList = () => {
  // const { characters, isLoading, paginateInfo, searchTerm, sortInfo, updateCharacters } =
  //   useCharacters();

  const { searchTerm, isLoading, characters, paginateInfo, sortInfo } = useSelector(
    (state: CharactersRootState) => state.characters
  );

  const dispatchCharacters = useCharactersDispatch();

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const [isShowError, setIsShowError] = useState<boolean>(false);

  const [paginationLinks, setPaginationLinks] = useState<number[]>([1]);

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
    await dispatchCharacters(updateCharacters({ page: 1, limit, search: searchTerm, sortInfo }));
  };

  const handleClickPagination = async (page: number) => {
    await dispatchCharacters(
      updateCharacters({ page, limit: paginateInfo.limit, search: searchTerm, sortInfo })
    );
  };

  const handleClickSort = async (el: HTMLDivElement | null) => {
    const field = el?.innerText as ESortField;
    const direction = el?.classList.contains(ESortDirection.asc)
      ? ESortDirection.desc
      : ESortDirection.asc;
    const sortInfo = el
      ? {
          field,
          direction,
        }
      : el;

    await dispatchCharacters(
      updateCharacters({
        page: paginateInfo.currentPage,
        limit: paginateInfo.limit,
        search: searchTerm,
        sortInfo,
      })
    );
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

  const paginateInfoNav = Array.isArray(characters) && characters.length > 0 && (
    <div className="pagination">
      {paginationLinks.map((link, index, links) => {
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

  const sortNameClazz = sortInfo?.field === ESortField.name ? `active ${sortInfo.direction}` : '';
  const sortSpeciesClazz =
    sortInfo?.field === ESortField.species ? `active ${sortInfo.direction}` : '';
  const sortImageClazz = sortInfo?.field === ESortField.image ? `active ${sortInfo.direction}` : '';
  const sortDefaultClazz = !sortInfo ? 'active' : '';

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
          {Array.isArray(characters) && characters.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginRight: '30px' }}>
              <div>Sort by:</div>
              <div
                className={`sort-field ${sortNameClazz}`}
                onClick={async (e) => {
                  await handleClickSort(e.target as HTMLDivElement);
                }}
              >
                {ESortField.name}
              </div>
              <div
                className={`sort-field ${sortSpeciesClazz}`}
                onClick={async (e) => {
                  await handleClickSort(e.target as HTMLDivElement);
                }}
              >
                {ESortField.species}
              </div>
              <div
                className={`sort-field ${sortImageClazz}`}
                onClick={async (e) => {
                  await handleClickSort(e.target as HTMLDivElement);
                }}
              >
                {ESortField.image}
              </div>
              <div
                className={`sort-field ${sortDefaultClazz}`}
                onClick={async () => {
                  await handleClickSort(null);
                }}
              >
                {ESortField.default}
              </div>
              <div style={{ marginLeft: '30px' }}>{limitResults}</div>
            </div>
          )}
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
