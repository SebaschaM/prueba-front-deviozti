import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "../components";

const LazyDashboardLogin = lazy(() => import("../pages/admin/Login"));
const LazyDashboardNavbar = lazy(
  () => import("../pages/admin/dashboard/DashboardNavbar")
);
const LazyDashboardHome = lazy(
  () => import("../pages/admin/dashboard/DashboardHome")
);
const LazyDashboardAbout = lazy(
  () => import("../pages/admin/dashboard/DashboardAbout")
);
const LazyDashboardContact = lazy(
  () => import("../pages/admin/dashboard/DashboardContact")
);
const LazyDashboardRedesSociales = lazy(
  () => import("../pages/admin/dashboard/DashboardSocials")
);

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route
        path="auth"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardLogin />
          </Suspense>
        }
      />
      <Route
        path="dashboard/navfooter"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardNavbar />
          </Suspense>
        }
      />
      <Route
        path="dashboard/inicio"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardHome />
          </Suspense>
        }
      />
      <Route
        path="dashboard/nosotros"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardAbout />
          </Suspense>
        }
      />
      <Route
        path="dashboard/productos"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardHome />
          </Suspense>
        }
      />
      <Route
        path="dashboard/servicios"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardHome />
          </Suspense>
        }
      />
      <Route
        path="dashboard/contacto"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardContact />
          </Suspense>
        }
      />
      <Route
        path="dashboard/redes-sociales"
        element={
          <Suspense fallback={<Loader />}>
            <LazyDashboardRedesSociales />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/admin/auth" />} />
    </Routes>
  );
};
