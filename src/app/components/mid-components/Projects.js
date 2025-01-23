
"use client"
import React, { useState } from "react";
export default function Projects() {
    const projects = [
        {
          title: "APPRAISED",
          role: "Team Lead/ Full Stack Developer",
          date: "Sep/2022",
          links: {
            demo: "https://youtu.be/FKAb1YgcVsw",
            github: "https://github.com/2206-capstone-wbny/2206-Capstone-Appraised"
          },
          description: [
            "Led a team of four developers to create a real-estate intelligence platform, making property data easily accessible to everyday users.",
            "Implemented custom algorithms for property valuation, analyzing performance metrics to provide accurate appraisals.",
            "Utilized object-oriented programming to ensure maintainable, scalable code and improve overall system performance."
          ]
        },
        {
          title: "No Bare Feet",
          role: "Full Stack Developer",
          date: "Aug/2022",
          links: {
            github: "https://github.com/2206-fsa-gs-team-shoe-shop/shoe-shop"
          },
          description: [
            "Developed a collectible sneaker e-commerce platform using PostgreSQL, Express.js, RESTful APIs, and React/Redux.",
            "Collaborated with a team of four developers to design and implement key features.",
            "Led design of UI components and backend functions, ensuring a seamless and responsive user experience."
          ]
        },
        {
          title: "Dungeon Attack",
          role: "Full Stack Developer",
          date: "Jun/2022",
          links: {
            demo: "https://www.youtube.com/watch?v=-w38spqeeMk"
          },
          description: [
            "Integrated multiple enemy intelligence and animation in regards of player movement.",
            "Created solely with HTML canvas and JavaScript.",
            "Implemented gravity, movement, actions, and animation to improve player enjoyment."
          ]
        }
      ];

      const [currentIndex, setCurrentIndex] = useState(0);

      const nextProject = () => {
        if (currentIndex < projects.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      // Previous project
      const prevProject = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };


    return (
        <div className="projects-container">
      <h1 className="title">PROJECTS</h1>

      <div className="project-slide">
        <h2>{projects[currentIndex].title}</h2>
        <p><strong>{projects[currentIndex].role}</strong> | {projects[currentIndex].date}</p>
        
        {/* Links */}
        <div className="project-links">
          {projects[currentIndex].links.demo && (
            <a href={projects[currentIndex].links.demo} target="_blank" rel="noopener noreferrer">
              Demo
            </a>
          )}
          {projects[currentIndex].links.github && (
            <a href={projects[currentIndex].links.github} target="_blank" rel="noopener noreferrer">
              GitHub
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
        <a onClick={prevProject} disabled={currentIndex === 0} className="next">&#8249;</a>
        <a onClick={nextProject} disabled={currentIndex === projects.length - 1} className="next">&#8250;</a>
      </div>
    </div>
    );
  }