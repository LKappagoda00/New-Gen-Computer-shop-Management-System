import React from "react";
import "./Home.css";
import home from "../../assets/home.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="container hero">
        <div className="hero-text">
          <h1>Welcome to NGC</h1>
          <p>Login or register now to get started!</p>
          
          <div className="btn-log-reg">
      <button className="btn btn-log">
        <NavLink to="/feedback">Login</NavLink>
      </button>
      
      <button className="btn btn-log">
        <NavLink to="/feedbackList">Register</NavLink>
      </button>
      
      </div>
          
        </div>

        <div className="hero-image">
          <img src={home} alt="Home" />
        </div>
      </section>

      {/* You can include Footer and Header here if needed */}
      {/* <Footer /> */}
      {/* <Header /> */}
    </div>
  );
};

export default Home;
