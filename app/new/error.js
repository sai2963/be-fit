'use client'

import Link from "next/link"

export default function Error({ error }) {
    return (
        <>
            <div class="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div class="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
                    <div class="flex justify-center">
                        <svg class="h-24 w-24 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                            <path d="M12 8V12" />
                            <path d="M12 16H12.01" />
                        </svg>
                    </div>
                    <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">Oops!</h1>
                    <p class="text-gray-600 text-center mb-8">{error.message}</p>
                    <div class="flex justify-center">
                        <Link href="/" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">Go back home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}