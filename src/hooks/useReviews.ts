// hooks/useReviews.ts
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export interface Review {
    id: string;
    city: string;
    name: string;
    rating: number;
    comment: string;
    timestamp: any;
}

export const useReviews = (city: string) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!city) {
            setReviews([]);
            return;
        }

        const fetchReviews = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "reviews"),
                    where("city", "==", city),
                    orderBy("timestamp", "desc")
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Review[];

                setReviews(data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [city]);

    return { reviews, loading };
};
