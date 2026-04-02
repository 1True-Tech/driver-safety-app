import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Navbar.css";

function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SafeRide
      </Link>

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

      <div className={`navbar-menu ${showMenuMobile ? "show" : ""}`}>
        <Link
          to="/drivers"
          className={`navbar-link ${isActive('/drivers')}`}
          onClick={() => setShowMenuMobile(false)}
        >
          Drivers
        </Link>
        <Link
          to="/riders"
          className={`navbar-link ${isActive('/riders')}`}
          onClick={() => setShowMenuMobile(false)}
        >
          Riders
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
