// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from '../../components/ProjectModal';
import {
  maxMaraLogoBlanco
} from '../../assets/images/logo';
import {
  maxMaraHYPE1,
  maxMaraHYPE2,
  maxMaraHYPE3,
  maxMaraHYPE4,
  maxMaraHYPE5,
  maxMaraPortadaHYPE
} from '../../assets/images/projects';
import './Proyectos.scss';

gsap.registerPlugin(ScrollTrigger);

const Proyectos = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 'maxmara',
      name: 'MaxMara',
      logo: maxMaraLogoBlanco,
      image: maxMaraPortadaHYPE,
      galleryImages: [
        maxMaraHYPE1,
        maxMaraHYPE2,
        maxMaraHYPE3,
        maxMaraHYPE4,
        maxMaraHYPE5
      ],
      description: 'Estrategia de relaciones públicas para el lanzamiento de la nueva colección MaxMara, conectando con influencers y medios especializados en moda de lujo.',
      brandColor: '#8B0000'
    }
    // Aquí se agregarán más proyectos cuando tengas las imágenes
  ];

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
      gsap.fromTo('.proyectos__line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.proyectos__line',
            start: 'top 80%'
          }
        }
      );

      // Carousel animation
      gsap.fromTo('.proyectos__carousel',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: '.proyectos__carousel',
            start: 'top 80%'
          }
        }
      );

      // Brand items animation
      gsap.fromTo('.proyectos__brand',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.8,
          scrollTrigger: {
            trigger: '.proyectos__brands',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="proyectos" id="proyectos" ref={sectionRef}>
      <div className="container">
        <div className="proyectos__header">
          <h2 className="proyectos__title" ref={titleRef}>PROYECTOS</h2>
          <div className="proyectos__line"></div>
        </div>

        <div className="proyectos__carousel" ref={carouselRef}>
          <div className="proyectos__brands">
            {projects.map((project) => (
              <div
                key={project.id}
                className="proyectos__brand"
                onClick={() => handleProjectClick(project)}
              >
                <div className="proyectos__brand-container">
                  {/* Background image */}
                  <div 
                    className="proyectos__brand-bg" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {/* Glass overlay */}
                  <div className="proyectos__brand-overlay" />
                  
                  {/* Brand logo */}
                  <div className="proyectos__brand-content">
                    <img 
                      src={project.logo} 
                      alt={project.name}
                      className="proyectos__brand-logo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isSimple={true}
        />
      )}
    </section>
  );
};

export default Proyectos;