'use client';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

export async function authenticateUser(email, password, name = null) {
    try {
        if (!email || !password) {
            return {
                success: false,
                error: "Email and password are required"
            };
        }

        // Sign Up Flow
        if (name) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });
            console.log("User signed up:", user);

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
            };
        } 
        // Sign In Flow
        else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed in:", user);

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
            };
        }
    } catch (error) {
        console.error("Authentication error:", error);
        let errorMessage = "An unexpected error occurred";

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "This email is already registered";
                break;
            case 'auth/invalid-email':
                errorMessage = "Invalid email address";
                break;
            case 'auth/operation-not-allowed':
                errorMessage = "Email/password accounts are not enabled";
                break;
            case 'auth/weak-password':
                errorMessage = "Password should be at least 6 characters";
                break;
            case 'auth/user-disabled':
                errorMessage = "This account has been disabled";
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = "Invalid email or password";
                break;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
}