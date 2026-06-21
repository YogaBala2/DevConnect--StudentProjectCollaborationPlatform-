import "./../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}
        <div className="footer-brand">

          <div className="footer-logo">
            <span>{"</>"}</span>
            <h3>DevConnect</h3>
          </div>

          <p>
            Where student developers meet,
            team up, and build the future.
          </p>

          <div className="social-links">
            <a href="/">
              <i className="fab fa-github"></i>
            </a>

            <a href="/">
              <i className="fab fa-linkedin"></i>
            </a>

            <a href="/">
              <i className="fas fa-globe"></i>
            </a>
          </div>

        </div>

        {/* Platform */}
        <div>
          <h4>Platform</h4>

          <ul>
            <li>Browse Projects</li>
            <li>Create Project</li>
            <li>Find Teammates</li>
            <li>Portfolio</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4>Resources</h4>

          <ul>
            <li>Documentation</li>
            <li>Blog</li>
            <li>Changelog</li>
            <li>Status</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4>Company</h4>

          <ul>
            <li>About</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 DevConnect.
          All rights reserved.
        </p>

        <p>
          Made with ❤️ for student
          developers everywhere
        </p>
      </div>

    </footer>
  );
};

export default Footer;