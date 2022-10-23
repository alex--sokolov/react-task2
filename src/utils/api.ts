import { IMovie } from '../interfaces';

export const getMoviesBySearch = async (search?: string): Promise<IMovie[] | unknown> => {
  const url = search
    ? `${process.env.REACT_APP_API_URL}?name=/${search}/i`
    : `${process.env.REACT_APP_API_URL}`;
  try {
    let data = [];
    const response = await fetch(url, {
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      }),
    });
    console.log('response.status', response.status);
    console.log('response.ok', response.ok);
    console.log('response', response);
    if (response.ok) {
      console.log('response.type', response.type);
      data = (await response.json()).docs;
      console.log('data', data);
      return data;
    } else {
      return {
        errorCode: response.status,
        errorMessage: response.statusText,
      };
    }
  } catch (error: unknown) {
    console.log('Error: ', error);
    return error;
  }
};
