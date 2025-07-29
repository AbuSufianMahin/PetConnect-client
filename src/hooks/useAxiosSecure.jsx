import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
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

    axiosSecure.interceptors.response.use(res => {

        return res;
    }, (error) => {
        const status = error.status;
        // console.log("Error Status in axiosSecure Response: ", status)
        if (status === 403) {
            navigate('/error/forbidden')
        }
        else if (status === 401) {
            logOutUser().then(() => navigate('/login'))
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;