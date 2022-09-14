import { useEffect, useReducer } from "react";

const useCarousel = (options: {urls: string[], switchDelayTime: number, carouselLimit: number}): typeof carouselImages => {
  // Limit the number of the images for carousel to display
  const {urls, switchDelayTime, carouselLimit} = options;
  let limitedUrls = urls;
  if (urls.length >= carouselLimit) {
  limitedUrls = urls.slice(0, carouselLimit)  // take only x amount of 
  }
  const carouselImages = limitedUrls.map((imageUrl, i) => {
    // If its the first image of the array, give it "init" property to signalize the first carousel cycle
    if (i === 0) {
      return {
        url: imageUrl,
        active: false,
        fadeOut: false,
        init: true,
      };
    }
    return {
      url: imageUrl,
      active: false,
      fadeOut: false,
    };
  });

  const initState = {
    index: 0,
    images: carouselImages,
    initCycle: true,
  };

  type carouselActions =
    | { type: "increaseIndex" | "decreaseIndex" }
    | { type: "setIndex"; payload: number }
    | { type: "setImages"; payload: typeof carouselImages }
    | { type: "setCycle"; payload: boolean}

  const carouselReducer = (
    state: typeof initState,
    action: carouselActions
  ) => {
    switch (action.type) {
      case "increaseIndex":
        return { ...state, index: state.index + 1 };
      case "decreaseIndex":
        return { ...state, index: state.index - 1 };
      case "setIndex":
        return { ...state, index: action.payload };
      case "setImages":
        return { ...state, images: action.payload };
      case "setCycle":
        return { ...state, initCycle: action.payload}
    }
  };

  const [carouselState, carouselDispatch] = useReducer(
    carouselReducer,
    initState
  );

  let newImagesState = carouselState.images;
  // If carouselTimeout listener is running - clear it
  let carouselTimeout: any = undefined; 
  useEffect(() => {
    if (carouselTimeout) {
      clearTimeout(carouselTimeout);
    }
    carouselTimeout = setTimeout(() => {
      if (carouselState.index >= limitedUrls.length - 1) {
        carouselDispatch({ type: "setIndex", payload: 0 });
      } else {
        carouselDispatch({ type: "increaseIndex" });
      }

      newImagesState = carouselState.images.map((image, i) => {
        // After initial cycle, set init to false to unlock normal behaviour
        if (carouselState.index === 0 && carouselState.initCycle && i === 0) {
          carouselDispatch({ type: "setCycle", payload: false});  // First cycle has ended so make initCycle false
          return { ...image, fadeOut: true, init: false };
        }
        // If its the end of the array -> set first index to active
        if (
          carouselState.index === carouselState.images.length - 1 &&
          i === 0
        ) {
          return { ...image, active: true };
        }
        // Set image with current index to fadeOut
        if (carouselState.index === i) {
          return { ...image, active: false, fadeOut: true };
        }
        // Set image with next index to Active
        if (carouselState.index + 1 === i) {
          return { ...image, active: true, fadeOut: false };
        }
        // Set all other image states to false
        return { ...image, active: false, fadeOut: false };
      });

      carouselDispatch({ type: "setImages", payload: newImagesState });
    }, switchDelayTime);
  }, [carouselState.index]);

  // Return images object
  return newImagesState;
};

export default useCarousel;
