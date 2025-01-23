import Projects from "./mid-components/Projects";

export default function Mid() {
    return (
      <div className="mid-section">
        <div className="mid-text">
        <Projects />
        
          {/* Professional Experience */}
          <h1 className="title">PROFESSIONAL EXPERIENCE</h1>
  
          <div className="prof-exp">
            <p>
              <strong>Ferbessen - Remote</strong> | February 2022 - December 2023
              <br />
              <em>Software Engineer</em> – Design and develop a mobile application, focusing on user-friendly interfaces, seamless user experiences, and timely project delivery, while staying updated on industry trends and technologies.
            </p>
            <ul>
              <li>Design and develop mobile apps for iOS/Android platforms, ensuring optimal performance and responsiveness.</li>
              <li>Collaborated with cross-functional teams to deliver high-quality mobile apps within tight deadlines.</li>
              <li>Implemented user-friendly interfaces using modern design principles, enhancing user engagement and satisfaction.</li>
            </ul>
  
            <p>
              <strong>United States Marine Corps – Various Locations</strong> | September 2018 – August 2022
            </p>
  
            <p>
              <em>Logistics Manager (September 2020 – August 2022)</em>
            </p>
            <ul>
              <li>Oversaw personnel and equipment requests, thoroughly analyzing and recording shipment transactions. Provided weekly readiness updates to the CEO, ensuring data-driven decision-making and operational efficiency.</li>
              <li>Led a team of 15 personnel overseeing logistics operations for a department of 900 Marines, ensuring timely delivery of equipment and supplies.</li>
              <li>Provided weekly readiness briefings to executive leadership, delivering data-driven insights for strategic decisions.</li>
              <li>Maintained 100% property accountability, streamlining turn-in processes and reducing excess inventory.</li>
            </ul>
  
            <p>
              <em>Logistics Specialist (September 2019 — August 2020)</em>
            </p>
            <ul>
              <li>Analyzed comprehensive logistics data—including availability, maintainability, reliability, and supply chain metrics—to streamline operations and optimize resource allocation.</li>
              <li>Analyzed and interpreted logistics data (availability, reliability, supply chain metrics) to enhance operational efficiency.</li>
              <li>Coordinated domestic and international relocations, ensuring on-time deliveries with zero delays.</li>
              <li>Reconciled 20+ accounts quarterly, accurately managing over $5M in gear and supplies.</li>
            </ul>
          </div>
  
          {/* Education */}
          <h1 className="title">EDUCATION</h1>
          <div className="edu">
            <ul>
              <p><strong>University Of Houston</strong> (Sep/2022 - May/2026) | Bachelor’s in Computer Science (in pursuit)</p>
              <p><strong>Fullstack Academy Web Development Bootcamp</strong> (May/2022 - Sep/2022) | Software Engineering Certificate</p>
              <p><strong>SalesForce</strong> (Nov/2021 - Feb/2022) | Salesforce Certified Administrator (SCA)</p>
              <p><strong>Brooklyn Technical High School</strong> (Sep/2015 - Jun/2018) | High School Diploma</p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  