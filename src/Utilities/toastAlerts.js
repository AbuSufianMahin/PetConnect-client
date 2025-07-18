import { Bounce, toast } from "react-toastify";

const successToast = (message, time, theme) => {
    return toast.success(message, {
        position: "top-right",
        autoClose: time || 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme || "light",
        transition: Bounce,
    });
}

const errorToast = () => {
    return toast.error('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

const warningToast = (message, time ,theme) => {
    return toast.warn(message, {
        position: "top-right",
        autoClose: time || 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme || "light",
        transition: Bounce,
    });
}

export {successToast, errorToast, warningToast};