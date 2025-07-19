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

const confirmAction = (title, message, confirmBtnText) => {
    return Swal.fire({
        title: title || "Are you sure?",
        text: message || "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmBtnText || "Yes, delete it!"
    })
}


export { errorAlert, successAlert, confirmAction };