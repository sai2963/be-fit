'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user);
            setCurrentUser(user);
        });

      
        return () => unsubscribe();
    }, []); 

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

 
    useEffect(() => {
        console.log("Current user state:", currentUser);
    }, [currentUser]);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800'
                : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo/Title */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                            <div className="relative px-4 py-1 bg-black ring-1 ring-gray-800 rounded-lg">
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Be-Fit
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-1 md:space-x-4">
                        {currentUser ? (
                            <>
                                <Link
                                    href="/training"
                                    className="relative px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                                >
                                    <span className="relative z-10">Training</span>
                                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </Link>
                                <Link
                                    href="/add-training"
                                    className="relative px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                                >
                                    <span className="relative z-10">Add Training</span>
                                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200"
                                >
                                    <span>Logout</span>
                                </button>
                            </>
                        )
                        
                        : (
                            <Link
                                href="/login"
                                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200"
                            >
                                <span>Login</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}