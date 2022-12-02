import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Search-bar.scss';
import useCharacters from '../../../hooks/useCharacters';
import { updateSearchTerm } from '../../../store/characterSlice';
import { CharactersRootState, useCharactersDispatch } from '../../../store';

const SearchBar = () => {
  // const { searchTerm, characters, paginateInfo, sortInfo, updateSearchTerm, updateCharacters } =
  //   useCharacters();

  const { updateCharacters } = useCharacters();

  const { searchTerm, characters, paginateInfo, sortInfo } = useSelector(
    (state: CharactersRootState) => state.characters
  );

  console.log('characters', characters);

  const dispatchCharacters = useCharactersDispatch();

  const updateSearch = (search: string) => dispatchCharacters(updateSearchTerm(search));

  const [initialState] = useState({
    characters,
    currentPage: paginateInfo.currentPage,
    limit: paginateInfo.limit,
    sortInfo,
    updateCharacters,
    updateSearchTerm,
  });

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
    // if (initialState.updateSearchTerm) {
    //   await initialState.updateSearchTerm(search);
    // }

    updateSearch(search);

    if (
      Array.isArray(initialState.characters) &&
      initialState.characters.length === 0 &&
      initialState.updateCharacters
    ) {
      await initialState.updateCharacters(
        search,
        initialState.currentPage,
        initialState.limit,
        initialState.sortInfo
      );
    }
  };

  const setStorageState = useCallback(updateInitialState, [initialState]);

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
          console.log('searchTerm: ', e.target.value);
          updateSearch(e.target.value);
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
