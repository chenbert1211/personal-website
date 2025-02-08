"use client";
import React, { useState, useRef, useEffect } from "react";

// Your real slides array (using picsum.photos for demo images)
const slides = [
  {
    id: 1,
    title: "University Of Houston",
    details:
      "Sep/2022 - May/2026 | Bachelor’s in Computer Science (in pursuit)",
    image: "https://picsum.photos/800/400?random=1",
  },
  {
    id: 2,
    title: "Fullstack Academy Web Development Bootcamp",
    details:
      "May/2022 - Sep/2022 | Software Engineering Certificate",
    image: "https://picsum.photos/800/400?random=2",
  },
  {
    id: 3,
    title: "SalesForce",
    details:
      "Nov/2021 - Feb/2022 | Salesforce Certified Administrator (SCA)",
    image: "https://picsum.photos/800/400?random=3",
  },
  {
    id: 4,
    title: "Brooklyn Technical High School",
    details:
      "Sep/2015 - Jun/2018 | High School Diploma",
    image: "https://picsum.photos/800/400?random=4",
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

  // Reference to the carousel track element.
  const trackRef = useRef(null);

  // Get the container width so that we can center the active slide.
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

  // SCALE UP: Multiply the dimensions by 6.
  const slideWidth = 1300;       // now 1800px
  const slideMargin = 20;       // now 120px total horizontal margin (i.e. 60px per side)
  const totalSlideWidth = 1320;
  // Calculate an offset so that the active slide is centered.
  const centerOffset = containerWidth ? containerWidth / 2 - slideWidth / 2 : 0;
  // The track’s transform value moves the slides so that the active slide is centered.
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

  // When the transition ends, check if we're on a clone.
  // If so, force a jump to the corresponding real slide without any visible flicker.
  const onTransitionEnd = () => {
    if (currentIndex < realStartIndex) {
      // e.g. if currentIndex becomes 1 (a clone), jump to currentIndex = 1 + n.
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + n);
      if (trackRef.current) {
        void trackRef.current.offsetWidth; // Force reflow.
      }
      setTransitionEnabled(true);
    } else if (currentIndex > realEndIndex) {
      // e.g. if currentIndex becomes n+2 (a clone), jump to currentIndex = n+2 - n.
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - n);
      if (trackRef.current) {
        void trackRef.current.offsetWidth;
      }
      setTransitionEnabled(true);
    }
  };

  // When clicking a slide, if it is not already active, move to that slide.
  const handleSlideClick = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Clicking a navigation dot should move to the corresponding real slide.
  // Real slide i is located at extended index (i + 2).
  const goToSlide = (dotIndex) => {
    setCurrentIndex(dotIndex + 2);
  };

  // Determine which dot is active.
  // The active dot corresponds to the real slide index:
  // real slide index = (currentIndex - 2), adjusted modulo n.
  let activeDotIndex = (currentIndex - 2 + n) % n;

  return (
    <div className="education-section">
      <h1 className="title">EDUCATION</h1>
      {/* Adjust the container width if necessary. In this example, we set it to 1800px. */}
      <div className="carousel-container" ref={containerRef}>
        <div
          ref={trackRef}
          className="carousel-track"
          style={{
            transform: trackTransform,
            transition: transitionEnabled ? "transform 0.5s ease" : "none",
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
