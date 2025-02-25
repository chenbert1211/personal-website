"use client";
import React, { useState, useEffect } from "react";

// Your certifications array (update image paths and details as needed)
const certSlides = [
  {
    id: 1,
    title: "Combat Training Certificate",
    details: "Details for Certification One",
    image: ["/certificate/combat/combat.jpg"]
  },
  {
    id: 2,
    title: "Certification Two",
    details: "Details for Certification Two",
    image: "/cert-image/cert2.jpg",
  },
  {
    id: 3,
    title: "Certification Three",
    details: "Details for Certification Three",
    image: "/cert-image/cert3.jpg",
  },
  {
    id: 4,
    title: "Certification Four",
    details: "Details for Certification Four",
    image: "/cert-image/cert4.jpg",
  },
];

export default function Cert() {
  // For a seamless continuous loop, we duplicate the slides.
  // The track will contain two copies of the real slides.
  const duplicatedSlides = certSlides.concat(certSlides);

  // --- Dimensions for the carousel slides (1/4 the size) ---
  // (For Education the slides were ~1300×661. For Cert we use about 1/4 that size.)
  const certSlideWidth = 417; // 1300 / 4
  const certSlideHeight = 236; // roughly 661 / 4
  const certSlideMargin = 6; // margin on each side
  const totalCertSlideWidth = certSlideWidth + certSlideMargin * 2; // e.g. 325 + 10 = 335

  // Calculate the scroll distance of one full set (the width of the real slides)
  const scrollDistance = certSlides.length * totalCertSlideWidth; // e.g. 4 * 335 = 1340px

  // --- Focus Modal State ---
  // When any slide is clicked, we open a modal that focuses that slide in full size.
  const [isFocused, setIsFocused] = useState(false);
  // We'll store the index (in the real certSlides array) of the clicked slide.
  const [focusedSlideIndex, setFocusedSlideIndex] = useState(null);

  // Disable background scrolling when the modal is open.
  useEffect(() => {
    document.body.style.overflow = isFocused ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFocused]);

  // --- Handlers ---
  const handleSlideClick = (index) => {
    // Because the track is duplicated, get the real index modulo the number of slides.
    const realIndex = index % certSlides.length;
    setFocusedSlideIndex(realIndex);
    setIsFocused(true);
  };

  const handleOverlayClick = () => {
    setIsFocused(false);
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside the modal content from closing the modal.
    e.stopPropagation();
  };

  return (
    <div className="cert-section">
      <div className="cert-carousel-container">
        <div className="cert-carousel-track">
          {duplicatedSlides.map((slide, index) => (
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
              <img src={slide.image} alt={slide.title} />
              <div className="cert-slide-info">
                <h2>{slide.title}</h2>
                <p>{slide.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Modal Overlay */}
      {isFocused && (
        <div className="cert-focused-overlay" onClick={handleOverlayClick}>
          <div className="cert-focused-slide" onClick={handleModalClick}>
            <div className="cert-focused-text">
              <h2>{certSlides[focusedSlideIndex].title}</h2>
              <p>{certSlides[focusedSlideIndex].details}</p>
            </div>
            <div className="cert-focused-image">
              <img
                src={certSlides[focusedSlideIndex].image}
                alt={certSlides[focusedSlideIndex].title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
