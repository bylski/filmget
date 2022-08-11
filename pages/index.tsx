import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  return null;
};

export default Index;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
}
