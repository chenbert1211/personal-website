'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Experience() {
  const experiences = [
    {
      title: "FERBESSEN",
      imgTitle: "/title-image/Ferbessen.png",
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
      imgTitle: "/title-image/USMC.png",
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
      imgTitle: "",
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

  // When no experience is selected, selectedIndex is null.
  const [selectedIndex, setSelectedIndex] = useState(null);

  // useEffect to reset back to the center after 30 seconds of selection.
  useEffect(() => {
    if (selectedIndex !== null) {
      const timer = setTimeout(() => {
        setSelectedIndex(null);
      }, 300000); // 30000 ms = 30 seconds

      // Clear the timer if the component unmounts or if selectedIndex changes.
      return () => clearTimeout(timer);
    }
  }, [selectedIndex]);

  return (
    <div className={`experience-container ${selectedIndex !== null ? 'active' : ''}`}>
      {/* Keep your exp-line and title-exp */}
      <div className="exp-line">
        <h1 className="title-exp">EXPERIENCE</h1>
      </div>

      {/* Experience Options (clickable buttons) */}
      <div className="exp-options">
      {experiences.map((exp, idx) => {
  // Extract the years using a regex that matches four digits
  const years = exp.date.match(/\d{4}/g);
  const dateRange = years ? years.join('-') : exp.date;

  // Determine the button text based on the role.
  const optionText =
    exp.role === "Supply Chain Manager"
      ? "SCM | USMC"
      : exp.role === "Supply Chain Specialist"
      ? "SCS | USMC"
      : exp.title.toUpperCase();

  return (
    <button
      key={idx}
      onClick={() => setSelectedIndex(idx)}
      className={`exp-option ${selectedIndex === idx ? 'selected' : ''}`}
    >
      <div className="option-text">{optionText}</div>
      <div className="option-date">{dateRange}</div>
    </button>
  );
})}
      </div>

      {/* Experience Details */}
      <div className="experience-slide">
        {selectedIndex !== null && (
          <>
            <h2 className="name-forExp">
  <strong>
    {experiences[selectedIndex].imgTitle ? (
      <Image className='imgTitle'
      src={experiences[selectedIndex].imgTitle}
      alt={experiences[selectedIndex].title}
      width={300}   // adjust width as needed
      height={100}  // adjust height as needed
    />
    ) : (
      experiences[selectedIndex].title
    )}
  </strong>
</h2>
            <p className="exp-disc">
              <strong>{experiences[selectedIndex].role}</strong> | {experiences[selectedIndex].date}
            </p>
            <p className="exp-summary">{experiences[selectedIndex].summary}</p>
            <ul className="exp-bullet">
              {experiences[selectedIndex].description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

