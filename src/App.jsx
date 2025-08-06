import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Servicios from './sections/Servicios';
import Proyectos from './sections/Proyectos';
import Colaboraciones from './sections/Colaboraciones';
import Footer from './sections/Footer';
import './App.scss';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Servicios />
          <Proyectos />
          <Colaboraciones />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;