export const getMaxPage = (links: string[]) => {
  const maxPageStr: string | undefined = links[links.length - 1]
    .split(';')[0]
    .split('?')[1]
    .slice(0, -1)
    .split('&')
    .map((param) => param.split('='))
    .filter((param) => param[0] === '_page')[0][1];
  return maxPageStr ? Number(maxPageStr) : 1;
};
