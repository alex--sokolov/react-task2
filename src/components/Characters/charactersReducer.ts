import { IActionCharacters, ICharacter, IFetchError, IStateCharacter } from '../../interfaces';

export const initialCharactersState: IStateCharacter = {
  characters: [],
  searchTerm: '',
  isLoading: false,
};

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const CHANGE_CHARACTERS = 'CHANGE_CHARACTERS';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

const charactersReducer = (state: IStateCharacter, action: IActionCharacters): IStateCharacter => {
  const { type, payload } = action;
  console.log('action type: ', type, !state.isLoading);
  switch (type) {
    case CHANGE_CHARACTERS:
      return { ...state, characters: payload as ICharacter[] | IFetchError };
    case CHANGE_SEARCH_TERM:
      return { ...state, searchTerm: payload as string };
    case TOGGLE_LOADING:
      const newState = { ...state, isLoading: !state.isLoading };
      console.log('newState: ', newState);
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export default charactersReducer;
