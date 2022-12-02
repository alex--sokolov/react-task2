import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import { useDispatch } from 'react-redux';

const storeCharacters = configureStore({
  reducer: {
    characters: characterReducer,
  },
});

export type CharactersRootState = ReturnType<typeof storeCharacters.getState>;

export default storeCharacters;

export type CharactersDispatch = typeof storeCharacters.dispatch;
export const useCharactersDispatch: () => CharactersDispatch = useDispatch;
