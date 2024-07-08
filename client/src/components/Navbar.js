import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling (create this file)

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          R2R
        </Link>
        <div className="menu-icon">
          {"<=======>"}
        </div>
        <div className="navbar-menu">
          <ul className="navbar-items">
          <li className="navbar-item">
              <Link to="/dashboard" className="navbar-link">   Dashboard   </Link>
            </li>
          <li className="navbar-item">
              <Link to="/students" className="navbar-link">   Students   </Link>
            </li>
          <li className="navbar-item">
              <Link to="/books" className="navbar-link">   Book List   </Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">   Contact Us   </Link>
            </li>
            <li className="navbar-item">
              <Link to="/logout" className="navbar-link"> Logout  </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
