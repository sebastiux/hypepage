// src/sections/Proyectos/Proyectos.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from '../../components/ProjectModal';
import {
  astonMartinLogoBlanco,
  lamborghiniLogoBlanco,
  yvesRocherBlanco
} from '../../assets/images/logo';
import {
  astonMartinHALO1,
  astonMartinHALO2,
  astonMartinHALO3,
  astonMartinHALO4,
  astonMartinHALO5,
  astonMartinHALO6,
  astonMartinPortadaHALO,
  lamborghiniHALO1,
  lamborghiniHALO2,
  lamborghiniHALO3,
  lamborghiniHALO4,
  lamborghiniHALO5,
  lamborghiniHALO6,
  lamborghiniPortadaHALO,
  yvesRocherHALO1,
  yvesRocherHALO2,
  yvesRocherHALO3,
  yvesRocherHALO4
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
      id: 'aston-martin',
      name: 'Aston Martin',
      logo: astonMartinLogoBlanco,
      image: astonMartinPortadaHALO,
      galleryImages: [
        astonMartinHALO1,
        astonMartinHALO2,
        astonMartinHALO3,
        astonMartinHALO4,
        astonMartinHALO5,
        astonMartinHALO6
      ],
      description: 'Colaboramos con Aston Martin en la creación de contenido audiovisual exclusivo para el lanzamiento de sus modelos de lujo, capturando la esencia británica y la elegancia atemporal de la marca.',
      brandColor: '#003E2F'
    },
    {
      id: 'lamborghini',
      name: 'Lamborghini',
      logo: lamborghiniLogoBlanco,
      image: lamborghiniPortadaHALO,
      galleryImages: [
        lamborghiniHALO1,
        lamborghiniHALO2,
        lamborghiniHALO3,
        lamborghiniHALO4,
        lamborghiniHALO5,
        lamborghiniHALO6
      ],
      description: 'Contenido audiovisual de ultra lujo para Lamborghini, capturando la exclusividad, el diseño italiano y la experiencia única de conducir estos súper deportivos.',
      brandColor: '#000000'
    },
    {
      id: 'yves-rocher',
      name: 'Yves Rocher',
      logo: yvesRocherBlanco,
      image: yvesRocherHALO1,
      galleryImages: [
        yvesRocherHALO1,
        yvesRocherHALO2,
        yvesRocherHALO3,
        yvesRocherHALO4
      ],
      description: 'Producción de contenido natural y fresco para Yves Rocher, comunicando los valores de belleza botánica y sustentabilidad de la marca francesa.',
      brandColor: '#7FB539'
    }
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