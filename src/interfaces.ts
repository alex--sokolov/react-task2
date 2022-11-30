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

export interface IMovieStatic {
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

export interface IFormState extends Omit<IForm, 'id'> {
  isFormDisabled: boolean;
  updateTitle?: (title: string) => void;
  updateOverview?: (overview: string) => void;
  updateCountry?: (country: string) => void;
  updateReleaseDate?: (releaseDate: string) => void;
  updateGenre?: (genre: Genre) => void;
  updateIsConfirmPolitics?: (isConfirmPolitics: boolean) => void;
  updateAdult?: (adult: boolean) => void;
  updateLogo?: (logo: string | undefined) => void;
  resetForm?: () => void;
  updateIsFormDisabled?: (value: boolean) => void;
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

export interface IMovie {
  academyAwardNominations: number;
  academyAwardWins: number;
  boxOfficeRevenueInMillions: number;
  budgetInMillions: number;
  name: string;
  rottenTomatoesScore: number;
  runtimeInMinutes: number;
  _id: string;
}

export interface ICharacter {
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

export interface IFetchError {
  errorCode: number | null;
  errorMessage: string | null;
}

export type IState = {
  searchValue: string;
  movies: IMovie[];
  isLoading: boolean;
  fetchError: IFetchError | null;
  isShowError: boolean;
  modalOpened: string | null;
  isModalClosing: boolean;
};

export enum NotifyType {
  WARN = 'warn',
  ERROR = 'error',
  OK = 'ok',
}

export enum NotifyMessage {
  MOVIE_ADDED = 'Movie was added',
}

export interface IStateDownload {
  isDownloading: boolean;
  downloaded: boolean;
}

export interface IPaginateInfo {
  currentPage: number;
  maxPage: number;
  limit: number;
}

export enum ESortDirection {
  desc = 'desc',
  asc = 'asc',
}

export enum ESortField {
  default = 'default',
  name = 'name',
  species = 'species',
  image = 'image',
}

export interface ISortInfo {
  field: ESortField;
  direction: ESortDirection;
}

export interface IStateCharacter {
  characters: ICharacter[] | IFetchError;
  searchTerm: string;
  isLoading: boolean;
  paginateInfo: IPaginateInfo;
  sortInfo: ISortInfo | null;
  toggleLoading?: () => void;
  updateCharacters?: (
    searchTerm: string,
    page: number,
    limit: number,
    sortField: ISortInfo | null
  ) => void;
  updateSearchTerm?: (searchTerm: string) => void;
}

export interface IStateCards {
  cards: IForm[];
  addCard?: (card: IForm) => void;
}

export interface IFetchSuccess {
  data: ICharacter[];
  paginateInfo: IPaginateInfo | null;
  sortInfo: ISortInfo | null;
}

export interface IActionForms {
  type: string;
  payload?: string | Genre | boolean | undefined;
}

export interface IActionCharacters {
  type: string;
  payload?: IFetchSuccess | IFetchError | string;
}

export interface IActionCards {
  type: string;
  payload?: IForm;
}

export enum Errors {
  'Not Found' = 404,
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}
