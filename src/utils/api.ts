import {Errors, ICharacter, IMovie} from '../interfaces';
//
// export const getMoviesBySearch = async (search?: string): Promise<IMovie[] | unknown> => {
//   const url = search
//     ? `${process.env.REACT_APP_API_URL}?name=/${search}/i`
//     : `${process.env.REACT_APP_API_URL}`;
//
//   let data: IMovie[] = [];
//   const response = await fetch(url, {
//     headers: new Headers({
//       Accept: 'application/json',
//       Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
//     }),
//   });
//   if (response.ok) {
//     data = (await response.json()).docs;
//     return data;
//   }
//   return {
//     errorCode: response.status,
//     errorMessage: response.statusText,
//   };
// };

export const getCharactersBySearch = async (search?: string): Promise<IMovie[] | unknown> => {
  const url = search
    ? `${process.env.REACT_APP_API_HARRY_URL}1?name_like=${search}`
    : `${process.env.REACT_APP_API_HARRY_URL}1`;

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
