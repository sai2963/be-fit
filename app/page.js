import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import SliderComponent from "@/components/SliderComponent";
import FeatureSection from "@/components/FeatureSection";

export default async function HomePage() {
    const TrainRef = collection(db, 'Training Data');
    const querySnapShot = await getDocs(TrainRef);
    const TrainingData = querySnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
        };
    });

    // Prepare slides data
    const slides = TrainingData.length > 0 ? 
        TrainingData.map(item => ({
            image: item.imageUrl || '/api/placeholder/1920/1080',
            title: item.title || "Training Program",
            subtitle: item.description || "Professional Training Services"
        })) :
        [
            {
                image: '/api/placeholder/1920/1080',
                title: "Transform Your Journey",
                subtitle: "Professional Training Programs"
            },
            {
                image: '/api/placeholder/1920/1080',
                title: "Achieve Your Goals",
                subtitle: "Personalized Fitness Plans"
            }
        ];

    return (
        <div className="min-h-screen bg-gray-950">
            <SliderComponent slides={slides} />
            <FeatureSection features={TrainingData.slice(0, 3)} />
        </div>
    );
}