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
        // Sign Up Flow
        if (name) {
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                //redirect('/training');
            }
            catch(error){
                console.log(error);
                
            }
            
        }
        // Sign In Flow
        else {
            try{
                await signInWithEmailAndPassword(auth, email, password);
                //redirect('/training');
            }
            catch(error){
                
                console.log(error);
                
            }
            
        }
    } catch (error) {
        
        return handleAuthError(error);
    }
    redirect('/training')
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