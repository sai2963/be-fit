'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
    const { signOut } = useClerk()

    return (
        // Clicking this button signs out a user
        // and redirects them to the home page "/".
        <button onClick={() => signOut({ redirectUrl: '/sign-in' })} className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200">Sign out</button>
    )
}