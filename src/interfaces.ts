interface IGenres {
  id: number;
  name: string;
}

interface IProduction_company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProduction_country {
  iso_3166_1: string;
  name: string;
}

interface ISpoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProduction_company[];
  production_countries: IProduction_country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MovieStatus {
  released = 'released',
  waiting = 'waiting for release',
}

export enum Adult {
  true = 'Hardcore',
  false = 'Regular',
}

export enum Genre {
  default = 'default',
  comedy = 'Comedy',
  horror = 'Horror',
  action = 'Action',
  crime = 'Crime',
  thriller = 'Thriller',
  drama = 'Drama',
}

export enum FormFields {
  title = 'title',
  overview = 'overview',
  country = 'country',
  releaseDate = 'releaseDate',
  genre = 'genre',
  isConfirmPolitics = 'isConfirmPolitics',
  adult = 'adult',
  logo = 'logo',
}

export interface IForm {
  id: number;
  title: string;
  overview: string;
  country: string;
  releaseDate: string;
  genre: Genre;
  isConfirmPolitics: boolean;
  adult: boolean;
  logo: string | undefined;
}

export type IDateTypeField = 'text' | 'date';

export interface FieldError {
  field: string;
  errors: string[];
}

export interface IStateForms {
  form: IForm;
  cards: IForm[];
  dateType: IDateTypeField;
  isFormChecked: boolean;
  errors: FieldError[];
  isLoading: boolean;
  submitted: boolean;
  added: boolean;
}
