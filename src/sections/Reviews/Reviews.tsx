// sections/Reviews/Reviews.tsx
import React from "react";
import { useReviews } from "../../hooks/useReviews";

interface Props {
    city: string;
}

const Reviews: React.FC<Props> = ({ city }) => {
    const { reviews, loading } = useReviews(city);

    if (!city) return null;

    return (
        <section className="px-6 md:px-16 py-10 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold text-center mb-6">Відгуки користувачів</h2>

            {loading ? (
                <p className="text-center text-gray-400">Завантаження...</p>
            ) : reviews.length === 0 ? (
                <p className="text-center text-gray-400">Відгуків поки немає</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reviews.map((r) => (
                        <div key={r.id} className="bg-gray-800 rounded p-4">
                            <p className="font-semibold">{r.name}</p>
                            <p className="font-semibold">
                                <span className="text-gray-400 text-sm">{r.service}</span>
                            </p>
                            <p className="text-yellow-400">{"⭐".repeat(r.rating)}</p>
                            <p className="text-sm mt-2 text-gray-300">{r.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Reviews;
