// src/components/ProjectModal/ProjectModal.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProjectModal.scss';

const ProjectModal = ({ project, isOpen, onClose, isSimple = true }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
      gsap.set(modalRef.current, { display: 'flex' });
      
      const tl = gsap.timeline();
      
      tl.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
      .fromTo('.project-modal__image-wrapper',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo('.project-modal__info > *',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, project]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    
    tl.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.3 })
      .to(modalRef.current, { opacity: 0, duration: 0.3 }, '-=0.2')
      .set(modalRef.current, { display: 'none' });
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose();
    }
  };

  if (!project) return null;

  const galleryImages = project.galleryImages || [];
  const imageCount = galleryImages.length;

  // Función para determinar la distribución de las imágenes
  const getImageDistribution = (count) => {
    const distributions = {
      1: { rows: [1], pattern: 'single' },
      2: { rows: [2], pattern: 'duo' },
      3: { rows: [3], pattern: 'trio' },
      4: { rows: [2, 2], pattern: 'quad' },
      5: { rows: [2, 3], pattern: 'penta' },
      6: { rows: [3, 3], pattern: 'hexa' },
      7: { rows: [4, 3], pattern: 'septa' },
      8: { rows: [3, 2, 3], pattern: 'octa' }
    };

    return distributions[count] || { rows: [3, 3, 3], pattern: 'grid' };
  };

  const distribution = getImageDistribution(imageCount);
  
  // Crear array de arrays basado en la distribución
  const getImageRows = () => {
    const rows = [];
    let imageIndex = 0;
    
    distribution.rows.forEach((imagesInRow) => {
      const row = [];
      for (let i = 0; i < imagesInRow && imageIndex < galleryImages.length; i++) {
        row.push(galleryImages[imageIndex]);
        imageIndex++;
      }
      rows.push(row);
    });
    
    return rows;
  };

  const imageRows = getImageRows();

  return (
    <div 
      className="project-modal" 
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="project-modal__content" ref={contentRef}>
        <button 
          className="project-modal__close" 
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="project-modal__container">
          {/* Left side - Image Gallery */}
          <div 
            className="project-modal__left"
            style={{ backgroundColor: project.brandColor || '#E8D9EC' }}
          >
            <div 
              className={`project-modal__images pattern-${distribution.pattern}`}
              data-count={imageCount}
            >
              {imageRows.map((row, rowIndex) => (
                <div 
                  key={rowIndex} 
                  className="project-modal__row"
                  data-images={row.length}
                >
                  {row.map((image, index) => (
                    <div 
                      key={`${rowIndex}-${index}`} 
                      className="project-modal__image-wrapper"
                    >
                      <img src={image} alt={`${project.name} ${rowIndex * 10 + index + 1}`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Project Info */}
          <div className="project-modal__right">
            <div className="project-modal__info">
              <div className="project-modal__logo">
                <img 
                  src={project.logo} 
                  alt={project.name} 
                  className="project-modal__company-logo"
                />
              </div>
              
              <div className="project-modal__description">
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;