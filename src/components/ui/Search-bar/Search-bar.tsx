import './Search-bar.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import useCharactersReducer from '../../../hooks/useCharactersReducer';
import { getSearchValue, setSearchValue } from '../../../services/localStorage';

const searchTermLocal = getSearchValue();

const SearchBar = () => {
  const { searchTerm, characters, paginateInfo, sortInfo } = useSelector(
    (state: RootState) => state.characters
  );

  const { updateSearch, updateCharacters } = useCharactersReducer();

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      await updateCharacters({
        page: paginateInfo.currentPage,
        limit: paginateInfo.limit,
        search: searchTerm,
        sortInfo,
      });
    }
  };

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const updateInitialState = async () => {
    if (!searchTerm && searchTermLocal) {
      updateSearch(searchTermLocal);
    }
    if (Array.isArray(characters) && characters.length === 0) {
      await updateCharacters({
        page: paginateInfo.currentPage,
        limit: paginateInfo.limit,
        search: searchTermLocal,
        sortInfo,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setStorageState = useCallback(updateInitialState, []);

  useEffect(() => {
    if (isFirstLoad) {
      setStorageState().catch(console.error);
    }
    setIsFirstLoad(false);
  }, [isFirstLoad, setStorageState]);

  useEffect(() => {
    setSearchValue(searchTerm);
  }, [searchTerm]);

  return (
    <section className="search-bar">
      <input
        id="search"
        type="text"
        data-testid="search"
        className="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          updateSearch(e.target.value);
        }}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <label
        htmlFor="search"
        className="search-icon"
        data-testid="label-search"
        onClick={async () => {
          await updateCharacters({
            page: paginateInfo.currentPage,
            limit: paginateInfo.limit,
            search: searchTerm,
            sortInfo,
          });
        }}
      />
    </section>
  );
};

export default SearchBar;
