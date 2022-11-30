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
  switch (type) {
    case CHANGE_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: (payload as IFetchSuccess)?.data as ICharacter[],
        paginateInfo: (payload as IFetchSuccess)?.paginateInfo || state.paginateInfo,
        sortInfo: (payload as IFetchSuccess)?.sortInfo,
      };
    case CHANGE_CHARACTERS_ERROR:
      return {
        ...state,
        characters: payload as IFetchError,
      };
    case CHANGE_SEARCH_TERM:
      return { ...state, searchTerm: payload as string };
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export default charactersReducer;
