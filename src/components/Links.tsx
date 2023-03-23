import React from "react";
import ShortLink from "./ShortLink";

type AppProps = {
  links: string[];
  originalLinks: string[];
};

export default function Links({ links, originalLinks }: AppProps) {
  return (
    <section className="links-items">
      {links.length ? (
        <div className="links-boxes">
          {links.map((url, index) => {
            return (
              <ShortLink shortURL={url} originalLink={originalLinks[index]} />
            );
          })}
        </div>
      ) : (
        <div className="links-placeholder">
          <h2>Short-Links will appear here</h2>
          <p>Drop a Link and press "Shorten It"!</p>
        </div>
      )}
    </section>
  );
}
