import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config"; // Adjust the import path

const provider = new GoogleAuthProvider();

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("Error in user credential");
    }
    const token = credential.accessToken;
    const user = result.user;
    console.log("Google Sign-In Success:", user, token);
    return { user, token }; // Return both user and token
  } catch (error) {
    console.error("Google Sign-In Error:", error);

    // Handle specific errors
    let errorMessage = "Google Sign-In failed. Please try again.";
    switch (error.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Popup closed by user. Please try again.";
        break;
      case "auth/network-request-failed":
        errorMessage = "Network error. Please check your connection.";
        break;
      default:
        break;
    }

    throw new Error(errorMessage); // Throw a user-friendly error
  }
};

