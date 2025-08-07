// src/sections/Servicios/Servicios.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  iconAftermovies,
  iconAnimacion,
  iconBrandedContent,
  iconContenidoRedes,
  iconFooh,
  iconShootings,
  iconTestimoniales,
  iconTvSeries,
  iconVideoclips
} from '../../assets/images/icons';
import './Servicios.scss';

gsap.registerPlugin(ScrollTrigger);

const Servicios = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef([]);

  const services = [
    {
      id: 'branded-content',
      icon: iconBrandedContent,
      title: 'BRANDED CONTENT'
    },
    {
      id: 'shootings',
      icon: iconShootings,
      title: 'SHOOTINGS FOTOGRÁFICO'
    },
    {
      id: 'contenido-redes',
      icon: iconContenidoRedes,
      title: 'CONTENIDO REDES SOCIALES'
    },
    {
      id: 'aftermovies',
      icon: iconAftermovies,
      title: 'AFTERMOVIES'
    },
    {
      id: 'videoclips',
      icon: iconVideoclips,
      title: 'VIDEOCLIPS'
    },
    {
      id: 'tv-series',
      icon: iconTvSeries,
      title: 'MOVIES/TV SERIES'
    },
    {
      id: 'testimoniales',
      icon: iconTestimoniales,
      title: 'TESTIMONIALES'
    },
    {
      id: 'animacion',
      icon: iconAnimacion,
      title: 'ANIMACIÓN'
    },
    {
      id: 'fooh',
      icon: iconFooh,
      title: 'CGI/FOOH'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo('.servicios__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.servicios__subtitle',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.servicios__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.servicios__line',
            start: 'top 80%'
          }
        }
      );

      // Services animation
      gsap.fromTo(servicesRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

return (
  <section className="servicios" id="servicios" ref={sectionRef}>
    <div className="container">
      <div className="servicios__header">
        <p className="servicios__subtitle">
          NOS DEDICAMOS A CONTAR HISTORIAS A TRAVÉS DE LA PRODUCCIÓN Y EDICIÓN AUDIOVISUAL
        </p>
        <h2 className="servicios__title" ref={titleRef}>SERVICIOS</h2>
        <div className="servicios__line"></div>
      </div>

      <div className="servicios__grid">
        {/* First row - 5 items */}
        <div className="servicios__row servicios__row--first">
          {services.slice(0, 5).map((service, index) => (
            <div
              key={service.id}
              ref={el => servicesRef.current[index] = el}
              className="servicios__service"
            >
              <div className="servicios__icon-wrapper">
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="servicios__icon"
                />
              </div>
              <h3 className="servicios__service-title">{service.title}</h3>
            </div>
          ))}
        </div>

        {/* Second row - 4 items */}
        <div className="servicios__row servicios__row--second">
          {services.slice(5, 9).map((service, index) => (
            <div
              key={service.id}
              ref={el => servicesRef.current[index + 5] = el}
              className="servicios__service"
            >
              <div className="servicios__icon-wrapper">
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="servicios__icon"
                />
              </div>
              <h3 className="servicios__service-title">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default Servicios;