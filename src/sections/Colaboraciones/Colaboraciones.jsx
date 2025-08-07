// src/sections/Colaboraciones/Colaboraciones.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  omodaLogo,
  zeekrNegro,
  lamborghiniLogoNegro,
  astonMartinLogoNegro,
  kavakLogo,
  highLifeLogo,
  steveMaddenLogoNegro,
  yvesRocherNegro,
  fordLogo,
  mgLogo,
  donJulioLogo,
  cybexLogo,
  dodgeLogo,
  commandoLogo
} from '../../assets/images/logo';
import './Colaboraciones.scss';

gsap.registerPlugin(ScrollTrigger);

const Colaboraciones = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const colaboradores = {
    fila1: [
      { id: 'omoda', logo: omodaLogo, name: 'OMODA' },
      { id: 'zeekr', logo: zeekrNegro, name: 'Zeekr' },
      { id: 'lamborghini', logo: lamborghiniLogoNegro, name: 'Lamborghini' },
      { id: 'aston-martin', logo: astonMartinLogoNegro, name: 'Aston Martin' },
      { id: 'kavak', logo: kavakLogo, name: 'Kavak' },
      { id: 'highlife', logo: highLifeLogo, name: 'High Life' },
      { id: 'steve-madden', logo: steveMaddenLogoNegro, name: 'Steve Madden' },
      { id: 'yves-rocher', logo: yvesRocherNegro, name: 'Yves Rocher' }
    ],
    fila2: [
      { id: 'ford', logo: fordLogo, name: 'Ford' },
      { id: 'mg', logo: mgLogo, name: 'MG' },
      { id: 'don-julio', logo: donJulioLogo, name: 'Don Julio' },
      { id: 'cybex', logo: cybexLogo, name: 'Cybex' },
      { id: 'dodge', logo: dodgeLogo, name: 'Dodge' },
      { id: 'commando', logo: commandoLogo, name: 'Commando' }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Line animation
      gsap.fromTo('.colaboraciones__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.colaboraciones__line',
            start: 'top 80%'
          }
        }
      );

      // Logos animation - fila 1
      gsap.fromTo('.colaboraciones__row--1 .colaboraciones__logo',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.colaboraciones__row--1',
            start: 'top 85%',
          }
        }
      );

      // Logos animation - fila 2
      gsap.fromTo('.colaboraciones__row--2 .colaboraciones__logo',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: '.colaboraciones__row--2',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="colaboraciones" id="colaboraciones" ref={sectionRef}>
      <div className="container">
        <div className="colaboraciones__header">
          <h2 className="colaboraciones__title" ref={titleRef}>COLABORACIONES</h2>
          <div className="colaboraciones__line"></div>
        </div>

        <div className="colaboraciones__content">
          {/* Primera fila - 8 logos */}
          <div className="colaboraciones__row colaboraciones__row--1">
            {colaboradores.fila1.map((colaborador) => (
              <div key={colaborador.id} className="colaboraciones__logo">
                <img 
                  src={colaborador.logo} 
                  alt={colaborador.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Segunda fila - 6 logos */}
          <div className="colaboraciones__row colaboraciones__row--2">
            {colaboradores.fila2.map((colaborador) => (
              <div key={colaborador.id} className="colaboraciones__logo">
                <img 
                  src={colaborador.logo} 
                  alt={colaborador.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Colaboraciones;