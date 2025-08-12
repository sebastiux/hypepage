// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Servicios from './sections/Servicios';
import Plataformas from './sections/Plataformas';
import Proyectos from './sections/Proyectos';
import Footer from './sections/Footer';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Plataformas />
        <Proyectos />

      </main>
      <Footer />
    </div>
  );
}

export default App;