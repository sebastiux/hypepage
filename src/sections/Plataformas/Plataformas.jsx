// src/sections/Plataformas/Plataformas.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { logoPlataformasHYPE } from '../../assets/images/logo';
import './Plataformas.scss';

gsap.registerPlugin(ScrollTrigger);

const Plataformas = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

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
      gsap.fromTo('.plataformas__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.plataformas__line',
            start: 'top 80%'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { 
          opacity: 0, 
          scale: 0.95,
          y: 30 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="plataformas" id="plataformas" ref={sectionRef}>
      <div className="container">
        <div className="plataformas__header">
          <h2 className="plataformas__title" ref={titleRef}>PLATAFORMAS</h2>
          <div className="plataformas__line"></div>
        </div>

        <div className="plataformas__content">
          <div className="plataformas__image-wrapper" ref={imageRef}>
            <img 
              src={logoPlataformasHYPE} 
              alt="Plataformas de medios - HYPE" 
              className="plataformas__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plataformas;