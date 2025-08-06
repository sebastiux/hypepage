// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    nav: {
      servicios: 'SERVICIOS',
      proyectos: 'PROYECTOS',
      colaboraciones: 'COLABORACIONES',
      contacto: 'CONTACTO'
    },
    hero: {
      subtitle: 'VIDEO CONTENT'
    }
  },
  en: {
    nav: {
      servicios: 'SERVICES',
      proyectos: 'PROJECTS',
      colaboraciones: 'COLLABORATIONS',
      contacto: 'CONTACT'
    },
    hero: {
      subtitle: 'VIDEO CONTENT'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};