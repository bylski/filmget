import React, { useEffect, Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import DetailsPage from "../../../components/DetailsPage/DetailsPage";
import axios from "axios";
import {
  castInterface,
  movieInterface,
  seriesInterface,
} from "../../../utils/types";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../../utils/scripts";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import mongoose from "mongoose";
import { User } from "../../../utils/mongo/userModel";
import { accountActions } from "../../../redux/store";
import Head from "next/head";

const SeriesDetailsById: React.FC<{
  request: any;
  seriesDetails: seriesInterface;
  genresList: { id: number; name: string }[];
  mediaToWatch: movieInterface[] | seriesInterface[];
  mediaIds: number[];
  mediaRatings: { id: number; rating: number }[];
  castDetails: castInterface;
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

  hideOverflowIf(showModal); // Do not let user scroll when modal is active

  return (
    <Fragment>
      <Head>
        <title>{`Filmget - ${props.seriesDetails.name}`}</title>
        <meta
          name="description"
          content={`${props.seriesDetails.overview}`}
        ></meta>
      </Head>
      <DetailsPage
        mediaType={"series"}
        genresList={props.genresList}
        mediaDetails={props.seriesDetails}
        castDetails={props.castDetails}
      />
    </Fragment>
  );
};

export default SeriesDetailsById;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
  let mediaToWatch: any = null;
  let mediaIds: number[] | null = null;
  let mediaRatings:
    | {
        id: number;
        rating: number;
        mediaData: seriesInterface | movieInterface;
      }[]
    | null = null;
  if (session) {
    const username = session.user?.name;
    const currentUser = await User.findOne({ username });
    // Extract sign up date and to-watch media
    mediaToWatch = currentUser.mediaToWatch;
    mediaIds = currentUser.mediaIds;
    mediaRatings = await JSON.parse(JSON.stringify(currentUser.mediaRatings));
  }

  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/tv/${context.params?.id}?api_key=${process.env.API_KEY}&language=en-US`
      // Get Movie Info by ID
    ),
    encodeURI(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-US`
    ), // Get genres lest
    encodeURI(
      `https://api.themoviedb.org/3/tv/${context.params?.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    ), // Get movie's cast
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const seriesDetails: any[] = res[0].data || null;
  const genresList: any[] = res[1].data;
  const castDetails: any = res[2].data;

  return {
    props: {
      seriesDetails,
      genresList,
      mediaToWatch,
      mediaIds,
      mediaRatings,
      castDetails,
    },
  };
}
