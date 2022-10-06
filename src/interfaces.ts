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

export interface IForm {
  name: string;
  surname: string;
  zipCode: string;
}
