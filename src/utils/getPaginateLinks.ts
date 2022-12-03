const getPaginateLinks = (current: number, max: number) => {
  const paginateLinks = [1];

  if (current >= 2) {
    paginateLinks.push(current);
  }
  if (current > 2) {
    paginateLinks.push(current - 1);
  }
  if (current < max) {
    paginateLinks.push(max);
  }
  if (current < max - 1) {
    paginateLinks.push(current + 1);
  }
  paginateLinks.sort((a, b) => a - b);

  return paginateLinks;
};

export default getPaginateLinks;
