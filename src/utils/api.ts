import { Errors, ICharacter, IMovie } from '../interfaces';

export const getCharactersBySearch = async (search?: string): Promise<IMovie[] | unknown> => {
  const url = search
    ? `${process.env.REACT_APP_API_HARRY_URL}?name_like=${search}`
    : `${process.env.REACT_APP_API_HARRY_URL}`;

  let data: ICharacter[] = [];
  const response = await fetch(url, {
    headers: new Headers({
      Accept: 'application/json',
    }),
  });
  if (response.ok) {
    data = await response.json();
    return data;
  }

  console.log('response: ', response);

  return {
    errorCode: response.status,
    errorMessage: response.statusText || Errors[404],
  };
};
