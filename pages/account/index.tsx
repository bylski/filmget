import { GetServerSidePropsContext, NextPage } from "next";
import React, { Fragment } from "react";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { hideOverflowIf } from "../../utils/scripts";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import AvatarCropModal from "../../components/AccountMenu/Settings/AvatarCropModal";
import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "../../utils/mongo/userModel";
import { movieInterface, seriesInterface } from "../../utils/types";

const AccountPage: React.FC<{
  genresList: { id: number; name: string }[];
  signUpDate: Date | null;
  mediaToWatch: movieInterface[] | seriesInterface[];
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
    imgSrc: state.cropModal.imgSrc
  }
  ));

  hideOverflowIf(showModal);

  return (
    <Fragment>
      <AnimatePresence>
        {showModal && (
          <DetailsModal
            modalData={modalData!}
            originPosition={originPosition}
          />
        )}
        {showCropModal && (
          <AvatarCropModal imgSrc={imgSrc}/>
        )}
      </AnimatePresence>
      <AccountMenu mediaToWatch={props.mediaToWatch} signUpDate={props.signUpDate} genresList={props.genresList} />
    </Fragment>
  );
};

export default AccountPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let res: any = undefined;

    const session = await unstable_getServerSession(context.req, context.res, authOptions);

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
    const currentUser = await User.findOne({username});
    // Extract sign up date and to-watch media
    const signUpDate = currentUser.signUpDate.toJSON();
    const mediaToWatch = currentUser.mediaToWatch;
    console.log(mediaToWatch)

  try {
    res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    ); // Get genres list)
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const genresList: any = res.data.genres;

  return {
    props: { genresList, signUpDate: signUpDate || null, mediaToWatch: mediaToWatch || null},
  };
}
