"use client";
import React, { useState, useRef, useEffect } from "react";

// Your real slides array (using local images)
const slides = [
  {
    id: 1,
    title: "University Of Houston",
    details:
      "Sep/2022 - May/2026 | Bachelor’s in Computer Science (in pursuit)",
    image: "/edu-image/uh.jpg",
  },
  {
    id: 2,
    title: "Fullstack Academy Web Development Bootcamp",
    details:
      "May/2022 - Sep/2022 | Software Engineering Certificate",
    image: "/edu-image/FSA Cert.jpg",
  },
  {
    id: 3,
    title: "SalesForce",
    details:
      "Nov/2021 - Feb/2022 | Salesforce Certified Administrator (SCA)",
    image: "/edu-image/sf.jpg",
  },
  {
    id: 4,
    title: "Brooklyn Technical High School",
    details:
      "Sep/2015 - Jun/2018 | High School Diploma",
    image: "/edu-image/bt.jpg",
  },
];

export default function Education() {
  // Number of real slides.
  const n = slides.length;
  // We add two clones at the beginning and two at the end.
  // Real slides are at indices 2 through n+1.
  const realStartIndex = 2;
  const realEndIndex = n + 1;
  const [currentIndex, setCurrentIndex] = useState(realStartIndex);
  // This flag lets us disable CSS transition when “jumping.”
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // References for the track and container.
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide dimensions
  const slideWidth = 1300;      // your slide width in pixels
  const slideMargin = 20;       // total horizontal margin (left+right)
  const totalSlideWidth = 1320; // should roughly equal slideWidth + slideMargin
  // Calculate an offset so that the active slide is centered.
  const centerOffset = containerWidth ? containerWidth / 2 - slideWidth / 2 : 0;
  // The track's transform value moves the slides so that the active slide is centered.
  const trackTransform = `translateX(${centerOffset - currentIndex * totalSlideWidth}px)`;

  // Build the extended slides array:
  // [ clone of second-to-last, clone of last, ...real slides..., clone of first, clone of second ]
  const extendedSlides = [
    slides[n - 2],
    slides[n - 1],
    ...slides,
    slides[0],
    slides[1],
  ];

  // Auto-slide functionality:
  // We'll use a ref to hold the auto-slide interval so that we can clear and reset it.
  const autoSlideInterval = useRef(null);

  const resetAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    autoSlideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 10000); // 10 seconds
  };

  // On mount, start the auto-slide timer.
  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, []);

  // When the transition ends, check if we're on a clone.
  // If so, force a jump to the corresponding real slide without any visible flicker.
  const onTransitionEnd = () => {
    if (currentIndex < realStartIndex) {
      // For example, if currentIndex becomes 1 (a clone), jump to currentIndex = 1 + n.
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + n);
      if (trackRef.current) {
        void trackRef.current.offsetWidth; // Force reflow.
      }
      setTransitionEnabled(true);
    } else if (currentIndex > realEndIndex) {
      // For example, if currentIndex becomes n+2 (a clone), jump to currentIndex = n+2 - n.
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - n);
      if (trackRef.current) {
        void trackRef.current.offsetWidth;
      }
      setTransitionEnabled(true);
    }
  };

  // When clicking a slide, if it is not already active, move to that slide.
  // Also reset the auto-slide timer.
  const handleSlideClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    resetAutoSlide();
  };

  // Clicking a navigation dot should move to the corresponding real slide.
  // Real slide i is located at extended index (i + 2).
  const goToSlide = (dotIndex) => {
    setCurrentIndex(dotIndex + 2);
    resetAutoSlide();
  };

  // Determine which dot is active.
  // The active dot corresponds to the real slide index:
  // real slide index = (currentIndex - 2), adjusted modulo n.
  let activeDotIndex = (currentIndex - 2 + n) % n;

  return (
    <div className="education-section">
      <h1 className="title">EDUCATION</h1>
      <div className="carousel-container" ref={containerRef}>
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            transform: trackTransform,
            transition: transitionEnabled ? "transform 1.5s ease" : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleSlideClick(index)}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="slide-info">
                <h2>{slide.title}</h2>
                <p>{slide.details}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="dots">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`dot ${index === activeDotIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
