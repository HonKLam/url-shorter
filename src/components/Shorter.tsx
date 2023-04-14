import {useState} from "react";
import boost from "../images/bg-shorten-desktop.svg";

import {createShortLinkURL, generateShortenedLink} from "../utils";

// Prefer using "Props" instead of "AppProps"
type Props = {
  onLinkChange: ({originalLink, shortenedLink}: {originalLink: string; shortenedLink: string}) => void;
};

/*
 * I found this example here: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 * I hate writing regular expressions myself :(
 */
export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );
  return !!urlPattern.test(urlString);
};

const Shorter = (props: Props) => {
  /*
   Mind the difference between destructuring and objects using "{}"
   - Before equal sign = destructure, after equal sign = object 
  */
  const {onLinkChange} = props;

  // Push down props as far to the bottom as you can!
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async (rawUrl: string) => {
    // Check if valid URL
    try {
      if (!isValidUrl(rawUrl)) {
        throw new Error("url does not appear pass validation");
      }
      const originalLink = new URL(rawUrl).toString();

      // Create Link with Query Params
      const link = createShortLinkURL(originalLink);

      // Do Api Call
      const shortenedLink = await generateShortenedLink(link);
      onLinkChange({originalLink, shortenedLink});

      // reset value
      setValue("");
      setError(false);
    } catch {
      setError(true);
    }
  };

  const style = {
    border: error ? "2px solid #d46e6f" : "none", // On Error -> button and input slightly shifts -> fixable?
    // boxSizing: "border-box" <-- this isn't working correctly, I'm probably messing up the syntax :(
  };

  return (
    <section className="url-shorter">
      <img src={boost} alt="background-img" />
      <div className="shorter-items">
        <input className="input-field" value={value} onChange={(event) => setValue(event.target.value)} style={style} placeholder="Shorten a link here..." />
        <button className="short-button" onClick={() => handleClick(value)}>
          Shorten It!
        </button>
        {error && <p className="p-error">Please add a valid link</p>}
      </div>
    </section>
  );
};

export default Shorter;
