import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './search-bar';
import userEvent from '@testing-library/user-event/dist';

describe('SearchBar', () => {
  const setMovies = jest.fn();
  const setIsLoading = jest.fn();
  const setFetchError = jest.fn();
  const setIsShowError = jest.fn();

  it('renders SearchBar component', async () => {
    render(
      <SearchBar
        setMovies={setMovies}
        setIsLoading={setIsLoading}
        setFetchError={setFetchError}
        setIsShowError={setIsShowError}
      />
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByTestId('label-search')).toBeInTheDocument();
  });

  it('Should call localStorage setItem on text change', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    render(
      <SearchBar
        setMovies={setMovies}
        setIsLoading={setIsLoading}
        setFetchError={setFetchError}
        setIsShowError={setIsShowError}
      />
    );
    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
    expect(screen.queryByText('test')).toBeNull();
    userEvent.type(search, 'test');
    expect((await screen.queryByDisplayValue('test')) as HTMLElement).toBeInTheDocument();
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(4);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchValue', '"test"');
  });
});
