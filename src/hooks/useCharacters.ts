import { useContext } from 'react';
import { CharactersContext } from '../components/Characters/CharacterContext';

const useCharacters = () => {
  const context = useContext(CharactersContext);

  if (context === undefined) {
    throw new Error('useCharacters must be used within CharactersContext');
  }

  return context;
};

export default useCharacters;
