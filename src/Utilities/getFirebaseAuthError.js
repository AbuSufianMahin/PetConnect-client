export const getFirebaseAuthError = (errorCode) => {
    switch (errorCode) {
        case "auth/user-cancelled":
        case "auth/popup-closed-by-user":
            return "You cancelled the sign-in process.";
        case "auth/email-already-in-use":
            return "This email is already registered.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/user-not-found":
            return "No user found with this email.";
        case "auth/wrong-password":
            return "Incorrect password. Try again.";
        case "auth/network-request-failed":
            return "Network error. Please check your connection.";
        case "auth/invalid-credential":
            return "Invalid credentials. Please try again.";
        case "auth/account-exists-with-different-credential":
            return "An account with this email already exists using a different sign-in method. Please sign in with that method first to link accounts.";
        default:
            return "Something went wrong. Please try again.";
    }
}

