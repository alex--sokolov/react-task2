import { IActionCards, IForm, IStateCards } from '../../interfaces';

export const initialCardsState: IStateCards = {
  cards: [],
};

export const ADD_CARD = 'ADD_CARD';

const cardsReducer = (state: IStateCards, action: IActionCards): IStateCards => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARD:
      const newCards: IForm[] = state.cards;
      if (payload) {
        newCards.push(payload);
      }

      console.log('newCards: ', newCards);

      return {
        ...state,
        cards: newCards,
      };
    default:
      return state;
  }
};

export default cardsReducer;
