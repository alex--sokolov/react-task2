import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Errors, ISortInfo, IStateCharacter } from '../interfaces';
import { getCharacters } from '../utils/api';
import { getMaxPage } from '../utils/getMaxPage';

export const initialCharacterState: IStateCharacter = {
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

export const updateCharacters = createAsyncThunk(
  'characters/updateCharacters',
  async (
    {
      page,
      limit,
      search,
      sortInfo,
    }: { page: number; limit: number; search: string; sortInfo: ISortInfo | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCharacters(page, limit, search, sortInfo);
      if (!response.ok) {
        throw new Error(
          JSON.stringify({
            errorCode: response.status,
            errorMessage: response.statusText || Errors[404],
          })
        );
      }
      const responseHeadersLinks = response.headers.get('link')?.split(',');
      const characters = await response.json();
      if (responseHeadersLinks && Array.isArray(responseHeadersLinks)) {
        const maxPage = getMaxPage(responseHeadersLinks);
        return {
          characters,
          paginateInfo: {
            currentPage: page,
            maxPage,
            limit,
          },
          sortInfo,
        };
      }

      return {
        characters,
        paginateInfo: {
          currentPage: 1,
          maxPage: 1,
          limit: limit,
        },
        sortInfo,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharacterState,
  reducers: {
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    updateSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCharacters.pending, (state) => {
        state.isLoading = true;
        state.characters = [];
      })
      .addCase(updateCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.characters;
        state.paginateInfo = action.payload.paginateInfo;
        state.sortInfo = action.payload.sortInfo;
      })
      .addCase(updateCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.characters = JSON.parse((action.payload as Error)?.message);
      });
  },
});

export const { toggleLoading, updateSearchTerm } = charactersSlice.actions;

export default charactersSlice.reducer;
