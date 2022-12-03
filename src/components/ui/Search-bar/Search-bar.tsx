import './Search-bar.scss';

import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CharactersRootState } from '../../../store';
import useCharactersReducer from '../../../hooks/useCharactersReducer';

const SearchBar = () => {
  const { searchTerm, characters, paginateInfo, sortInfo } = useSelector(
    (state: CharactersRootState) => state.characters
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

  const updateInitialState = async () => {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : '';

    updateSearch(search);

    if (Array.isArray(characters) && characters.length === 0) {
      await updateCharacters({
        page: paginateInfo.currentPage,
        limit: paginateInfo.limit,
        search,
        sortInfo,
      });
    }
  };

  const setStorageState = useCallback(updateInitialState, [
    characters,
    paginateInfo,
    sortInfo,
    updateSearch,
    updateCharacters,
  ]);

  useEffect(() => {
    setStorageState().catch(console.error);
  }, [setStorageState]);

  useEffect(() => {
    localStorage.setItem('searchValue', JSON.stringify(searchTerm));
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
