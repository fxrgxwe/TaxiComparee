// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer id="footer" className="bg-gray-900 text-white border-t border-gray-700 px-4 md:px-8 lg:px-16 py-6 text-sm">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    © {new Date().getFullYear()} TaxiCompare. Усі права захищені.
                </div>

                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="hover:text-gray-400 transition"
                    >
                        Політика конфіденційності
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-400 transition"
                    >
                        Умови користування
                    </a>
                    <a
                        href="mailto:support@taxicompare.com"
                        className="hover:text-gray-400 transition"
                    >
                        support@taxicompare.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
