import { sortInterface } from "../../../utils/types";

export const movieSorterItems: sortInterface[] = [
  {
    sortName: "Popularity: From Highest",
    sortType: "max-min",
    sortedProperty: "popularity",
  },
  {
    sortName: "Popularity: From Lowest",
    sortType: "min-max",
    sortedProperty: "popularity",
  },
  {
    sortName: "Rating: From Highest",
    sortType: "max-min",
    sortedProperty: "rating",
  },
  {
    sortName: "Rating: From Lowest",
    sortType: "min-max",
    sortedProperty: "rating",
  },
  {
    sortName: "Title: From A-Z",
    sortType: "alphabetically",
    sortedProperty: "title",
  },
  {
    sortName: "Title: From Z-A",
    sortType: "counter-alphabetically",
    sortedProperty: "title",
  },
];

export const seriesSorterItems: sortInterface[] = [
  {
    sortName: "Popularity: From Highest",
    sortType: "max-min",
    sortedProperty: "popularity",
  },
  {
    sortName: "Popularity: From Lowest",
    sortType: "min-max",
    sortedProperty: "popularity",
  },
  {
    sortName: "Rating: From Highest",
    sortType: "max-min",
    sortedProperty: "rating",
  },
  {
    sortName: "Rating: From Lowest",
    sortType: "min-max",
    sortedProperty: "rating",
  },
  {
    sortName: "Title: From A-Z",
    sortType: "alphabetically",
    sortedProperty: "name",
  },
  {
    sortName: "Title: From Z-A",
    sortType: "counter-alphabetically",
    sortedProperty: "name",
  },
];

export const peopleSorterItems: sortInterface[] = [
  {
    sortName: "Popularity: From Highest",
    sortType: "max-min",
    sortedProperty: "popularity",
  },
  {
    sortName: "Popularity: From Lowest",
    sortType: "min-max",
    sortedProperty: "popularity",
  },
  {
    sortName: "Name: From A-Z",
    sortType: "alphabetically",
    sortedProperty: "name",
  },
  {
    sortName: "Name: From Z-A",
    sortType: "counter-alphabetically",
    sortedProperty: "name",
  },
];

export const chooseSorterItems = (
  receivedMediaType: string
): sortInterface[] => {
  const mediaType = receivedMediaType.toLowerCase();
  switch (mediaType) {
    case "movies":
      return movieSorterItems;
      break;
    case "people":
      return peopleSorterItems;
      break;
    case "series":
      return seriesSorterItems;
      break;
    default:
      return [{ sortName: "---", sortedProperty: "---", sortType: "---" }];
  }
};
