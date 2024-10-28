'use server';

import { redirect } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

export async function authenticateUser(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    
    if (!email || !password) {
        return {
            errors: {
                auth: "Email and password are required"
            }
        };
    }

    try {
        let user;
        
        // Sign Up Flow
        if (name) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log("Signup successful:", user);
        }
        // Sign In Flow
        else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            console.log("Login successful:", user);
        }

        // Redirect after successful authentication
        return redirect('/training');

    } catch (error) {
        console.error("Authentication error:", error);
        return handleAuthError(error);
    }
}

function handleAuthError(error) {
    let errorMessage = "An unexpected Error Occurred";

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
        errors: {
            auth: errorMessage
        }
    };
}