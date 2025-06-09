import { useState } from 'react';
import './App.css';
import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Recommendations from './sections/Recommendations/Recommendations';
import Reviews from './sections/Reviews/Reviews';
import ReviewForm from './sections/ReviewForm/ReviewForm';
import Footer from './sections/Footer/Footer';
import ComparisonTable from './sections/ComparisonTable/ComparisonTable';
import AdminPanel from './sections/AdminPanel/AdminPanel';


import { useTaxiServices } from './hooks/useTaxiServices';

function App() {
  const [city, setCity] = useState('');
  const { services, loading } = useTaxiServices(city);

  return (
    <>
      <Header />
      <Hero city={city} setCity={setCity} />



      {/* Таблиця або лоадер */}
      {loading ? (
        <p className="text-center text-gray-400 py-10">Завантаження...</p>
      ) : (
        <ComparisonTable services={services} />
      )}

      <Recommendations />
      <Reviews city={city} />
      <ReviewForm city={city} />
      <Footer />
    </>
  );
}

export default App;
