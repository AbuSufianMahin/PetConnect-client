import {
  createBrowserRouter,
} from "react-router";
import HomeLayout from "../components/Layouts/HomeLayout";
import Home from "../components/Pages/HomeLayoutPages/Home/Home";
import PetListing from "../components/Pages/HomeLayoutPages/PetListing/PetListing";
import DonationCampaigns from "../components/Pages/HomeLayoutPages/DonationCampaings/DonationCampaigns";
import AuthLayout from "../components/Layouts/AuthLayout";
import LoginPage from "../components/Pages/AuthLayoutPages/LoginPage/LoginPage";
import RegisterPage from "../components/Pages/AuthLayoutPages/RegisterPage/RegisterPage";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import PrivateRoute from "../components/Routes/PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "pet-listing",
        Component: PetListing
      },
      {
        path: "donation-campaign",
        Component: DonationCampaigns
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage
      },
      {
        path: "register",
        Component: RegisterPage
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
  }
]);
