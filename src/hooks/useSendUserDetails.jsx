import React from 'react';
import useAxiosPublic from './useAxiosPublic';

// implemented for gituhub and google sign in method

const useSendUserDetails = () => {
    const axiosPublic = useAxiosPublic();

    const sendUserDetailsToBackend = async (result) => {
        const user = result.user;

        const userInfo = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user",
            role_created_at: new Date().toISOString(),
            role_updated_at: new Date().toISOString(),
            role_update_by: "default",

            addedPetIds: [],
            questedPetIds: [],
            donationCampaigns: [],

            isBanned: false,
            banned_at: null,
            banned_by: null,
        }

        const res = await axiosPublic.post("/users", userInfo);
        return res.data;
    }


    return sendUserDetailsToBackend;
};

export default useSendUserDetails;