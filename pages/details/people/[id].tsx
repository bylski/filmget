import React from "react";
import { GetServerSidePropsContext } from "next";
import DetailsPage from "../../../components/Detailspage/DetailsPage";
import axios from "axios";
import { actorInterface } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../../utils/scripts";

const SeriesDetailsById: React.FC<{
  request: any;
  actorDetails: actorInterface;
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
  hideOverflowIf(showModal)

  return <DetailsPage mediaType={"people"} mediaDetails={props.actorDetails} />;
};

export default SeriesDetailsById;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const endpoints: string[] = [
    encodeURI(
      `https://api.themoviedb.org/3/person/${context.params?.id}?api_key=${process.env.API_KEY}&language=en-US`
      // Get Movie Info by ID
    ),
  ];

  let res: any = undefined;

  try {
    res = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))); // GET all of the endpoints
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  const actorDetails: any[] = res[0].data;


  return {
    props: { actorDetails },
  };
}

