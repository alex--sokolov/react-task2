import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, IFormState } from '../interfaces';

export const initialFormState: IFormState = {
  title: '',
  overview: '',
  country: '',
  releaseDate: '',
  genre: Genre.default,
  isConfirmPolitics: false,
  adult: false,
  logo: undefined,
  isFormDisabled: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    updateTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    updateOverview(state, action: PayloadAction<string>) {
      state.overview = action.payload;
    },
    updateCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    updateReleaseDate(state, action: PayloadAction<string>) {
      state.releaseDate = action.payload;
    },
    updateGenre(state, action: PayloadAction<Genre>) {
      state.genre = action.payload;
    },
    updateIsConfirmPolitics(state, action: PayloadAction<boolean>) {
      state.isConfirmPolitics = action.payload;
    },
    updateAdult(state, action: PayloadAction<boolean>) {
      state.adult = action.payload;
    },
    updateLogo(state, action: PayloadAction<string | undefined>) {
      state.logo = action.payload;
    },
    resetFormState(state) {
      state.title = '';
      state.overview = '';
      state.country = '';
      state.releaseDate = '';
      state.genre = Genre.default;
      state.isConfirmPolitics = false;
      state.adult = false;
      state.logo = undefined;
      state.isFormDisabled = false;
    },
    updateIsFormDisabled(state, action: PayloadAction<boolean>) {
      state.isFormDisabled = action.payload;
    },
  },
});

export const {
  updateTitle,
  updateOverview,
  updateCountry,
  updateReleaseDate,
  updateGenre,
  updateIsConfirmPolitics,
  updateAdult,
  updateLogo,
  resetFormState,
  updateIsFormDisabled,
} = formSlice.actions;

export default formSlice.reducer;
