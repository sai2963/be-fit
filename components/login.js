'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleAuth } from "./auth";

export default function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const formData = new FormData(e.target);
            const response = await handleAuth(formData);

            if (response.success) {
                router.push('/training');
            } else {
                setErrorMessage(response.error);
            }
        } catch (error) {
            console.error("Submit error:", error);
            setErrorMessage("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-950">
            <div className="w-full max-w-md p-8 rounded-2xl bg-gray-950/90 shadow-2xl border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            required
                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 text-white placeholder-gray-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            minLength={6}
                            className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 text-white placeholder-gray-500 transition duration-200"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold transition duration-200 shadow-lg ${
                            isLoading 
                                ? 'opacity-70 cursor-not-allowed' 
                                : 'hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-violet-500/25 hover:scale-105'
                        }`}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMessage("");
                        }}
                        className="w-full text-center mt-4"
                    >
                        <span className="text-gray-400 hover:text-gray-300 transition duration-200">
                            {isLogin ? "New to Netflix? " : "Already a User? "}
                            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent font-semibold hover:from-violet-300 hover:to-fuchsia-400">
                                {isLogin ? "Sign Up Now!" : "Sign In Now!"}
                            </span>
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}