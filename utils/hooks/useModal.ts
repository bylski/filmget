import { modalActions } from "../../redux/store";
import { actorInterface, movieInterface, seriesInterface } from "../types";
import { useAppDispatch } from "./reduxHooks";

type optionsObject =
    {
      mediaType: "movies" | "series";
      mediaData: movieInterface | seriesInterface | actorInterface;
      genresList: ({
        id: number;
        name: string;
      } | null)[];
      elementRef: React.MutableRefObject<HTMLElement | null>;
    }
  | {
      mediaType: "people";
      mediaData: movieInterface | seriesInterface | actorInterface;
      elementRef: React.MutableRefObject<HTMLElement | null>;
    };

const useModal = () => {
  const dispatch = useAppDispatch();
  let originPosition;
  let position: { x: number; y: number };

  const showModal = (options: optionsObject) => {
    const { elementRef, mediaData } = options;

    // Check if ref isn't null
    if (elementRef.current !== null) {
      // Get rect of the element and calculate where the middle of the element is
      originPosition = elementRef.current.getBoundingClientRect();
      position = {
        x: originPosition.x + originPosition.width / 2,
        y: originPosition.y + originPosition.height / 2,
      };
    }

    // Dispatch action with passed data
    if ("genresList" in options) {
      const { genresList } = options;
      dispatch(
        modalActions.showModal({
          data: { ...mediaData, genresList: genresList },
          originPosition: position,
        })
      );
    } else {
      dispatch(
        modalActions.showModal({
          data: { ...mediaData },
          originPosition: position,
        })
      );
    }
  };

  const closeModal = () => {
    // Close modal
    dispatch(modalActions.hideModal());
  };


  return {showModal, closeModal};
};

export default useModal;
