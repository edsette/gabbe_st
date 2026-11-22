import { useState } from 'react';
import Intro from './components/Intro.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Cursor from './components/Cursor.jsx';
import {
  Header,
  Marquee,
  Belief,
  About,
  Services,
  Process,
  Mentoria,
  Contact,
  Footer,
  useRefreshOnLoad
} from './components/Sections.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  useRefreshOnLoad();
  return (
    <>
      {!ready && <Intro onDone={() => setReady(true)} />}
      <Cursor />
      <Header />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Belief />
        <Projects />
        <About />
        <Services />
        <Process />
        <Mentoria />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
