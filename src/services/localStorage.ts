export const getSearchValue = (): string => {
  const searchValue = localStorage.getItem('searchValue');
  return searchValue ? JSON.parse(searchValue) : '';
};

export const setSearchValue = (value: string): void => {
  localStorage.setItem('searchValue', JSON.stringify(value));
};
