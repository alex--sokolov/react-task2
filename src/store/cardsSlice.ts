import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IForm, IStateCards } from '../interfaces';

export const initialCardsState: IStateCards = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialCardsState,
  reducers: {
    addCard(state, action: PayloadAction<IForm>) {
      action.payload.id = state.cards.length + 1;
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;
