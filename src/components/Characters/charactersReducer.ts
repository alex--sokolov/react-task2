import {
  IActionCharacters,
  ICharacter,
  IFetchError,
  IFetchSuccess,
  IStateCharacter,
} from '../../interfaces';

export const initialCharactersState: IStateCharacter = {
  characters: [],
  searchTerm: '',
  paginateInfo: {
    currentPage: 1,
    maxPage: 1,
    limit: 10,
  },
  sortInfo: null,
  isLoading: false,
};

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const CHANGE_CHARACTERS_SUCCESS = 'CHANGE_CHARACTERS_SUCCESS';
export const CHANGE_CHARACTERS_ERROR = 'CHANGE_CHARACTERS_ERROR';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

const charactersReducer = (state: IStateCharacter, action: IActionCharacters): IStateCharacter => {
  const { type, payload } = action;
  console.log('action type: ', type, !state.isLoading);
  switch (type) {
    case CHANGE_CHARACTERS_SUCCESS:
      const newStateC = {
        ...state,
        characters: (payload as IFetchSuccess)?.data as ICharacter[],
        paginateInfo: (payload as IFetchSuccess)?.paginateInfo || state.paginateInfo,
        sortInfo: (payload as IFetchSuccess)?.sortInfo,
      };
      console.log('newState changecharacters: ', newStateC);
      return newStateC;
    case CHANGE_CHARACTERS_ERROR:
      const newStateE = {
        ...state,
        characters: payload as IFetchError,
      };
      console.log('newState changecharacters: ', newStateE);
      return newStateE;
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
