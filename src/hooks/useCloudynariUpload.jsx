import React, { useState } from 'react';

import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET;

const useCloudinaryUpload = () => {
    const [error, setError] = useState(null);

    const uploadImage = async (photoFile) => {

        setError(null);

        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData
            );

            return response.data.secure_url;
        }
        catch (error) {
            console.log(error);
            setError("Image Upload Failed");
            return null;
        }
    }


    return { uploadImage, error };
};

export default useCloudinaryUpload;