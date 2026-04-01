import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Navbar.css";

function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-brand">SafeRide</div>

      <div
        className={`hamburger ${showMenuMobile ? "active" : ""}`}
        onClick={() => setShowMenuMobile(!showMenuMobile)}
        aria-label="Toggle navigation"
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setShowMenuMobile(!showMenuMobile);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${showMenuMobile ? "show" : ""}`}>
        <Link to="/" onClick={() => setShowMenuMobile(false)}>
          Home
        </Link>
        <Link to="/safety" onClick={() => setShowMenuMobile(false)}>
          Safety
        </Link>
        <Link to="/contact" onClick={() => setShowMenuMobile(false)}>
          Contact
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
