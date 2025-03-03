import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/header-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAboutUs = () => {
    navigate("/AboutUs");
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("message");
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <nav className="header-navbar">
          <div className="logo">
            <a href="/dashboard">
              <img src={Logo} alt="Logo" />
            </a>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </div>

          <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="nav navbar-right">
              <button
                type="button"
                className="about-us-btn"
                onClick={handleAboutUs}
              >
                About Us
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
