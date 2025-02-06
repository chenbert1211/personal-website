'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function Experience() {
  const experiences = [
    {
      title: "Ferbessen - Remote",
      role: "Software Engineer",
      date: "February 2022 - December 2023",
      description: [
        "Design and develop mobile apps for iOS/Android platforms, ensuring optimal performance and responsiveness.",
        "Collaborated with cross-functional teams to deliver high-quality mobile apps within tight deadlines.",
        "Implemented user-friendly interfaces using modern design principles, enhancing user engagement and satisfaction."
      ]
    },
    {
      title: "United States Marine Corps – Various Locations",
      role: "Logistics Manager",
      date: "September 2020 – August 2022",
      description: [
        "Oversaw personnel and equipment requests, thoroughly analyzing and recording shipment transactions. Provided weekly readiness updates to the CEO, ensuring data-driven decision-making and operational efficiency.",
        "Led a team of 15 personnel overseeing logistics operations for a department of 900 Marines, ensuring timely delivery of equipment and supplies.",
        "Provided weekly readiness briefings to executive leadership, delivering data-driven insights for strategic decisions.",
        "Maintained 100% property accountability, streamlining turn-in processes and reducing excess inventory."
      ]
    },
    {
      title: "United States Marine Corps – Various Locations",
      role: "Logistics Specialist",
      date: "September 2019 – August 2020",
      description: [
        "Analyzed comprehensive logistics data—including availability, maintainability, reliability, and supply chain metrics—to streamline operations and optimize resource allocation.",
        "Analyzed and interpreted logistics data (availability, reliability, supply chain metrics) to enhance operational efficiency.",
        "Coordinated domestic and international relocations, ensuring on-time deliveries with zero delays.",
        "Reconciled 20+ accounts quarterly, accurately managing over $5M in gear and supplies."
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextExperience = () => {
    if (currentIndex < experiences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevExperience = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="experience-container">
      <h1 className="title">EXPERIENCE</h1>

      <div className="experience-slide">
        <h2 className="experience-name"><strong>{experiences[currentIndex].title}</strong></h2>
        <p className="exp-disc"><strong>{experiences[currentIndex].role}</strong> | {experiences[currentIndex].date}</p>

        <ul className="exp-bullet">
          {experiences[currentIndex].description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="exp-buttons">
        <a onClick={prevExperience} disabled={currentIndex === 0} className="next">&#8249;</a>
        <a onClick={nextExperience} disabled={currentIndex === experiences.length - 1} className="next">&#8250;</a>
      </div>
    </div>
  );
}
