import {useState} from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Shorter from "./components/Shorter";
import Links from "./components/Links";
import Footer from "./components/Footer";

function App() {
  const [originalLinks, setOriginalLinks] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]); // ??? Typescript Thingy

  return (
    <div>
      <NavBar />
      <Hero />
      <Shorter
        onLinkChange={({originalLink, shortenedLink}) => {
          setLinks([...links, shortenedLink]);
          setOriginalLinks([...originalLinks, originalLink]);
        }}
      />
      <Links links={links} originalLinks={originalLinks} />
      <Footer />
    </div>
  );
}

export default App;
