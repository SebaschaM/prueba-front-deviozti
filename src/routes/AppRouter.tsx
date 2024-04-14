import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import { PrivateRouter } from ".";
import { PrivateRoute } from "./PrivateRoute";
import { useContact, useHome, useSocialMedia } from "../hooks";
import { Loader } from "../components";
import useAbout from "../hooks/useAbout";
import { About, Contact, Home, Products, Services } from "../pages";

// const LazyHome = lazy(() => import("../pages/Home"));
// const LazyAbout = lazy(() => import("../pages/public/About"));
// const LazyContact = lazy(() => import("../pages/public/Contact"));
// const LazyService = lazy(() => import("../pages/public/Services"));
// const LazyProducts = lazy(() => import("../pages/public/Products"));
const LazyProductDetail = lazy(() => import("../pages/public/ProductDetail"));

export const AppRouter = () => {
  const { dataHomePage, handleGetData } = useHome();
  const { dataAboutPage, handleGetData: handleGetDataAbout } = useAbout();
  const { dataContactPage, handleGetData: handleGetDataContact } = useContact();
  const { dataSocialMedia, handleGetData: handleGetDataMedia } =
    useSocialMedia();

  // const onGetData = async () => {
  //   try {
  //     await Promise.all([
  //       handleGetData(),
  //       handleGetDataAbout(),
  //       handleGetDataMedia(),
  //       handleGetDataContact(),
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   onGetData();
  // }, []);

  // if (
  //   Object.keys(dataHomePage).length === 0 &&
  //   Object.keys(dataAboutPage).length === 0 &&
  //   Object.keys(dataContactPage).length === 0 &&
  //   Object.keys(dataSocialMedia).length === 0
  // ) {
  //   return <Loader />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/products/:productId" element={<LazyProducts />} /> */}

        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={true}>
              <PrivateRouter />
            </PrivateRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
