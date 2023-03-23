import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Shorter from "./components/Shorter";
import Links from "./components/Links";
import Footer from "./components/Footer";

function App() {
  const [originalLinks, setOriginalLinks] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]); // ??? Typescript Thingy
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <div>
      <NavBar />
      <Hero />
      <Shorter
        value={value}
        setValue={setValue}
        setLinks={setLinks}
        setOriginalLinks={setOriginalLinks}
        error={error}
        setError={setError}
      />
      <Links links={links} originalLinks={originalLinks} />
      <Footer />
    </div>
  );
}

export default App;
