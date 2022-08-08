import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
