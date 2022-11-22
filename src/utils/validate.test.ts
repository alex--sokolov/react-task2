import {
  isValidDate,
  isValidGenre,
  isValidMax,
  isValidMin,
  isValidOnlyEnglishSymbols,
} from './validate';
import { Genre } from '../interfaces';

describe('Validate Functions', () => {
  it('isValidMin works', () => {
    expect(isValidMin('test', 3)).toBeTruthy();
    expect(isValidMin('zz', 3)).toBeFalsy();
  });
  it('isValidMax works', () => {
    expect(isValidMax('test', 30)).toBeTruthy();
    expect(
      isValidMax('This string contains a little bit more symbols, than it is allowed', 30)
    ).toBeFalsy();
  });
  it('isValidOnlyEnglishSymbols works', () => {
    expect(isValidOnlyEnglishSymbols('test')).toBeTruthy();
    expect(isValidOnlyEnglishSymbols('Так нельзя')).toBeFalsy();
  });
  it('isValidDate', () => {
    expect(isValidDate('2022-02-02', '1997-01-01', '2030-12-31')).toBeTruthy();
    expect(isValidDate('1996-08-08', '1997-01-01', '2030-12-31')).toBeFalsy();
    expect(isValidDate('2033-12-12', '1997-01-01', '2030-12-31')).toBeFalsy();
  });
  it('isValidGenre', () => {
    expect(isValidGenre(Genre.comedy)).toBeTruthy();
    expect(isValidGenre(Genre.thriller)).toBeTruthy();
    expect(isValidGenre(Genre.default)).toBeFalsy();
  });
});
