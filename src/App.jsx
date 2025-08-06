// src/App.jsx
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import './App.scss';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Navbar />
        <main>
          <Hero />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;