import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import characterReducer from './characterSlice';
import cardsReducer from './cardsSlice';
import formReducer from './formSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    cards: cardsReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type CharactersDispatch = typeof store.dispatch;
export type CardsDispatch = typeof store.dispatch;
export type FormDispatch = typeof store.dispatch;
export const useCharactersDispatch: () => CharactersDispatch = useDispatch;
export const useCardsDispatch: () => CardsDispatch = useDispatch;
export const useFormDispatch: () => FormDispatch = useDispatch;
