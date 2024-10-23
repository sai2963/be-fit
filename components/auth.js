import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

export async function Auth(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const isLogin = formData.get("isLogin") === 'true'; // Ensure boolean
    let user;

    if (isLogin) { // Sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
      console.log("User signed in:", user);
      return { success: true, user };
    } else { // Sign up
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
        await updateProfile(user, { displayName: name });
        console.log("User signed up:", user);
        return { success: true, user };
      } catch (signUpError) {
        switch (signUpError.code) {
          case "auth/email-already-in-use":
            return { success: false, error: "This email is already in use. Please sign in instead." };
          case "auth/weak-password":
            return { success: false, error: "Password is too weak. Please choose a stronger password." };
          case "auth/network-request-failed":
            return { success: false, error: "Network error. Please check your internet connection and try again." };
          default:
            console.error("Signup error:", signUpError);
            return { success: false, error: "An error occurred during signup. Please try again." };
        }
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "An error occurred during authentication. Please try again." };
  }
}