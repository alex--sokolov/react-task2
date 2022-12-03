import { updateSearchTerm, updateCharactersList } from '../store/characterSlice';

import { ISortInfo } from '../interfaces';
import { useCharactersDispatch } from '../store';

const useCharactersReducer = () => {
  const dispatchCharacters = useCharactersDispatch();
  const updateSearch = (search: string) => dispatchCharacters(updateSearchTerm(search));
  const updateCharacters = ({
    page,
    limit,
    search,
    sortInfo,
  }: {
    page: number;
    limit: number;
    search: string;
    sortInfo: ISortInfo | null;
  }) => dispatchCharacters(updateCharactersList({ page, limit, search, sortInfo }));

  return { updateSearch, updateCharacters };
};

export default useCharactersReducer;
