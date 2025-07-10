import {
  createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/HomeLayoutPages/Home/Home";
import PetListing from "../Pages/HomeLayoutPages/PetListing/PetListing";
import DonationCampaigns from "../Pages/HomeLayoutPages/DonationCampaings/DonationCampaigns";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children : [
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
]);
