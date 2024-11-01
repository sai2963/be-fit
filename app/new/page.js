import { collection, addDoc } from "firebase/firestore";
import { redirect } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/clientApp";

export default function Addtraining() {
    async function posttraining(formData) {
        "use server"
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get('image')

        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image, { content: image.type });
        const imageUrl = await getDownloadURL(storageRef);

        const TrainingData = {
            title, description, imageUrl, createdAt: new Date(),
        }

        const docRef = await addDoc(collection(db, 'Training Data'), TrainingData)

       redirect('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-8 space-y-8">
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                        Add New Training
                    </h2>
                    
                    <form action={posttraining} className="space-y-6">
                        <div className="space-y-2">
                            <label 
                                htmlFor="title" 
                                className="block text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
                            >
                                Title
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 text-gray-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label 
                                htmlFor="description" 
                                className="block text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
                            >
                                Description
                            </label>
                            <textarea
                                id="description" 
                                name="description"
                                rows="4" 
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 text-gray-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label 
                                htmlFor="image" 
                                className="block text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
                            >
                                Image
                            </label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                id="image" 
                                name="image"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg hover:opacity-90 transform transition duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Add Training
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}