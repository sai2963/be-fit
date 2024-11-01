import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center">
          <svg
            className="h-24 w-24 text-indigo-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 8V12" />
            <path d="M12 16H12.01" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-600 text-center mb-8">
          The page you're looking for does not exist.
        </p>
        <div className="flex justify-center">
          <Link href="/"
             className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              Go back home
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;