export interface movieInterface {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  genres: { id: number; name: string }[];
  release_date: string;
  genresList: { name: string; id: number }[];
  popularity: number;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  production_countries: { name: string }[];
  production_companies: { name: string; logo_path: string }[];
}

export interface seriesInterface {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  vote_count: number;
  overview: string;
  genre_ids: number[];
  first_air_date: string;
  genresList: { name: string; id: number }[];
  genres: { id: number; name: string }[];
  vote_average: number;
  popularity: number;
  production_countries: { name: string }[];
  production_companies: { name: string; logo_path: string }[];
  status: string;
  seasons: {
    air_date: string;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
}

export interface actorInterface {
  gender: number;
  name: string;
  id: number;
  profile_path: string;
  known_for: {
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    id: number;
    media_type: string;
  }[];
  known_for_department: string;
  birthday: string | null;
  deathday: string | null;
  biography: string;
  place_of_birth: string;
  imdb_id: string;
}

export interface resultsInterface {
  overview: string;
  known_for: any[];
  profile_path: string;
  poster_path: string;
  name: string;
  title: string;
  vote_average: number;
  known_for_department: string;
  id: number;
}

export interface sortInterface {
  sortName: string;
  sortType: string;
  sortedProperty: string;
}

export interface castInterface {
  id: number;
  cast: {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    cast_id: string;
    character: string;
  }[];
}
