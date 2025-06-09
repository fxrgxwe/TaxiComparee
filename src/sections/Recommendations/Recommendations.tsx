// components/Recommendations.tsx
import React from "react";

interface Recommendation {
    icon: string;
    text: string;
}

const recommendations: Recommendation[] = [
    {
        icon: "💼",
        text: "Uber найкраще підходить для ділових поїздок",
    },
    {
        icon: "🌃",
        text: "Bolt зручніший для вечірніх поїздок завдяки швидкій подачі",
    },
    {
        icon: "👨‍👩‍👧",
        text: "Uklon ідеальний для сімейних поїздок (опція XL)",
    },
];

const Recommendations: React.FC = () => {
    return (
        <section id="recommendations" className="px-4 md:px-8 lg:px-16 py-12 bg-gray-950 text-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Персональні рекомендації</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {recommendations.map((rec, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-5 flex items-start gap-3 hover:bg-gray-700 transition"
                    >
                        <span className="text-3xl">{rec.icon}</span>
                        <p className="text-sm text-gray-200">{rec.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recommendations;
