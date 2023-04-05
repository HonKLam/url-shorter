import {useState} from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Shorter from './components/Shorter'
import Links from './components/Links'
import Footer from './components/Footer'

function App() {
  const [originalLinks, setOriginalLinks] = useState([] as string[]) // this works as well for Typescript Thingy
  const [links, setLinks] = useState<string[]>([]) // Typescript Thingy
  /* 
    Typescript Thingy = "Generic" - tells TS that the useState function accepts array containing strings only
    instead of staing type of parameter, we're setting the type in the useState function using Generic syntax? (<T>) ?

    Generics do have a bigger purpose though, it can be used as a "type-variable", changing the required types in funtion, classes, etc. depending on the incoming types
    Example: input can be number | string | boolean - output should be number | string | boolean -> use <T> everywhere for the type to "adapt"
    
  */
  return (
    <div>
      <NavBar />
      <Hero />
      <Shorter
        onLinkChange={({originalLink, shortenedLink}) => {
          // pass own arrow functions instead of setState-Function directly to avoid React setState Generics
          setLinks([...links, shortenedLink])
          setOriginalLinks([...originalLinks, originalLink])
        }}
      />
      <Links links={links} originalLinks={originalLinks} />
      <Footer />
    </div>
  )
}

export default App
