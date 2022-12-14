import React, { Fragment } from "react";
import MediaDisplayer from "../../components/CategoryDisplayer/MediaDisplayer";
import axios from "axios";
import { actorInterface } from "../../utils/types";
import { AnimatePresence } from "framer-motion";
import DetailsModal from "../../components/DetailsModal.tsx/DetailsModal";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../utils/scripts";
import Head from "next/head";

const People: React.FC<{
  popularPeople: actorInterface[];
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

  hideOverflowIf(showModal); // Do not let user scroll when modal is active

  return (
    <Fragment>
          <Head>
        <title>{`Filmget - People`}</title>
        <meta
          name="description"
          content="Popular Actors and more to see on Filmget, where you will learn something new about your favourite celebrities!"
        ></meta>
      </Head>
      <AnimatePresence>
        {showModal && (
          <DetailsModal
            modalData={modalData!}
            originPosition={originPosition}
          />
        )}
      </AnimatePresence>
      <MediaDisplayer
        mediaType="people"
        mediaData={{
          popular: props.popularPeople,
        }}
      />
    </Fragment>
  );
};

export default People;

export async function getServerSideProps() {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ), // GET popular people
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const popularPeople: actorInterface[] = res[0].data.results;

  return {
    props: { popularPeople },
  };
}
