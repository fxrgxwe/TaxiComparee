// sections/ReviewForm/ReviewForm.tsx
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useAuth } from "../../hooks/useAuth";

interface Props {
    city: string;
}

const ReviewForm: React.FC<Props> = ({ city }) => {
    const [formData, setFormData] = useState({
        rating: 5,
        comment: "",
        service: "",
    });

    const [success, setSuccess] = useState(false);

    const { user } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!city) return;

        try {
            await addDoc(collection(db, "reviews"), {
                ...formData,
                city,
                rating: Number(formData.rating),
                name: user.email,
                timestamp: serverTimestamp(),
            });

            setFormData({ name: "", rating: 5, comment: "", service: "" });
            setSuccess(true);
        } catch (err) {
            console.error("Помилка при надсиланні відгуку:", err);
        }
    };

    if (!user) {
        return (
            <section className="py-10 text-center text-gray-400">
                <p>Щоб залишити відгук — увійдіть через Google</p>
            </section>
        );
    }

    return (
        <section className="px-6 md:px-16 py-10 bg-gray-950 text-white">
            <h2 className="text-2xl font-bold text-center mb-6">Залишити відгук</h2>

            {success && (
                <p className="text-center text-green-400 mb-4">Дякуємо за відгук!</p>
            )}

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">

                <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
                >
                    <option value="">Оберіть таксі</option>
                    <option value="Uber">Uber</option>
                    <option value="Bolt">Bolt</option>
                    <option value="Uklon">Uklon</option>
                </select>


                <div>
                    <label className="block mb-1">Оцінка:</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onClick={() => handleRatingClick(star)}
                                className={`text-2xl ${star <= formData.rating ? "text-yellow-400" : "text-gray-500"
                                    }`}
                            >
                                {star <= formData.rating ? "⭐" : "☆"}

                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    placeholder="Ваш коментар"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold transition"
                >
                    Надіслати відгук
                </button>
            </form>
        </section>
    );
};

export default ReviewForm;
