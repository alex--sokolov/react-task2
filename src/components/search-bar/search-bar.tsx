import React, { useCallback, useContext, useEffect, useState } from 'react';
import './search-bar.scss';
import { IFetchError, IMovie } from '../../interfaces';
import { getCharactersBySearch } from '../../utils/api';
import useCharacters from '../Characters/CharacterContext';

// const SearchBar = (props: {
//   setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setFetchError: React.Dispatch<React.SetStateAction<IFetchError | null>>;
//   setIsShowError: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const { setMovies, setIsLoading, setFetchError, setIsShowError } = props;
const SearchBar = () => {
  // const [searchValue, setSearchValue] = useState<string>('');

  const { searchTerm, updateSearchTerm, updateCharacters, toggleLoading } = useCharacters();

  // const getAPIMovies = async (search: string): Promise<void> => {
  //   const data = await getMoviesBySearch(search);
  //   if (Array.isArray(data)) {
  //     setMovies(data);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     setFetchError(data as IFetchError);
  //     setIsShowError(true);
  //
  //     setTimeout(() => {
  //       setIsShowError(false);
  //     }, 2000);
  //
  //     setTimeout(() => {
  //       setFetchError(null);
  //     }, 2500);
  //   }
  // };

  // const getAPICharacters = async (search: string): Promise<void> => {
  //   const data = await getCharactersBySearch(search);
  //   console.log('data: ', data);
  //   if (Array.isArray(data)) {
  //     setMovies(data);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     setFetchError(data as IFetchError);
  //     setIsShowError(true);
  //
  //     setTimeout(() => {
  //       setIsShowError(false);
  //     }, 2000);
  //
  //     setTimeout(() => {
  //       setFetchError(null);
  //     }, 2500);
  //   }
  // };

  // const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.code === 'Enter') {
  //     await getAPIMovies(searchValue);
  //   }
  // };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (updateCharacters) {
        await updateCharacters(searchTerm);
      }
    }
  };

  // const getInitialMovies = useCallback(getAPICharacters, [
  //   setFetchError,
  //   setIsLoading,
  //   setMovies,
  //   setIsShowError,
  // ]);

  // const getInitialCharacters = useCallback(getAPICharacters, [
  //   setFetchError,
  //   setIsLoading,
  //   setMovies,
  //   setIsShowError,
  // ]);

  // useEffect(() => {
  //   const searchValue = localStorage.getItem('searchValue');
  //   const search = searchValue ? JSON.parse(searchValue) : '';
  //   getInitialMovies(search).catch(console.error);
  //   setSearchValue(search);
  // }, [getInitialMovies]);
  //
  // useEffect(() => {
  //   const searchValue = localStorage.getItem('searchValue');
  //   const search = searchValue ? JSON.parse(searchValue) : '';
  //   getInitialCharacters(search).catch(console.error);
  //   setSearchValue(search);
  // }, [getInitialCharacters]);

  // useEffect(() => {
  //   const searchValue = localStorage.getItem('searchValue');
  //   const search = searchValue ? JSON.parse(searchValue) : '';
  //   getInitialCharacters(search).catch(console.error);
  //   setSearchValue(search);
  // }, [getInitialCharacters]);

  // useEffect(() => {
  //   localStorage.setItem('searchValue', JSON.stringify(searchTerm));
  // }, [searchTerm]);

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
        // onClick={() => getAPIMovies(searchValue)}
        onClick={async () => {
          // if (toggleLoading) {
          //   toggleLoading();
          // }
          if (updateCharacters) {
            await updateCharacters(searchTerm);
          }
          // if (toggleLoading) {
          //   toggleLoading();
          // }
        }}
      />
    </section>
  );
};

export default SearchBar;
