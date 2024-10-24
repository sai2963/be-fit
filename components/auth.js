'use server';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

export async function handleAuth(formData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    
    if (!email || !password) {
        return {
            success: false,
            error: "Email and password are required"
        };
    }

    try {
        if (name) {
            // Sign up flow
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            
            return {
                success: true,
                user: {
                    email: userCredential.user.email,
                    displayName: name,
                    uid: userCredential.user.uid
                }
            };
        } else {
            // Sign in flow
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            return {
                success: true,
                user: {
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                    uid: userCredential.user.uid
                }
            };
        }
    } catch (error) {
        console.error("Auth error:", error.code, error.message);
        
        const errorMessages = {
            'auth/email-already-in-use': "This email is already registered",
            'auth/invalid-email': "Invalid email address",
            'auth/operation-not-allowed': "Email/password accounts are not enabled",
            'auth/weak-password': "Password should be at least 6 characters",
            'auth/user-disabled': "This account has been disabled",
            'auth/user-not-found': "Invalid email or password",
            'auth/wrong-password': "Invalid email or password"
        };

        return {
            success: false,
            error: errorMessages[error.code] || "An error occurred during authentication"
        };
    }
}