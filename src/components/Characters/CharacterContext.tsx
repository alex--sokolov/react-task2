import React, { createContext, useContext, useReducer } from 'react';
import charactersReducer, {
  CHANGE_CHARACTERS,
  CHANGE_SEARCH_TERM,
  initialCharactersState,
  TOGGLE_LOADING,
} from './charactersReducer';
import { ICharacter, IFetchError } from '../../interfaces';
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

  const updateCharacters = async (searchTerm: string) => {
    toggleLoading();
    const characters: ICharacter[] | IFetchError = (await getCharactersBySearch(searchTerm)) as
      | ICharacter[]
      | IFetchError;
    // console.log('characters from context: ', characters);
    // console.log('state from context: ', state);
    dispatch({
      type: CHANGE_CHARACTERS,
      payload: characters,
    });
    toggleLoading();
    if (!Array.isArray(characters)) {
      setTimeout(() => {
        dispatch({
          type: CHANGE_CHARACTERS,
          payload: [],
        });
      }, 3000);
    }
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
    isLoading: state.isLoading,
    toggleLoading,
    updateCharacters,
    updateSearchTerm,
  };
  return <CharactersContext.Provider value={value}>{props.children}</CharactersContext.Provider>;
};

export default CharactersProvider;
