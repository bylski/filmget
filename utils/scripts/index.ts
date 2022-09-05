import { sortInterface } from "../types";
import { useEffect } from "react";

export function hideOverflowIf(condition: boolean) {
  if (typeof window !== "undefined") {
    const body: HTMLBodyElement = document.querySelector("body")!;
    if (condition && body.clientWidth > 500) {
      body.style.overflowY = "hidden";
      body.style.width = "calc(100% - 10px)";
    } else {
      body.style.overflowY = "auto";
      body.style.width = "calc(100%)";
    }
  }
}


export const limitStr = (str: string, limit: number) => {

  if (typeof str !== "string") {
    return "";
  }

    let chars;
    let limitedCharArr: string[] = [];
    chars = str.split('');
    let charsLength = chars.length;

    for (let i = 0; i < charsLength - 1; i++) {
      limitedCharArr.push(chars[i]);

      if (charsLength <= limit) {
        charsLength = limit;
        return chars.join('');
      }

      if (limit <= i && chars[i] === " ") {

        if (chars[i-1] === "," || chars[i-1] === ".") {
          limitedCharArr.length = limitedCharArr.length - 2;
          limitedCharArr.push(" ")
        }
        break;
      }
    }

    const limitedString = `${limitedCharArr.join('')}(...)`;
    return limitedString;
}


export const chooseSwitchers = (mediaTypeString: string): {switchName: string}[] | null => {
  const mediaType = mediaTypeString.toLowerCase();
  let switches: {switchName: string}[] | null = null; 
  switch (mediaType.toLowerCase()) {
    case "movies":
      switches = [
        { switchName: "Trending" },
        { switchName: "Now Playing" },
        { switchName: "Top Rated" },
      ];
      break;
    case "series": 
    switches = [
      { switchName: "Trending" },
      { switchName: "Now Airing" },
      { switchName: "Top Rated" },
    ];
    break;
    case "people": 
    switches = [
      { switchName: "Popular" },
    ];
  }

  return switches

}

export const sortMediaBy = (selectedSort: sortInterface, chosenMediaData: any[][]) => {
  const { sortType, sortedProperty } = selectedSort;
  // If chosen media is undefined or null --> omit function all together
  let sortedData: any[] = [];
  chosenMediaData.forEach((dataArr) => {
    sortedData = [...sortedData , ...dataArr]
  })

  if (chosenMediaData !== undefined && chosenMediaData !== null) {
    // MAX VALUE TO MIN VALUE SORT
    if (sortType === "max-min") {
      if (sortedProperty === "rating") {
        return sortedData.sort((a, b) =>
          a.vote_average < b.vote_average ? 1 : -1
        );
      }
      if (sortedProperty === "popularity") {
        return sortedData.sort((a, b) =>
          a.popularity < b.popularity ? 1 : -1
        );
      }
    }
    // MIN VALUE TO MAX VALUE SORT
    if (sortType === "min-max") {
      if (sortedProperty === "rating") {
        return sortedData.sort((a, b) =>
          a.vote_average > b.vote_average ? 1 : -1
        );
      }
      if (sortedProperty === "popularity") {
        return sortedData.sort((a, b) =>
          a.popularity > b.popularity ? 1 : -1
        );
      }
    }
    // ALPHABETIC SORT
    if (sortType === "alphabetically") {
      if (sortedProperty === "title") {
        return sortedData.sort(
          (a, b) => (a.title[0] > b.title[0] ? 1 : -1) // Compare first letters of title
        );
      } else if (sortedProperty === "name") {
        return sortedData.sort((a, b) =>
          a.name[0] > b.name[0] ? 1 : -1
        );
      }
    }
    // COUNTER-ALPHABETIC SORT
    if (sortType === "counter-alphabetically") {
      if (sortedProperty === "title") {
        return sortedData.sort(
          (a, b) => (a.title[0] < b.title[0] ? 1 : -1) // Compare first letters of title
        );
      } else if (sortedProperty === "name") {
        return sortedData.sort((a, b) =>
          a.name[0] < b.name[0] ? 1 : -1
        );
      }
    }
  }
  return null;
};

export function outsideClickDetector(
  divRef: React.RefObject<HTMLDivElement>,
  btnRef: React.RefObject<HTMLButtonElement>,
  action: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        btnRef.current &&
        event.target !== btnRef.current
      ) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);
}