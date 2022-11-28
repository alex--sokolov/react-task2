import { Errors, ICharacter, IFetchError, IFetchSuccess } from '../interfaces';

export const getCharactersBySearch = async (
  page: number,
  limit: number,
  search?: string
): Promise<IFetchSuccess | IFetchError> => {
  const url = search
    ? `${process.env.REACT_APP_API_HARRY_URL}?name_like=${search}&_page=${page}&_limit=${limit}`
    : `${process.env.REACT_APP_API_HARRY_URL}?_page=${page}&_limit=${limit}`;

  let data: ICharacter[] = [];
  const response = await fetch(url, {
    headers: new Headers({
      Accept: 'application/json',
    }),
  });
  if (response.ok) {
    console.log('response.headers', response.headers.get('link'));
    const maxPageStr: string | undefined = response.headers
      .get('link')
      ?.split(',')[2]
      .split(';')[0]
      .split('?')[1]
      .slice(0, -1)
      .split('&')
      .map((param) => param.split('='))
      .filter((param) => param[0] === '_page')[0][1];
    const maxPage = maxPageStr ? Number(maxPageStr) : 1;
    const paginateInfo = {
      currentPage: page,
      maxPage,
      limit,
    };
    // console.log('response.headers', response.headers.get('link'));
    data = await response.json();
    console.log('paginateInfo: ', paginateInfo);
    console.log('data: ', data);
    return {
      data,
      paginateInfo,
    };
  }

  console.log('response: ', response);

  return {
    errorCode: response.status,
    errorMessage: response.statusText || Errors[404],
  };
};
