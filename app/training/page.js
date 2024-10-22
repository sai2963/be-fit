import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export default async function Trainings() {
    const TrainRef = collection(db, 'Training Data')
    const querySnapShot = await getDocs(TrainRef);
    const TrainingData = querySnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
        }
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
                        Training Resources
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore our comprehensive collection of training materials designed to enhance your skills
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TrainingData.map((TData) => (
                        <div 
                            key={TData.id} 
                            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={TData.imageUrl} 
                                    alt={TData.title}
                                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content Container */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    {TData.title}
                                </h3>
                                
                                <p className="text-gray-300 line-clamp-3">
                                    {TData.description}
                                </p>

                                {/* Action Button */}
                                <button className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg font-medium transform transition duration-200 hover:opacity-90 hover:scale-[1.02] focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {TrainingData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">
                            No training resources available yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}