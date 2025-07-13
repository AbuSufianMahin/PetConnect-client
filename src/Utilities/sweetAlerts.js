import Swal from "sweetalert2";

const successAlert = (title, message) => {
    return Swal.fire({
        icon: "success",
        title: title || "Success!",
        text: message || "Your action was successful.",
    });
}

const errorAlert = (title, message) => {
    return Swal.fire({
        icon: "error",
        title: title || "Action Failed",
        text: message || "An unexpected error occurred.",
    });
}

export { errorAlert, successAlert };