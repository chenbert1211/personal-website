import Projects from "./mid-components/Projects";
import Experience from "./mid-components/Experience";
import Education from "./mid-components/Education";

export default function Mid() {
    return (
      <div className="mid-section">
        <div className="mid-text">
        <Projects />
        <Experience />
        <Education />
        </div>
      </div>
    );
  }
  