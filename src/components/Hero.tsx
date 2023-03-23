import React from "react";
import illust from "../images/illustration-working.svg";

export default function Hero() {
  function handleClick() {
    window.scrollTo({ top: 250, behavior: "smooth" });
  }
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>More than just shorter links</h1>
        <p>
          Build your brand's recognition and get the shortest Short-Links there
          are in the Short-Wide-Web!
        </p>
        <button className="color-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
      <div className="hero-img">
        <img src={illust} alt="Illustration Working" />
      </div>
    </section>
  );
}
