// components/login.js
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use correct import for Next.js Router
import { Auth } from "./auth";

export default function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter(); // Create a router instance

    const toggleFormType = () => {
        setIsLogin(!isLogin);
        setErrorMessage(null); // Reset error message when toggling forms
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.target); // Get form data

        const response = await Auth(formData); // Call Auth function

        if (response.success) {
            // Redirect to the training page
            router.push('/training');
        } else {
            // Set error message for display
            setErrorMessage(response.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-950">
            <div className="w-full max-w-md p-8 rounded-2xl bg-gray-950/90 shadow-2xl border border-gray-800">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isLogin && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 text-white placeholder-gray-500 transition duration-200"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 text-white placeholder-gray-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 text-white placeholder-gray-500 transition duration-200"
                        />
                    </div>

                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Display error message */}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transform hover:scale-105 transition duration-200 shadow-lg hover:shadow-violet-500/25"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>

                    <div onClick={toggleFormType} className="text-center mt-4 cursor-pointer">
                        {isLogin ? (
                            <span className="text-gray-400 hover:text-gray-300 transition duration-200">
                                New to Netflix?{" "}
                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent font-semibold hover:from-violet-300 hover:to-fuchsia-400">
                                    Sign Up Now!
                                </span>
                            </span>
                        ) : (
                            <span className="text-gray-400 hover:text-gray-300 transition duration-200">
                                Already an User?{" "}
                                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent font-semibold hover:from-violet-300 hover:to-fuchsia-400">
                                    Sign In Now!
                                </span>
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
