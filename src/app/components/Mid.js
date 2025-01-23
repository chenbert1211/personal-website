import Projects from "./mid-components/Projects";
import Experience from "./mid-components/Experience";

export default function Mid() {
    return (
      <div className="mid-section">
        <div className="mid-text">
        <Projects />
        <Experience />
        
  
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
  