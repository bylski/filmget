export interface movieInterface {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    genre_ids: number[];
    release_date: string;
    genresList: {name: string, id: number}[];
  }