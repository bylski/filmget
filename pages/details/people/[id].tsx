import React from "react";
import { GetServerSidePropsContext } from "next";
import DetailsPage from "../../../components/Detailspage/DetailsPage";
import axios from "axios";
import { actorInterface } from "../../../utils/types";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import { hideOverflowIf } from "../../../utils/scripts";
import { encode } from "punycode";

const SeriesDetailsById: React.FC<{
  request: any;
  actorDetails: actorInterface;
  additionalInfo: actorInterface;
}> = (props) => {
  const {
    isShown: showModal,
  } = useAppSelector((state) => ({
    modalData: state.modal.modalData,
    isShown: state.modal.isShown,
    originPosition: state.modal.originPosition,
  }));
  hideOverflowIf(showModal)

  return <DetailsPage additionalDetails={props.additionalInfo} mediaType={"people"} mediaDetails={props.actorDetails} />;
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
  const actorDetails: actorInterface = res[0].data;

  // Making a second request because I need to get "known_for" data which for some reason is not present on details of the person.
  // But it is present on the object returned by "find by external id" query. So I utilize that.
  // I use imdb id to get the data I want. Quite clunky but at least i don't have to mess with external state or something.
  try {
  res = await axios.get(encodeURI(`https://api.themoviedb.org/3/find/${actorDetails.imdb_id}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`))
  } catch (e: any) {
    console.log(`ERROR ${e.response.status}: ${e.response.statusText}`);
  }

  let additionalInfo: actorInterface = res.data.person_results[0] || null;
  

  return {
    props: { actorDetails, additionalInfo },
  };
}

