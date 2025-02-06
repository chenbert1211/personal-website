'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Experience() {
  const experiences = [
    {
      title: "Ferbessen",
      role: "Software Engineer | Volunteer",
      date: "February 2023 - January 2025",
      summary: `Ferbessen is about growth, connection, and mastery. It’s the pursuit of finding someone who is a master of their craft, connecting with them, and learning from them as often as needed for as long as it takes. It’s about acquiring new skills, sharing your progress, and turning your dreams into reality by starting that side hustle you’ve always envisioned. Ferbessen embodies the journey of continuous improvement, collaboration, and the courage to take action toward your goals.`,
      description: [
        "Design and develop mobile apps for iOS/Android platforms, ensuring optimal performance and responsiveness.",
        "Collaborated with cross-functional teams to deliver high-quality mobile apps within tight deadlines.",
        "Implemented user-friendly interfaces using modern design principles, enhancing user engagement and satisfaction.",
        "Leveraged modern technologies and frameworks to optimize app performance and deliver seamless user experiences."
      ]
    },
    {
      title: "United States Marine Corps",
      role: "Supply Chain Manager",
      date: "September 2020 – August 2022",
      summary: `As a Supply Chain Manager, I oversaw inventory control, supply chain operations, and lifecycle documentation while leading and mentoring my team. I ensured the supply chain operated efficiently, maintained accountability, and kept operations mission-ready. I provided expert recommendations to the Supply Officer and command leadership, leveraging my experience to optimize logistics and supply processes.`,
      description: [
        "Oversaw personnel and equipment requests, thoroughly analyzing and recording shipment transactions. Provided weekly readiness updates to the CEO, ensuring data-driven decision-making and operational efficiency.",
        "Led a team of 50 personnel overseeing logistics operations for a department of 900 Marines, ensuring timely delivery of equipment and supplies.",
        "Provided weekly readiness briefings to executive leadership, delivering data-driven insights for strategic decisions.",
        "Maintained 100% property accountability, streamlining turn-in processes and reducing excess inventory."
      ]
    },
    {
      title: "United States Marine Corps",
      role: "Supply Chain Specialist",
      date: "September 2019 – August 2020",
      summary: `As a Supply Chain Specialist, I managed and oversaw inventory control, whether manual or automated. I designed, planned, executed, and monitored supply chain activities to ensure supply aligned with demand, measured performance, and maintained accountability across inventory operations. I also handled critical documentation to track the lifecycle of capital assets—from acquisition to disposal—ensuring accuracy and completeness. Additionally, I advised the Supply Officer on all supply-related matters.`,
      description: [
        "Analyzed comprehensive logistics data—including availability, maintainability, reliability, and supply chain metrics—to streamline operations and optimize resource allocation.",
        "Analyzed and interpreted logistics data (availability, reliability, supply chain metrics) to enhance operational efficiency.",
        "Coordinated domestic and international relocations, ensuring on-time deliveries with zero delays.",
        "Reconciled 20+ accounts quarterly, accurately managing over $5M in gear and supplies."
      ]
    }
  ];

  const [selectedExperience, setSelectedExperience] = useState(null);

  // Handle experience selection
  const handleExperienceClick = (exp) => {
    setSelectedExperience(exp);
  };

  // Reset to center after 30 seconds
  useEffect(() => {
    if (selectedExperience) {
      const timeout = setTimeout(() => {
        setSelectedExperience(null);
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [selectedExperience]);

  return (
    <div className="experience-container">
      <div className='exp-line'>
        <h1 className="title-exp">EXPERIENCE</h1>
      </div>

      <div className="flex h-full">
        {/* Experiences List */}
        <div className={`options ${selectedExperience ? 'moveLeft' : ''}`}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="option cursor-pointer"
              onClick={() => handleExperienceClick(exp)}
            >
              <h2 className="text-xl font-bold">{exp.title}</h2>
              <p className="text-sm">{exp.role}</p>
              <p className="text-xs">{exp.date}</p>
            </div>
          ))}
        </div>

        {/* Experience Details */}
        <div className={`content ${selectedExperience ? 'show' : ''}`}>
          {selectedExperience && (
            <div className="p-8">
              <h2 className="name-forExp"><strong>{selectedExperience.title}</strong></h2>
              <p className="exp-disc">
                <strong>{selectedExperience.role}</strong> | {selectedExperience.date}
              </p>
              
              <p className="exp-summary">{selectedExperience.summary}</p>
              
              <ul className="exp-bullet">
                {selectedExperience.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}