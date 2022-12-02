import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter, IFetchSuccess, IStateCharacter } from '../interfaces';

const initialCharacterState: IStateCharacter = {
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

const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharacterState,
  reducers: {
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    updateCharactersSuccess(state, action) {
      console.log('updateCharactersSuccess');
      console.log('state', state);
      console.log('action', action);
      state.characters = (action.payload as IFetchSuccess)?.data as ICharacter[];
      state.paginateInfo = (action.payload as IFetchSuccess)?.paginateInfo || state.paginateInfo;
      state.sortInfo = (action.payload as IFetchSuccess)?.sortInfo;
    },
    updateCharactersError(state, action) {},
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { toggleLoading, updateCharactersSuccess, updateCharactersError, updateSearchTerm } =
  charactersSlice.actions;

export default charactersSlice.reducer;
