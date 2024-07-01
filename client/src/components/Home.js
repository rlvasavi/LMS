import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css'; // Import custom styles

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="container" >
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Discover the World of Technology</h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et erat pharetra,
              eget tincidunt nisl interdum.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </section>
        <section className="social-icons">
          <a href="https://www.facebook.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://twitter.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;
