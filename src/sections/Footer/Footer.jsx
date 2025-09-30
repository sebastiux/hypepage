// src/sections/Footer/Footer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//import { useLanguage } from '../../contexts/LanguageContext';
import { hgroupNegro } from '../../assets/images/logo';
import './Footer.scss';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  //const { t } = useLanguage();
  const footerRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  // WhatsApp number for H Group (Mexico format)
  const whatsappNumber = '+5215619933412';

  // Google Maps URL for the location
  const googleMapsUrl = "https://www.google.com/maps/place/Blvd.+Palmas+Hills+1,+Valle+de+las+Palmas,+52787+Naucalpan+de+Ju%C3%A1rez,+M%C3%A9x./@19.3925333,-99.2809451,17z/data=!3m1!4b1!4m6!3m5!1s0x85d206cd0ecf99d7:0x5cf8cf0df97e7401!8m2!3d19.3925333!4d-99.2809451!16s%2Fg%2F11xh2zvqk1";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form elements
      gsap.fromTo('.footer__form-group',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__form',
            start: 'top 80%'
          }
        }
      );

      // Animate map with circular reveal
      gsap.fromTo('.footer__map-container',
        { 
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.footer__map-container',
            start: 'top 80%'
          }
        }
      );

      // Animate info section
      gsap.fromTo('.footer__info > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__info',
            start: 'top 80%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
      
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un email válido';
      }
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor ingresa tu teléfono';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor ingresa un mensaje';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for form
      gsap.fromTo(formRef.current,
        { x: -10 },
        { 
          x: 10, 
          duration: 0.1, 
          repeat: 3, 
          yoyo: true,
          onComplete: () => gsap.set(formRef.current, { x: 0 })
        }
      );
      return;
    }

    // Create WhatsApp message
    const message = `¡Hola H Group, me interesa colaborar con HYPE!

Me gustaría ponerme en contacto con ustedes.

*Mis datos:*
📝 *Nombre:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.phone}

💬 *Mensaje:*
${formData.message}

_Enviado desde el formulario de contacto de HYPE`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        // Optional: Reset form after redirect
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
          
          // Show success feedback
          gsap.fromTo('.footer__form',
            { opacity: 0.5 },
            { opacity: 1, duration: 0.5 }
          );
        }, 1000);
      }
    });
  };

  const handleAddressClick = () => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer" id="contacto" ref={footerRef}>
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <h2 className="footer__title">Deja tu huella</h2>
            <h3 className="footer__subtitle">Contáctanos</h3>

            <form className="footer__form" onSubmit={handleSubmit} ref={formRef}>
              <div className="footer__form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo*"
                  className={`footer__input ${errors.name ? 'footer__input--error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className="footer__error">{errors.name}</span>}
              </div>
              
              <div className="footer__form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={`footer__input ${errors.email ? 'footer__input--error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="footer__error">{errors.email}</span>}
              </div>
              
              <div className="footer__form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono*"
                  className={`footer__input ${errors.phone ? 'footer__input--error' : ''}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className="footer__error">{errors.phone}</span>}
              </div>
              
              <div className="footer__form-group">
                <textarea
                  name="message"
                  placeholder="Mensaje*"
                  className={`footer__textarea ${errors.message ? 'footer__input--error' : ''}`}
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && <span className="footer__error">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="footer__submit"
              >
                <span>ENVIAR POR WHATSAPP</span>
                <svg className="footer__submit-icon" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
            </form>
          </div>

       <div className="footer__right">
            <div 
              className="footer__map-container"
              onClick={handleAddressClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAddressClick();
                }
              }}
              aria-label="Ver ubicación en Google Maps"
            >
              <div className="footer__map" ref={mapRef}>
                <div className="footer__map-inner">
                  <iframe
                    src="https://maps.google.com/maps?q=Blvd.+Palmas+Hills+1,+Valle+de+las+Palmas,+52787+Naucalpan+de+Juarez&t=&z=16&ie=UTF8&iwloc=B&output=embed&disableDefaultUI=true"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="H Group Location"
                    frameBorder="0"
                    tabIndex={-1}
                  ></iframe>
                </div>
                <div className="footer__map-click-overlay"></div>
              </div>
            </div>

            <div className="footer__info">
              <div className="footer__logo">
                <img src={hgroupNegro} alt="H Group" />
              </div>
              <button 
                className="footer__address"
                onClick={handleAddressClick}
                aria-label="Ver dirección en Google Maps"
              >
                Blvd. Palmas Hills 1, Piso 21<br />
                Villa de las Palmas, 52787 Naucalpan<br />
                de Juárez, Méx.
              </button>
              <div className="footer__social">
            
                <a 
                  href="https://www.instagram.com/hgroupp_/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/herohgroup/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;