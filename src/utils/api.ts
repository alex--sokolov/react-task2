import { Errors, ICharacter, IFetchError, IFetchSuccess, ISortInfo } from '../interfaces';

export const getCharactersBySearch = async (
  page: number,
  limit: number,
  search: string,
  sortInfo: ISortInfo | null
): Promise<IFetchSuccess | IFetchError> => {
  let url = search
    ? `${process.env.REACT_APP_API_HARRY_URL}?name_like=${search}&_page=${page}&_limit=${limit}`
    : `${process.env.REACT_APP_API_HARRY_URL}?_page=${page}&_limit=${limit}`;

  if (sortInfo) {
    url += `&_sort=${sortInfo.field}&_order=${sortInfo.direction}`;
  }

  let data: ICharacter[] = [];
  const response = await fetch(url, {
    headers: new Headers({
      Accept: 'application/json',
    }),
  });
  if (response.ok) {
    console.log('response.headers', response.headers.get('link'));
    const responseHeaders = response.headers.get('link')?.split(',');
    console.log('responseHeaders', responseHeaders);
    data = await response.json();
    if (responseHeaders && Array.isArray(responseHeaders)) {
      const maxPageStr: string | undefined = responseHeaders[responseHeaders.length - 1]
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
      console.log('paginateInfo: ', paginateInfo);
      console.log('data: ', data);
      console.log('api sortInfo: ', sortInfo);
      return {
        data,
        paginateInfo,
        sortInfo,
      };
    }

    return {
      data,
      paginateInfo: {
        currentPage: 1,
        maxPage: 1,
        limit: limit,
      },
      sortInfo,
    };
  }

  console.log('response: ', response);

  return {
    errorCode: response.status,
    errorMessage: response.statusText || Errors[404],
  };
};
