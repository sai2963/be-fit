import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl shadow-purple-700/50 ring-1 ring-purple-600/20">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg py-2 hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-md shadow-purple-700/30",
              formFieldInput:
                "bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-600 focus:border-transparent",
              formFieldLabel:
                "text-gray-300 font-medium mb-1",
              card: "bg-gray-800 text-gray-100",
              headerTitle: "text-2xl font-bold text-white mb-2",
              headerSubtitle: "text-sm text-gray-400 mb-4",
              socialButtonIcon: "text-gray-400",
              socialButtonText: "text-gray-200",  
              socialButtonsBlockButtonText__google:"text-gray-200",
              footerActionLink: "text-purple-400 hover:underline",
            },
          }}
        />
      </div>
    </div>
  );
}
