export default function Bot() {
    return (
      <footer className="footer">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h2>Bert's Website</h2>
            <p>
              Not too sure what to write here but it sure does make my website look professional!
            </p>
          </div>
          {/* Quick Links Section */}
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          {/* Contact Section */}
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>123 Main Street</p>
            <p>City, State, 12345</p>
            <p>Email: info@company.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Company Name. All Rights Reserved.
        </div>
      </footer>
    );
  }
  