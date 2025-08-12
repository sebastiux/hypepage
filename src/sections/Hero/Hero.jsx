// src/sections/Hero/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { hypeLogoBlanco } from '../../assets/images/logo';
import { HypeVideo } from '../../assets/videos';
import './Hero.scss';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate HYPE logo
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
          <source src={HypeVideo} type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__text-container">
          <img 
            src={hypeLogoBlanco} 
            alt="HYPE" 
            className="hero__logo"
          />
          <p className="hero__subtitle">RELACIONES PÚBLICAS</p>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;