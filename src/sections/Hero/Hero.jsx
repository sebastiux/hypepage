// src/sections/Hero/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';
import { haloLogoBlanco } from '../../assets/images/logo';
import { honorVideo } from '../../assets/videos';
import './Hero.scss';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate HALO logo
    tl.fromTo('.hero__logo',
      { 
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out'
      }
    )
    .fromTo('.hero__subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__background">
        <video 
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={honorVideo} type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__text-container">
          <img 
            src={haloLogoBlanco} 
            alt="HALO" 
            className="hero__logo"
          />
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;