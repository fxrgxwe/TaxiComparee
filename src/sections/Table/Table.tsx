// components/ComparisonTable.tsx
import React from "react";

interface TaxiService {
    name: string;
    price: string;
    waitTime: string;
    rating: string;
    options: string[];
}

const services: TaxiService[] = [
    {
        name: "Uber",
        price: "$8",
        waitTime: "4 хв",
        rating: "⭐ 4.8",
        options: ["Комфорт", "Економ"],
    },
    {
        name: "Bolt",
        price: "$10",
        waitTime: "2 хв",
        rating: "⭐ 4.6",
        options: ["Економ", "Жіноче авто"],
    },
    {
        name: "Uklon",
        price: "$9",
        waitTime: "3 хв",
        rating: "⭐ 4.7",
        options: ["Економ", "Стандарт", "XL"],
    },
];

const ComparisonTable: React.FC = () => {
    return (
        <section id="comparison" className="px-4 md:px-8 lg:px-16 py-10 bg-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Порівняння сервісів</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-sm text-gray-300">
                            <th className="px-4 py-3 text-left">Сервіс</th>
                            <th className="px-4 py-3 text-left">Ціна</th>
                            <th className="px-4 py-3 text-left">Очікування</th>
                            <th className="px-4 py-3 text-left">Рейтинг</th>
                            <th className="px-4 py-3 text-left">Опції</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-700 hover:bg-gray-800 transition"
                            >
                                <td className="px-4 py-3 font-medium">{service.name}</td>
                                <td className="px-4 py-3">{service.price}</td>
                                <td className="px-4 py-3">{service.waitTime}</td>
                                <td className="px-4 py-3">{service.rating}</td>
                                <td className="px-4 py-3">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                                        {service.options.map((opt, i) => (
                                            <li key={i}>{opt}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ComparisonTable;
