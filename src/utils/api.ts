import { IMovie } from '../interfaces';

export const getMoviesBySearch = async (search?: string): Promise<IMovie[] | unknown> => {
  const url = search
    ? `${process.env.REACT_APP_API_URL}?name=/${search}/i`
    : `${process.env.REACT_APP_API_URL}`;

  let data: IMovie[] = [];
  const response = await fetch(url, {
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    }),
  });
  if (response.ok) {
    data = (await response.json()).docs;
    return data;
  }
  return {
    errorCode: response.status,
    errorMessage: response.statusText,
  };
};
