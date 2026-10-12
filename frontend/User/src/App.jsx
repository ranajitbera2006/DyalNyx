import { Navbar } from "./component/layout/Navbar";
import { Hero } from "./component/sections/Hero";
import { About } from "./component/sections/About";
import { Contact } from "./component/sections/Contact";
import {Skills } from "./component/sections/Skills";
import Footer from "./component/layout/Footer";
import { Projects } from "./component/sections/Projects";
function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills/>
        <Contact />
      </main>
        <Footer/>
    </div>
  );
}

export default App;
