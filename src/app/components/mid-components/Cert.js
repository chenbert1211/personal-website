"use client";
import React, { useState, useEffect } from "react";

// Your certifications array (update image paths and details as needed)
const certSlides = [
  {
    id: 1,
    title: "Combat Training Certification",
    details: "Details for Certification One",
    image: ["/certificate/combat/combat.jpg"]
  },
  {
    id: 2,
    title: "Letter Of Reccomendation",
    details: "Details for Certification Two",
    image: ["/certificate/lor/lor1.jpg", "/certificate/lor/lor2.jpg"],
  },
  {
    id: 3,
    title: "Marksmanship Coach Certification",
    details: "Details for Certification Three",
    image: ["/certificate/marksman/marksman.jpg"],
  },
  {
    id: 4,
    title: "Promotions",
    details: "Details for Certification Four",
    image: ["/certificate/promotion/cover.jpg", "/certificate/promotion/promo1.jpg", "/certificate/promotion/promo2.jpg", "/certificate/promotion/promo3.jpg"],
  },
  {
    id: 5,
    title: "Community Service",
    details: "Details for Certification Four",
    image: ["/certificate/service/service1.jpg", "/certificate/service/service2.jpg", "/certificate/service/service3.jpg", "/certificate/service/service4.jpg", "/certificate/service/service5.jpg", "/certificate/service/service6.jpg", "/certificate/service/service7.jpg", "/certificate/service/service8.jpg", "/certificate/service/service9.jpg", "/certificate/service/service10.jpg", "/certificate/service/service11.jpg", "/certificate/service/service12.jpg", "/certificate/service/service13.jpg", "/certificate/service/service14.jpg", "/certificate/service/service15.jpg", "/certificate/service/service16.jpg", "/certificate/service/service17.jpg", "/certificate/service/service18.jpg", "/certificate/service/service19.jpg", "/certificate/service/service20.jpg", "/certificate/service/service21.jpg", "/certificate/service/service22.jpg", ],
  },
  {
    id: 6,
    title: "Supply Chain Certification",
    details: "Details for Certification Four",
    image: ["/certificate/supply/sup1.jpg", "/certificate/supply/sup2.jpg", "/certificate/supply/sup3.jpg", "/certificate/supply/sup4.jpg", "/certificate/supply/sup5.jpg", ],
  },
  {
    id: 7,
    title: "USMC Certification",
    details: "Details for Certification Four",
    image: ["/certificate/usmc-cert/cover.jpg", "/certificate/usmc-cert/cert1.jpg", "/certificate/usmc-cert/cert2.jpg", "/certificate/usmc-cert/cert3.jpg", "/certificate/usmc-cert/cert4.jpg", "/certificate/usmc-cert/cert5.jpg", "/certificate/usmc-cert/cert6.jpg", "/certificate/usmc-cert/cert7.jpg", "/certificate/usmc-cert/cert8.jpg", "/certificate/usmc-cert/cert9.jpg", "/certificate/usmc-cert/cert10.jpg", "/certificate/usmc-cert/cert11.jpg", "/certificate/usmc-cert/cert12.jpg", "/certificate/usmc-cert/cert13.jpg", "/certificate/usmc-cert/cert14.jpg", "/certificate/usmc-cert/cert15.jpg", "/certificate/usmc-cert/cert16.jpg", "/certificate/usmc-cert/cert17.jpg", "/certificate/usmc-cert/cert18.jpg", "/certificate/usmc-cert/cert19.jpg", "/certificate/usmc-cert/cert20.jpg", "/certificate/usmc-cert/cert21.jpg", "/certificate/usmc-cert/cert22.jpg", ],
  }
];

export default function Cert() {
  // Quadruple the slides for calc(-100% / 4)
  const repeatedSlides = [...certSlides, ...certSlides, ...certSlides, ...certSlides];

  const certSlideWidth = 417;
  const certSlideHeight = 236;
  const certSlideMargin = 6;
  const totalCertSlideWidth = certSlideWidth + certSlideMargin * 2;

  const [isFocused, setIsFocused] = useState(false);
  const [focusedSlideIndex, setFocusedSlideIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isFocused ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFocused]);

  const getDisplayImage = (images) => {
    const coverImage = images.find(img => img.toLowerCase().includes("cover"));
    return coverImage || images[0];
  };

  const handleSlideClick = (index) => {
    const realIndex = index % certSlides.length;
    setFocusedSlideIndex(realIndex);
    setIsFocused(true);
  };

  const handleOverlayClick = () => {
    setIsFocused(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="cert-section">
      <div className="cert-carousel-container">
        <div 
          className="cert-carousel-track"
          style={{
            width: `${repeatedSlides.length * totalCertSlideWidth}px`,
            animationDuration: `${certSlides.length * 10}s` // Adjusted speed: 10s per slide
          }}
        >
          {repeatedSlides.map((slide, index) => (
            <div
              key={index}
              className="cert-slide"
              style={{
                minWidth: `${certSlideWidth}px`,
                height: `${certSlideHeight}px`,
                margin: `0 ${certSlideMargin}px`,
              }}
              onClick={() => handleSlideClick(index)}
            >
              <img 
                src={getDisplayImage(slide.image)} 
                alt={slide.title} 
              />
              <div className="cert-slide-info">
                <h2>{slide.title}</h2>
                <p>{slide.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isFocused && (
        <div className="cert-focused-overlay" onClick={handleOverlayClick}>
          <div className="cert-focused-slide" onClick={handleModalClick}>
            <div className="cert-focused-text">
              <h2>{certSlides[focusedSlideIndex].title}</h2>
              <p>{certSlides[focusedSlideIndex].details}</p>
            </div>
            <div className="cert-focused-image">
              <img
                src={getDisplayImage(certSlides[focusedSlideIndex].image)}
                alt={certSlides[focusedSlideIndex].title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}