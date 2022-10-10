import { Genre } from '../interfaces';

export const isValidMin = (str: string, min: number): boolean => str.length >= min;
export const isValidMax = (str: string, max: number): boolean => str.length <= max;
export const isValidOnlyEnglishSymbols = (str: string): boolean => {
  const onlyEn = /^[a-z]+$/i;
  return onlyEn.test(str);
};
export const isValidDate = (dateRelease: string, minDate: string, maxDate: string): boolean => {
  const timeRelease = new Date(dateRelease).getTime();
  const minTime = new Date(minDate).getTime();
  const maxTime = new Date(maxDate).getTime();
  return timeRelease >= minTime && timeRelease <= maxTime;
};
export const isValidGenre = (genre: string) => genre !== Genre.default;
