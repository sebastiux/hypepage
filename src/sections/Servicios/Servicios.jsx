// src/sections/Servicios/Servicios.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  iconEstrategiaConMedio,
  iconBrandCollabs,
  iconMediaTraining
} from '../../assets/images/icons';
import './Servicios.scss';

gsap.registerPlugin(ScrollTrigger);

const Servicios = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const servicesRef = useRef([]);

  const services = [
    {
      id: 'estrategia-medio',
      icon: iconEstrategiaConMedio,
      title: 'ESTRATEGIA CON MEDIO'
    },
    {
      id: 'brand-collabs',
      icon: iconBrandCollabs,
      title: 'BRAND COLLABS'
    },
    {
      id: 'media-training',
      icon: iconMediaTraining,
      title: 'MEDIA TRAINING'
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
          stagger: 0.15,
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
            NOS DEDICAMOS A CREAR ESTRATEGIAS DE RELACIONES PÚBLICAS,
            CONECTANDO MENSAJES AUTÉNTICOS CON DIVERSAS AUDIENCIAS
          </p>
          <h2 className="servicios__title" ref={titleRef}>SERVICIOS</h2>
          <div className="servicios__line"></div>
        </div>

        <div className="servicios__grid">
          <div className="servicios__row">
            {services.map((service, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default Servicios;