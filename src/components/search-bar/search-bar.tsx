import React, { useCallback, useEffect, useState } from 'react';
import './search-bar.scss';
import { IFetchError, IMovie } from '../../interfaces';
import { getMoviesBySearch } from '../../utils/api';

const SearchBar = (props: {
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFetchError: React.Dispatch<React.SetStateAction<IFetchError | null>>;
  setIsShowError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setMovies, setIsLoading, setFetchError, setIsShowError } = props;

  const [searchValue, setSearchValue] = useState<string>('');

  const getAPIMovies = async (search: string): Promise<void> => {
    const data = await getMoviesBySearch(search);
    if (Array.isArray(data)) {
      setMovies(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setFetchError(data as IFetchError);
      setIsShowError(true);

      setTimeout(() => {
        setIsShowError(false);
      }, 2000);

      setTimeout(() => {
        setFetchError(null);
      }, 2500);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      await getAPIMovies(searchValue);
    }
  };

  const getInitialMovies = useCallback(getAPIMovies, [
    setFetchError,
    setIsLoading,
    setMovies,
    setIsShowError,
  ]);

  useEffect(() => {
    const searchValue = localStorage.getItem('searchValue');
    const search = searchValue ? JSON.parse(searchValue) : '';
    getInitialMovies(search).catch(console.error);
    setSearchValue(search);
  }, [getInitialMovies]);

  useEffect(() => {
    localStorage.setItem('searchValue', JSON.stringify(searchValue));
  }, [searchValue]);

  return (
    <section className="search-bar">
      <input
        id="search"
        type="text"
        data-testid="search"
        className="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <label
        htmlFor="search"
        className="search-icon"
        data-testid="label-search"
        onClick={() => getAPIMovies(searchValue)}
      />
    </section>
  );
};

export default SearchBar;
