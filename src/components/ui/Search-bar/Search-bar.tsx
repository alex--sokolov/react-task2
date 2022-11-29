import React, { useCallback, useEffect } from 'react';
import './Search-bar.scss';
import useCharacters from '../../../hooks/useCharacters';

const SearchBar = () => {
  const { searchTerm, characters, paginateInfo, sortInfo, updateSearchTerm, updateCharacters } =
    useCharacters();

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (updateCharacters) {
        await updateCharacters(searchTerm, paginateInfo.currentPage, paginateInfo.limit, sortInfo);
      }
    }
  };

  const updateInitialState = async () => {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : '';
    if (updateSearchTerm) {
      await updateSearchTerm(search);
    }

    if (Array.isArray(characters) && characters.length === 0 && updateCharacters) {
      await updateCharacters(search, paginateInfo.currentPage, paginateInfo.limit, sortInfo);
    }
  };

  const setStorageState = useCallback(updateInitialState, [
    characters,
    paginateInfo.currentPage,
    paginateInfo.limit,
    sortInfo,
    updateCharacters,
    updateSearchTerm,
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
          if (updateSearchTerm) {
            console.log('searchTerm: ', e.target.value);
            updateSearchTerm(e.target.value);
          }
        }}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <label
        htmlFor="search"
        className="search-icon"
        data-testid="label-search"
        onClick={async () => {
          if (updateCharacters) {
            await updateCharacters(
              searchTerm,
              paginateInfo.currentPage,
              paginateInfo.limit,
              sortInfo
            );
          }
        }}
      />
    </section>
  );
};

export default SearchBar;
