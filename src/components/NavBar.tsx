import React from "react";
import logo from "../images/logo.svg";

export default function NavBar() {
  return (
    <nav>
      <img src={logo} className="shortly-logo" alt="shortly-logo" />
      <div className="feature-buttons">
        <button className="navbar-extra-buttons">Features</button>
        <button className="navbar-extra-buttons">Pricing</button>
        <button className="navbar-extra-buttons">Ressources</button>
      </div>

      <div className="login-sign-up">
        <button className="navbar-extra-buttons">Login</button>
        <button className="color-button">Sign Up</button>
      </div>
    </nav>
  );
}
