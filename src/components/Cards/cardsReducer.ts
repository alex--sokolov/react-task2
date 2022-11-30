import { IActionCards, IForm, IStateCards } from '../../interfaces';

export const initialCardsState: IStateCards = {
  cards: [],
};

export const ADD_CARD = 'ADD_CARD';

const cardsReducer = (state: IStateCards, action: IActionCards): IStateCards => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARD:
      if (payload) {
        const newCard = payload;
        newCard.id = state.cards.length + 1;
        const newCards: IForm[] = state.cards;
        newCards.push(newCard);
        return {
          ...state,
          cards: newCards,
        };
      }
      return state;
    default:
      return state;
  }
};

export default cardsReducer;
