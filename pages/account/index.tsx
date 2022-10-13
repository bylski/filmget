import { NextPage } from "next";
import React, { Fragment } from "react";
import AccountMenu from "../../components/AccountMenu/AccountMenu";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { hideOverflowIf } from "../../utils/scripts";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

const AccountPage: React.FC<{
  genresList: { id: number; name: string }[];
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
      </AnimatePresence>
      <AccountMenu genresList={props.genresList} />
    </Fragment>
  );
};

export default AccountPage;

export async function getServerSideProps() {
  let res: any = undefined;

  try {
    res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
    ); // Get genres list)
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const genresList: any = res.data.genres;

  return {
    props: { genresList },
  };
}
