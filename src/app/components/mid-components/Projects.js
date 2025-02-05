"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "APPRAISED",
      role: "Team Lead/ Full Stack Developer",
      summary: `As the Team Lead for a real-estate intelligence platform, I guided four developers in creating a robust system that makes property data accessible to everyday users. By implementing advanced algorithms and analyzing performance metrics, we delivered accurate and timely appraisals for improved decision-making. Leveraging object-oriented programming principles ensured our code remained maintainable and scalable as the project expanded. This end-to-end approach significantly streamlined appraisal processes and helped users gain valuable real-estate insights.`,
      date: "Sep/2022",
      links: {
        demo: "https://youtu.be/FKAb1YgcVsw",
        github: "https://github.com/2206-capstone-wbny/2206-Capstone-Appraised"
      },
      description: [
        "Led a team of four developers to create a real-estate intelligence platform, making property data easily accessible to everyday users.",
        "Implemented custom algorithms for property valuation, analyzing performance metrics to provide accurate appraisals.",
        "Utilized object-oriented programming to ensure maintainable, scalable code and improve overall system performance."
      ],
      images: [
        "/filler.png",
        "/filler2.png",
        "/filler.png"
      ]
    },
    {
      title: "No Bare Feet",
      role: "Full Stack Developer",
      summary: `I contributed to an e-commerce platform dedicated to collectible sneakers, combining PostgreSQL, Express.js, RESTful APIs, and React/Redux to build a robust solution. Collaborating closely with four fellow developers, we integrated advanced features such as secure authentication and intuitive shopping cart functionality. I led the design of crucial UI components and backend systems, ensuring seamless performance across diverse devices. Our team’s agile approach and coordinated efforts resulted in a user-centric platform that catered to sneaker enthusiasts looking for a smooth and responsive shopping experience.`,
      date: "Aug/2022",
      links: {
        github: "https://github.com/2206-fsa-gs-team-shoe-shop/shoe-shop"
      },
      description: [
        "Developed a collectible sneaker e-commerce platform using PostgreSQL, Express.js, RESTful APIs, and React/Redux.",
        "Collaborated with a team of four developers to design and implement key features.",
        "Led design of UI components and backend functions, ensuring a seamless and responsive user experience."
      ],
      images: [
        "/placeholder1.jpg",
        "/placeholder2.jpg",
        "/placeholder3.jpg"
      ]
    },
    {
      title: "Dungeon Attack",
      role: "Full Stack Developer",
      summary: `Dungeon Attack is a dynamic HTML canvas-based game that I built from the ground up with JavaScript. I integrated multiple enemy AI routines and animation systems, enhancing realism in how enemies respond to player movement. By implementing gravity, movement, actions, and particle effects, the game delivers a fast-paced and visually engaging experience. This project honed my understanding of real-time rendering and responsive controls, culminating in an immersive environment that keeps players entertained.`,
      date: "Jun/2022",
      links: {
        demo: "https://www.youtube.com/watch?v=-w38spqeeMk"
      },
      description: [
        "Integrated multiple enemy intelligence and animation in regards of player movement.",
        "Created solely with HTML canvas and JavaScript.",
        "Implemented gravity, movement, actions, and animation to improve player enjoyment."
      ],
      images: [
        "/placeholder1.jpg",
        "/placeholder2.jpg",
        "/placeholder3.jpg"
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  

  const nextProject = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setImageIndex(0);
    }
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setImageIndex(0);
    }
  };
  
  const nextImage = () => {
    const imagesArray = projects[currentIndex].images;
    // Move to the next image, wrap to 0 if at the end
    setImageIndex((prev) => (prev + 1) % imagesArray.length);
  };

  const prevImage = () => {
    const imagesArray = projects[currentIndex].images;
    // Move to the previous image, wrap to last if at the start
    setImageIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);
  };

  return (
    <div className="projects-container">
      <div className="proj-line">
      <h1 className="title-proj">PROJECTS</h1>
      </ div>
      <div className="project-slide">
        <h2 className="project-name">
          <strong>{projects[currentIndex].title}</strong>
        </h2>
        <p className="proj-disc">
          <strong>{projects[currentIndex].role}</strong> | {projects[currentIndex].date}
        </p>
        <p className="proj-summary">{projects[currentIndex].summary}</p>

        {/* Links */}
        <div className="icon-container">
          {projects[currentIndex].links.demo && (
            <a
              href={projects[currentIndex].links.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/yt-logo.jpg"
                className="icon-img"
                alt="yt"
                width={300}
                height={300}
              />
            </a>
          )}
          {projects[currentIndex].links.github && (
            <a
              href={projects[currentIndex].links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/git-logo.png"
                className="icon-img"
                alt="github"
                width={300}
                height={300}
              />
            </a>
          )}
        </div>

        {/* Description */}
        <ul className="proj-bullet">
          {projects[currentIndex].description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <a onClick={prevProject} disabled={currentIndex === 0} className={`next ${currentIndex === 0 ? "disabled" : ""}`}>
          &#8249;
        </a>
        <a
          onClick={nextProject}
          disabled={currentIndex === projects.length - 1}
          className={`next ${currentIndex === projects.length - 1 ? "disabled" : ""}`}
        >
          &#8250;
        </a>

                  {/* Right side: Image Slider */}
        <div className="image-slider">
          {/* Display current project image based on imageIndex */}
          <div className="image-display">
            <Image
              src={projects[currentIndex].images[imageIndex]}
              alt="Project Screenshot"
              width={800}  // Adjust as needed
              height={450} // Adjust as needed
            />
          </div>
          {/* Image Slider Arrows */}
          <div className="image-buttons">
            <button onClick={prevImage}>&larr;</button>
            <button onClick={nextImage}>&rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}