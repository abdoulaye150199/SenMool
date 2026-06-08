import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import BraceletPage from "../pages/bracelet/page";
import AppMobilePage from "../pages/app-mobile/page";
import DashboardPage from "../pages/dashboard/page";
import PresentationPage from "../pages/presentation/page";
import ImpactPage from "../pages/impact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bracelet",
    element: <BraceletPage />,
  },
  {
    path: "/app-mobile",
    element: <AppMobilePage />,
  },
  {
    path: "/app-mobile/*",
    element: <AppMobilePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/*",
    element: <DashboardPage />,
  },
  {
    path: "/presentation",
    element: <PresentationPage />,
  },
  {
    path: "/impact",
    element: <ImpactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
