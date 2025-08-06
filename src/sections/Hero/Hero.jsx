import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';
import './Hero.scss';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const playButtonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate HALO text
    tl.fromTo('.hero__title',
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
    )
    .fromTo('.hero__play-button',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );
  }, []);

  const handlePlayClick = () => {
    // Add play video functionality here
    console.log('Play video');
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__background">
        <video 
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Add your video source here */}
          {/* <source src="/path-to-your-video.mp4" type="video/mp4" /> */}
        </video>
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__text-container">
          <h1 className="hero__title">HALO</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
        </div>
        
        <button 
          ref={playButtonRef}
          className="hero__play-button"
          onClick={handlePlayClick}
          aria-label="Play video"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="39" stroke="white" strokeWidth="2"/>
            <path d="M52 40L32 28V52L52 40Z" fill="white"/>
          </svg>
        </button>
      </div>

      <div className="hero__scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;