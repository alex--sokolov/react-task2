import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Search-bar.scss';
import useCharacters from '../../../hooks/useCharacters';
import {
  updateSearchTerm,
  updateCharacters,
  initialCharacterState,
} from '../../../store/characterSlice';
import { CharactersRootState, useCharactersDispatch } from '../../../store';

const SearchBar = () => {
  // const { searchTerm, characters, paginateInfo, sortInfo, updateSearchTerm, updateCharacters } =
  //   useCharacters();

  // const { updateCharacters } = useCharacters();

  const { searchTerm, characters, paginateInfo, sortInfo } = useSelector(
    (state: CharactersRootState) => state.characters
  );

  console.log('characters', characters);
  console.log('paginateInfo', paginateInfo);
  console.log('currentPage', paginateInfo.currentPage);
  console.log('sortInfo', sortInfo);

  const dispatchCharacters = useCharactersDispatch();

  const updateSearch = (search: string) => dispatchCharacters(updateSearchTerm(search));

  // const [initialState] = useState({
  //   characters,
  //   currentPage: paginateInfo.currentPage,
  //   limit: paginateInfo.limit,
  //   sortInfo,
  //   updateCharacters,
  //   updateSearchTerm,
  // });

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatchCharacters(
        updateCharacters({
          page: paginateInfo.currentPage,
          limit: paginateInfo.limit,
          search: searchTerm,
          sortInfo,
        })
      );
    }
  };

  const updateInitialState = async () => {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : '';
    // if (initialState.updateSearchTerm) {
    //   await initialState.updateSearchTerm(search);
    // }

    updateSearch(search);

    if (Array.isArray(characters) && characters.length === 0 && updateCharacters) {
      await dispatchCharacters(
        updateCharacters({
          page: paginateInfo.currentPage,
          limit: paginateInfo.limit,
          search: searchTerm,
          sortInfo,
        })
      );
    }
  };

  const setStorageState = useCallback(updateInitialState, [initialCharacterState]);

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
          dispatchCharacters(updateSearch(e.target.value));
        }}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <label
        htmlFor="search"
        className="search-icon"
        data-testid="label-search"
        onClick={async () => {
          if (updateCharacters) {
            await dispatchCharacters(
              updateCharacters({
                page: paginateInfo.currentPage,
                limit: paginateInfo.limit,
                search: searchTerm,
                sortInfo,
              })
            );
          }
        }}
      />
    </section>
  );
};

export default SearchBar;
