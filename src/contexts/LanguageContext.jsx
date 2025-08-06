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
      title: 'HALO',
      subtitle: 'VIDEO CONTENT'
    },
    servicios: {
      title: 'SERVICIOS',
      subtitle: 'NOS DEDICAMOS A CONTAR HISTORIAS A TRAVÉS DE LA PRODUCCIÓN Y EDICIÓN AUDIOVISUAL.',
      items: {
        brandedContent: 'BRANDED CONTENT',
        shootings: 'SHOOTINGS FOTOGRÁFICO',
        contenidoRedes: 'CONTENIDO REDES SOCIALES',
        aftermovies: 'AFTERMOVIES',
        videoclips: 'VIDEOCLIPS',
        moviesTv: 'MOVIES/TV SERIES',
        testimoniales: 'TESTIMONIALES',
        animacion: 'ANIMACIÓN',
        cgi: 'CGI/FOOH'
      }
    },
    proyectos: {
      title: 'PROYECTOS'
    },
    colaboraciones: {
      title: 'COLABORACIONES'
    },
    footer: {
      title: 'Deja tu huella',
      subtitle: 'Contáctanos',
      form: {
        name: 'Nombre completo*',
        email: 'Email*',
        phone: 'Teléfono*',
        message: 'Mensaje*',
        submit: 'ENVIAR POR WHATSAPP'
      }
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
      title: 'HALO',
      subtitle: 'VIDEO CONTENT'
    },
    servicios: {
      title: 'SERVICES',
      subtitle: 'WE ARE DEDICATED TO TELLING STORIES THROUGH AUDIOVISUAL PRODUCTION AND EDITING.',
      items: {
        brandedContent: 'BRANDED CONTENT',
        shootings: 'PHOTO SHOOTINGS',
        contenidoRedes: 'SOCIAL MEDIA CONTENT',
        aftermovies: 'AFTERMOVIES',
        videoclips: 'VIDEOCLIPS',
        moviesTv: 'MOVIES/TV SERIES',
        testimoniales: 'TESTIMONIALS',
        animacion: 'ANIMATION',
        cgi: 'CGI/FOOH'
      }
    },
    proyectos: {
      title: 'PROJECTS'
    },
    colaboraciones: {
      title: 'COLLABORATIONS'
    },
    footer: {
      title: 'Leave your mark',
      subtitle: 'Contact us',
      form: {
        name: 'Full name*',
        email: 'Email*',
        phone: 'Phone*',
        message: 'Message*',
        submit: 'SEND VIA WHATSAPP'
      }
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