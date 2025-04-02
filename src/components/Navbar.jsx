import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="brand">
            PYRA
          </Link>
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/atlas" className={location.pathname.includes("/atlas") ? "active" : ""}>Atlas</Link>
          <Link to="/pyra-ai" className={location.pathname === "/pyra-ai" ? "active" : ""}>Pyra AI</Link>
          <Link to="/watchlist" className={location.pathname === "/watchlist" ? "active" : ""}>Watchlist</Link>
        </div>
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
