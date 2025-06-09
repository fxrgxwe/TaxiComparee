// components/ComparisonTable.tsx
import React from "react";
import { TaxiService } from "../hooks/useTaxiServices"; // тип із хука

interface Props {
    services: TaxiService[];
}

const ComparisonTable: React.FC<Props> = ({ services }) => {
    if (!services || !Array.isArray(services)) {
        return <p className="text-center text-gray-400 py-10">Завантаження сервісів...</p>;
    }

    return (
        <section className="px-4 md:px-8 lg:px-16 py-10 bg-gray-900 text-white ">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Порівняння сервісів
            </h2>

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
                                <td className="px-4 py-3">${service.price}</td>
                                <td className="px-4 py-3">{service.waitTime}</td>
                                <td className="px-4 py-3">
                                    ⭐ {service.avgRating ?? "—"}{" "}
                                    <span className="text-xs text-gray-400">({service.reviewCount})</span>
                                </td>


                                <td className="px-4 py-3">
                                    <ul className="list-disc list-inside text-sm text-gray-400">
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
