export interface movieInterface {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  release_date: string;
  genresList: { name: string; id: number }[];
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
  }[];
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
}
