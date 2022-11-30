import { useContext } from 'react';
import { CardsContext } from '../components/Cards/CardsContext';

const useCards = () => {
  const context = useContext(CardsContext);

  if (context === undefined) {
    throw new Error('useCharacters must be used within CharactersContext');
  }

  return context;
};

export default useCards;
