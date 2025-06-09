import { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

// Базова структура сервісу
export interface TaxiService {
    city: string;
    name: string;
    price: number;
    waitTime: string;
    options: string[];
}

// Розширена структура з рейтингом і кількістю відгуків
export interface TaxiServiceWithAvgRating extends TaxiService {
    avgRating: number | null;
    reviewCount: number;
}

export const useTaxiServices = (city: string) => {
    const [services, setServices] = useState<TaxiServiceWithAvgRating[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            if (!city) {
                setServices([]);
                return;
            }

            setLoading(true);

            try {
                // 1. Отримуємо всі сервіси для обраного міста
                const q = query(collection(db, "taxiServices"), where("city", "==", city));
                const snapshot = await getDocs(q);
                const taxiList = snapshot.docs.map((doc) => doc.data() as TaxiService);
                console.log("Taxi services:", taxiList);

                // 2. Підтягуємо до кожного сервісу відгуки
                const servicesWithRatings: TaxiServiceWithAvgRating[] = await Promise.all(
                    taxiList.map(async (service) => {
                        const rQuery = query(
                            collection(db, "reviews"),
                            where("city", "==", city),
                            where("service", "==", service.name)
                        );

                        const rSnap = await getDocs(rQuery);
                        const ratings = rSnap.docs.map((doc) => (doc.data() as DocumentData).rating);

                        const avg =
                            ratings.length > 0
                                ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
                                : null;

                        return {
                            ...service,
                            avgRating: avg,
                            reviewCount: ratings.length,

                        };
                    })
                );

                setServices(servicesWithRatings);
            } catch (err) {
                console.error("Помилка при отриманні сервісів:", err);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [city]);

    return { services, loading };
};
