import { ISortInfo } from '../interfaces';

export const getCharacters = (
  page: number,
  limit: number,
  search: string,
  sortInfo: ISortInfo | null
) => {
  let url = search
    ? `${process.env.REACT_APP_API_HARRY_URL}?name_like=${search}&_page=${page}&_limit=${limit}`
    : `${process.env.REACT_APP_API_HARRY_URL}?_page=${page}&_limit=${limit}`;

  if (sortInfo) {
    url += `&_sort=${sortInfo.field}&_order=${sortInfo.direction}`;
  }

  return fetch(url, {
    headers: new Headers({
      Accept: 'application/json',
    }),
  });
};
