import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar/>
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}


export default MyApp;
