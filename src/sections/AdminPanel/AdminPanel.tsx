// sections/AdminPanel/AdminPanel.tsx
import React, { useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ADMIN_EMAIL = "fxrgxwe@gmail.com"; // ← заміни на свою адресу

interface TaxiService {
    id: string;
    city: string;
    name: string;
    price: number;
    waitTime: string;
    options: string[];
}

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const [services, setServices] = useState<TaxiService[]>([]);
    const [form, setForm] = useState({
        city: "",
        name: "",
        price: "",
        waitTime: "",
        options: "",
    });

    const fetchServices = async () => {
        const q = query(collection(db, "taxiServices"));
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TaxiService[];
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const optionsArray = form.options.split(",").map((opt) => opt.trim());

        await addDoc(collection(db, "taxiServices"), {
            city: form.city.toLowerCase(),
            name: form.name,
            price: Number(form.price),
            waitTime: form.waitTime,
            options: optionsArray,
        });

        setForm({ city: "", name: "", price: "", waitTime: "", options: "" });
        fetchServices();
    };

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, "taxiServices", id));
        fetchServices();
    };

    if (!user || user.email !== ADMIN_EMAIL) {
        return (
            <section className="text-center text-gray-400 py-10">
                🔒 Доступ лише для адміністратора
            </section>
        );
    }


    return (

        <section className="px-6 md:px-16 py-10 text-white bg-gray-950">
            <button
                onClick={() => navigate("/")}
                className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
            >
                ⬅️ Назад на головну
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">🛠️ Адмін-панель</h2>

            <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Місто (kyiv, lviv...)"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                    className="bg-gray-800 px-4 py-2 rounded border border-gray-600"
                />
                <input
                    type="text"
                    placeholder="Назва (Bolt, Uber...)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-gray-800 px-4 py-2 rounded border border-gray-600"
                />
                <input
                    type="number"
                    placeholder="Ціна"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="bg-gray-800 px-4 py-2 rounded border border-gray-600"
                />
                <input
                    type="text"
                    placeholder="Очікування (4 хв)"
                    value={form.waitTime}
                    onChange={(e) => setForm({ ...form, waitTime: e.target.value })}
                    required
                    className="bg-gray-800 px-4 py-2 rounded border border-gray-600"
                />
                <input
                    type="text"
                    placeholder="Опції (XL, Комфорт...)"
                    value={form.options}
                    onChange={(e) => setForm({ ...form, options: e.target.value })}
                    required
                    className="bg-gray-800 px-4 py-2 rounded border border-gray-600 md:col-span-2"
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold col-span-2"
                >
                    ➕ Додати сервіс
                </button>
            </form>

            <div className="max-w-4xl mx-auto grid gap-4">
                {services.map((s) => (
                    <div key={s.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold">{s.name} ({s.city})</p>
                            <p className="text-sm text-gray-400">Ціна: ${s.price} | Час: {s.waitTime}</p>
                            <p className="text-xs text-gray-500">Опції: {s.options.join(", ")}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(s.id)}
                            className="text-red-400 hover:text-red-200"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdminPanel;
