export interface movieInterface {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  genres: {id: number, name: string}[]
  release_date: string;
  genresList: { name: string; id: number }[];
  popularity: number;
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
  genres: {id: number, name: string}[]
  vote_average: number;
  popularity: number;
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
    id: number;
    media_type: string,
  }[];
  known_for_department: string,
}

export interface resultsInterface {
  overview: string,
  known_for: any[],
  profile_path: string,
  poster_path: string,
  name: string,
  title: string,
  vote_average: number,
  known_for_department: string,
  id: number;
}

export interface sortInterface {
  sortName: string;
  sortType: string;
  sortedProperty: string;
}
