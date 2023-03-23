import React from "react";
import boost from "../images/bg-shorten-desktop.svg";
import { useState } from "react";
import { ChangeEvent } from "react";

// Typescript -> Correct thing to do ? At least it fixed the error messages...
type AppProps = {
  value: string;
  error: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
  setOriginalLinks: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Shorter({
  value,
  setValue,
  setLinks,
  setOriginalLinks,
  error,
  setError,
}: AppProps) {
  function handleClick() {
    // Check if valid URL
    try {
      const newValue: URL = new URL(value);
      console.log(newValue);

      // Save the original Link for later
      setOriginalLinks((prevState) => {
        return [...prevState, newValue.toString()];
      });

      // Create Link with Query Params
      const link = `https://api.shrtco.de/v2/shorten?${new URLSearchParams({
        url: newValue.toString(),
      })}`;

      // Do Api Call
      fetch(link)
        .then((response) => response.json())
        .then((response) => {
          // set Links in State
          setLinks((prevLinks) => {
            return [...prevLinks, response.result.short_link];
          });
          // reset value
          setValue("");
          // in case there was an error, reset that as well
          if (error == true) {
            setError(false);
          }
        });
    } catch {
      setError(true);
      // Doesnt catch all invalid links though, having https://something without tld is still valid but will crash the site? Why's that?
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const style = {
    border: error ? "2px solid #d46e6f" : "none", // On Error -> button and input slightly shifts -> fixable?
  };

  return (
    <section className="url-shorter">
      <img src={boost} alt="background-img" />
      <div className="shorter-items">
        <input
          className="input-field"
          value={value}
          onChange={(event) => handleChange(event)}
          style={style}
          placeholder="Shorten a link here..."
        ></input>
        <button className="short-button" onClick={handleClick}>
          Shorten It!
        </button>
        {error && <p className="p-error">Please add a valid link</p>}
      </div>
    </section>
  );
}
