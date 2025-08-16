import {
  createBrowserRouter,
} from "react-router";

import Home from "../components/Pages/HomeLayoutPages/Home/Home";
import PetListing from "../components/Pages/HomeLayoutPages/PetListing/PetListing";
import DonationCampaigns from "../components/Pages/HomeLayoutPages/DonationCampaings/DonationCampaigns";

import LoginPage from "../components/Pages/AuthLayoutPages/LoginPage/LoginPage";
import RegisterPage from "../components/Pages/AuthLayoutPages/RegisterPage/RegisterPage";

import PrivateRoute from "../components/Routes/PrivateRoute";
import HomeLayout from "../components/Layouts/HomeLayout/HomeLayout";
import AuthLayout from "../components/Layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../components/Layouts/DashboardLayout/DashboardLayout";
import AddPetPage from "../components/Pages/DashboardPages/UserDashboard/AddPet/AddPetPage";
import MyPetsPage from "../components/Pages/DashboardPages/UserDashboard/MyPets/MyPetsPage";
import CreateCampaignPage from "../components/Pages/DashboardPages/UserDashboard/CreateCampaign/CreateCampaignPage";
import MyDonations from "../components/Pages/DashboardPages/UserDashboard/MyDonations/MyDonations";
import MyCampaignsPage from "../components/Pages/DashboardPages/UserDashboard/MyCampaigns/MyCampaignsPage";
import PetDetails from "../components/Pages/HomeLayoutPages/PetDetails/PetDetails";
import ReceivedRequest from "../components/Pages/DashboardPages/UserDashboard/ReceivedRequest/ReceivedRequest";
import SentRequests from "../components/Pages/DashboardPages/UserDashboard/SentRequests/SentRequests";
import Users from "../components/Pages/DashboardPages/AdminDashboard/Users/Users";
import AllPets from "../components/Pages/DashboardPages/AdminDashboard/AllPets/AllPets";
import AllDonationCampaigns from "../components/Pages/DashboardPages/AdminDashboard/AllDonationCampaigns/AllDonationCampaigns";
import AdminRoute from "../components/Routes/AdminRoute";
import CampaignDetails from "../components/Pages/HomeLayoutPages/CampaignDetails/CampaignDetails";
import Error404Page from "../components/Shared/Error404Page/Error404Page";
import ForbiddenPage from "../components/Shared/ForbiddenPage/ForbiddenPage";



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
        path: "pet-details/:petId",
        element: <PetDetails></PetDetails>
      },
      {
        path: "donation-campaigns",
        Component: DonationCampaigns
      },
      {
        path: "/campaign-details/:campaignId",
        element: <CampaignDetails></CampaignDetails>
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
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: MyPetsPage
      },
      {
        path: "add-pet",
        Component: AddPetPage,
      },
      {
        path: "my-pets",
        Component: MyPetsPage,
      },
      {
        path: "received-adoption-requests",
        Component: ReceivedRequest,
      },
      {
        path: "sent-adoption-requests",
        Component: SentRequests,
      },
      {
        path: "create-donation-campaign",
        Component: CreateCampaignPage,
      },
      {
        path: "my-donation-campaigns",
        Component: MyCampaignsPage,
      },
      {
        path: "my-donations",
        Component: MyDonations,
      },
      {
        path: "all-users",
        element: <AdminRoute><Users></Users></AdminRoute>
      },
      {
        path: "all-pets",
        element: <AdminRoute><AllPets></AllPets></AdminRoute>
      },
      {
        path: "all-donation-campaigns",
        element: <AdminRoute><AllDonationCampaigns></AllDonationCampaigns></AdminRoute>
      },
    ]
  },
  {
    path: "*",
    Component: Error404Page
  },
  {
    path: "/error/forbidden",
    Component: ForbiddenPage
  }
]);
