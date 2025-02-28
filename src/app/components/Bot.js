export default function Bot() {
    return (
      <footer className="footer">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <p>
              Not too sure what to write here but it sure does make my website look professional!
            </p>
            <p>
              I really enjoy working on cool things and hopefully I can work for Elon one day!
            </p>
          </div>
          {/* Quick Links Section */}
          <div className="footer-bundle">
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
        </div>
        <div className="footer-bottom">
          ~Psalms 136:1 Give thanks to the Lord, for he is good. His love endures forever.
        </div>
      </footer>
    );
  }
  