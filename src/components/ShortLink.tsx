import React from "react";

type AppProps = {
  shortURL: string;
  originalLink: string;
};

export default function ShortLink({ shortURL, originalLink }: AppProps) {
  return (
    <div className="link-box">
      <p className="p-original-link">{originalLink}</p>
      <p className="p-short-link">{shortURL}</p>
      <button onClick={() => navigator.clipboard.writeText(shortURL)}>
        Copy
      </button>
    </div>
  );
}
