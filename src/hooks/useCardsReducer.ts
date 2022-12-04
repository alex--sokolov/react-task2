import { addCard } from '../store/cardsSlice';

import { IForm } from '../interfaces';
import { useCardsDispatch } from '../store';

const useCardsReducer = () => {
  const dispatchCards = useCardsDispatch();
  const updateCards = (card: IForm) => dispatchCards(addCard(card));

  return { updateCards };
};

export default useCardsReducer;
