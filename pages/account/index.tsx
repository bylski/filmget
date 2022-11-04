import { GetServerSidePropsContext, NextPage } from "next";
import React, { Fragment, useEffect } from "react";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { hideOverflowIf } from "../../utils/scripts";
import { useAppSelector, useAppDispatch } from "../../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import AvatarCropModal from "../../components/AccountMenu/Settings/AvatarCropModal";
import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "../../utils/mongo/userModel";
import { movieInterface, seriesInterface } from "../../utils/types";
import { accountActions } from "../../redux/store";

const AccountPage: React.FC<{
  genresList: { id: number; name: string }[];
  signUpDate: Date | null;
  mediaToWatch: movieInterface[] | seriesInterface[];
  mediaIds: number[];
  mediaRatings: { id: number; rating: number }[];
  mostWatchedGenre: string;
  mediaUserLiked: Array<movieInterface | seriesInterface>
}> = (props) => {
  const {
    modalData,
    isShown: showModal,
    originPosition,
  } = useAppSelector((state) => ({
    modalData: state.modal.modalData,
    isShown: state.modal.isShown,
    originPosition: state.modal.originPosition,
  }));

  const { isShown: showCropModal, imgSrc } = useAppSelector((state) => ({
    isShown: state.cropModal.isShown,
    imgSrc: state.cropModal.imgSrc,
  }));

  hideOverflowIf(showModal);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      accountActions.setToWatch({
        mediaToWatch: props.mediaToWatch,
        mediaIds: props.mediaIds,
      })
    );
    dispatch(accountActions.setRating(props.mediaRatings));
  }, []);

  return (
    <Fragment>
      <AnimatePresence>
        {showModal && (
          <DetailsModal
            modalData={modalData!}
            originPosition={originPosition}
          />
        )}
        {showCropModal && <AvatarCropModal imgSrc={imgSrc} />}
      </AnimatePresence>
      <AccountMenu
        mostWatchedGenre={props.mostWatchedGenre}
        mediaUserLiked={props.mediaUserLiked}
        mediaRatingsAmount={props.mediaRatings.length}
        mediaIds={props.mediaIds}
        mediaToWatch={props.mediaToWatch}
        signUpDate={props.signUpDate}
        genresList={props.genresList}
      />
    </Fragment>
  );
};

export default AccountPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let res: any = undefined;

  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Check if code runs in production or in development, use the address specified for environment
    // Connect to the database
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
    } else {
      await mongoose.connect("mongodb://localhost:27017/filmget");
    }
  } catch (error) {
    throw new Error("[ERROR] Couldnt' connect to the database!");
  }

  // Get user data from the database
  const username = session.user?.name;
  const currentUser = await User.findOne({ username });
  // Extract sign up date and to-watch media
  const signUpDate = currentUser.signUpDate.toJSON();
  const mediaToWatch = currentUser.mediaToWatch;
  const mediaIds = currentUser.mediaIds;
  const mediaRatings: {
    id: number;
    rating: number;
    mediaData: seriesInterface | movieInterface;
  }[] = await JSON.parse(JSON.stringify(currentUser.mediaRatings));

  // Get all rated genres to estimate what media genre is watched the most by user
  let allGenres: number[] = [];
  mediaRatings.forEach((mediaRating) => {
    allGenres = [...allGenres, ...mediaRating.mediaData.genre_ids];
  });

  let mostWatchedGenreId: number | null = null;
  if (allGenres) {
    let genresCount: { key?: number } = {};
    allGenres.forEach((genre) => {
      const genreKey = genre.toString();
      if (!(genre.toString() in genresCount)) {
        genresCount[genreKey as keyof typeof genresCount] = 1;
      } else if (genre.toString() in genresCount) {
        genresCount[genreKey as keyof typeof genresCount]! += 1;
      }
    });

    let maxVal = 0;
    for (let genre in genresCount) {
      if (genresCount[genre as keyof typeof genresCount]! > maxVal) {
        maxVal = genresCount[genre as keyof typeof genresCount]!;
        mostWatchedGenreId = parseInt(genre);
      }
    }
  }

  const endpoints = [
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`,
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-US`,
  ];

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  let mostWatchedGenre: string = "";
  const genresList: any = [...res[0].data.genres, ...res[1].data.genres];
  for (let genre of genresList) {
    if (genre.id === mostWatchedGenreId) {
      mostWatchedGenre = genre.name;
    }
  }

  let mediaUserLiked: Array<movieInterface | seriesInterface> = [];
  if (mediaRatings.length >= 1) {
    const wellRatedMedia = mediaRatings.filter(
      (mediaRating) => mediaRating.rating >= 7
    );

    mediaUserLiked = wellRatedMedia.map((media) => {
      return media.mediaData;
    });
  }

  return {
    props: {
      genresList,
      signUpDate: signUpDate || null,
      mediaToWatch: mediaToWatch || null,
      mediaIds,
      mediaRatings,
      mostWatchedGenre,
      mediaUserLiked,
    },
  };
}
