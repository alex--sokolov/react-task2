import React, { createContext, useReducer } from 'react';
import charactersReducer, { ADD_CARD, initialCardsState } from './cardsReducer';
import { IForm, Props } from '../../interfaces';

export const CardsContext = createContext(initialCardsState);

const CardsProvider = (props: Props) => {
  const [state, dispatch] = useReducer(charactersReducer, initialCardsState);

  const addCard = (card: IForm): void => {
    dispatch({
      type: ADD_CARD,
      payload: card,
    });
  };

  const value = {
    cards: state.cards,
    addCard,
  };
  return <CardsContext.Provider value={value}>{props.children}</CardsContext.Provider>;
};

export default CardsProvider;
