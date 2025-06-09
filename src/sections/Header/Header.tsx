// components/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Можна замінити на будь-яку іконку
import { useNavigate } from "react-router-dom";

import { signIn, logOut } from "../../firebase/auth";
import { useAuth } from "../../hooks/useAuth";


const ADMIN_EMAIL = "fxrgxwe@gmail.com";

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);


    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="w-full bg-gray-900 text-white border-b border-gray-700 fixed top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center " >
                {/* Logo */}
                <div className="text-xl font-bold">TaxiCompare</div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 text-sm">
                    <a href="#comparison" className="hover:text-gray-400">Comparison</a>
                    <a href="#recommendations" className="hover:text-gray-400">Recommendations</a>
                    <a href="#reviews" className="hover:text-gray-400">Reviews</a>
                    <a href="#footer" className="hover:text-gray-400">Contact</a>

                    <div className="flex gap-4 items-center">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-400">👤 {user.displayName}</span>
                                <button onClick={logOut} className="text-sm hover:text-red-400">Вийти</button>
                            </>
                        ) : (
                            <button onClick={signIn} className="text-sm hover:text-blue-400">Увійти з Google</button>
                        )}
                    </div>
                    <div className="flex gap-4 items-center">
                        {user && user.email === ADMIN_EMAIL && (
                            <button
                                onClick={() => navigate("/admin")}
                                className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                            >
                                🔧 Адмін-панель
                            </button>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-gray-800 px-4 pb-4 space-y-2 text-sm">
                    <a href="#comparison" className="block hover:text-gray-300">Comparison</a>
                    <a href="#recommendations" className="block hover:text-gray-300">Recommendations</a>
                    <a href="#reviews" className="block hover:text-gray-300">Reviews</a>
                    <a href="#contact" className="block hover:text-gray-300">Contact</a>
                </nav>
            )}


        </header>
    );
};

export default Header;
