import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://petconnect-server.vercel.app'
});


const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();

    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {

        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;

    }, (error) => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(
        res => res,
        async (error) => {
            const status = error.response?.status;
            const defaultMessage = "Something went wrong!";
            let customMessage = defaultMessage;

            if (status === 403) {
                customMessage = "You are not authorized to perform this action.";
                navigate('/error/forbidden');
            } else if (status === 401) {
                customMessage = "Session expired. Please log in again.";
                logOutUser().then(() => navigate('/login'))
            } else if (error.response?.data?.message) {
                customMessage = error.response.data.message;
            }

            // Set a consistent error message
            error.message = customMessage;

            return Promise.reject(error);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;