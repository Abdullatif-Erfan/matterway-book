import React, { Fragment, lazy, Suspense } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";

const HomePage = lazy(() => import("./pages/home/Home"));

const App = () => (
  <Fragment>
    <Header />
    <Suspense fallback={<Loader />}>
      <HomePage />
    </Suspense>
    <Footer />
  </Fragment>
);

export default App;
