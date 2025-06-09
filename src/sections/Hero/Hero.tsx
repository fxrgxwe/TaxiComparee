// src/sections/Hero/Hero.tsx
import React from 'react';

interface HeroProps {
    city: string;
    setCity: (value: string) => void;
}

const Hero: React.FC<HeroProps> = ({ city, setCity }) => {
    return (
        <section className="py-12 text-center bg-gray-950 text-white mt-[60px]">
            <h1 className="text-4xl font-bold mb-4">МАКС РУНЬКО ІДИ НАХУЙ ПОНЯВ СУКА?</h1>
            <p className="text-gray-400 mb-6">
                Порівняй сервіси таксі за ціною, рейтингом, часом подачі та знайди персональні рекомендації
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <select

                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-gray-800 border border-gray-600 px-4 py-2 rounded text-sm"
                >
                    <option value="">-- Оберіть місто --</option>
                    <option value="kyiv">Kyiv</option>
                    <option value="lviv">Lviv</option>
                    <option value="kharkiv">Kharkiv</option>
                    <option value="Piska">Piska</option>

                </select>

                <button
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-sm font-medium transition"
                    onClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
                >
                    Порівняти сервіси
                </button>
            </div>
        </section>
    );
};

export default Hero;
