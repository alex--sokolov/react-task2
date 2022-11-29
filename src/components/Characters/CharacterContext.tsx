import React, { createContext, useReducer } from 'react';
import charactersReducer, {
  CHANGE_CHARACTERS_SUCCESS,
  CHANGE_CHARACTERS_ERROR,
  CHANGE_SEARCH_TERM,
  initialCharactersState,
  TOGGLE_LOADING,
} from './charactersReducer';
import { IFetchError, IFetchSuccess, ISortInfo } from '../../interfaces';
import { getCharactersBySearch } from '../../utils/api';

export const CharactersContext = createContext(initialCharactersState);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const CharactersProvider = (props: Props) => {
  const [state, dispatch] = useReducer(charactersReducer, initialCharactersState);

  const toggleLoading = () => {
    dispatch({
      type: TOGGLE_LOADING,
    });
  };

  const updateCharacters = async (
    searchTerm: string,
    page: number,
    limit: number,
    sortInfo: ISortInfo | null
  ) => {
    toggleLoading();
    const charactersInfo: IFetchSuccess | IFetchError = (await getCharactersBySearch(
      page,
      limit,
      searchTerm,
      sortInfo
    )) as IFetchSuccess | IFetchError;

    if (
      'data' in charactersInfo &&
      'paginateInfo' in charactersInfo &&
      charactersInfo?.data &&
      charactersInfo?.paginateInfo
    ) {
      dispatch({
        type: CHANGE_CHARACTERS_SUCCESS,
        payload: charactersInfo,
      });
    }

    if ('errorCode' in charactersInfo && charactersInfo?.errorCode) {
      dispatch({
        type: CHANGE_CHARACTERS_ERROR,
        payload: charactersInfo,
      });
    }
    toggleLoading();
  };

  const updateSearchTerm = (searchTerm: string) => {
    dispatch({
      type: CHANGE_SEARCH_TERM,
      payload: searchTerm,
    });
  };

  const value = {
    characters: state.characters,
    searchTerm: state.searchTerm,
    paginateInfo: state.paginateInfo,
    sortInfo: state.sortInfo,
    isLoading: state.isLoading,
    toggleLoading,
    updateCharacters,
    updateSearchTerm,
  };
  return <CharactersContext.Provider value={value}>{props.children}</CharactersContext.Provider>;
};

export default CharactersProvider;
