import { useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Bootcamp from './components/Bootcamp';
import Speakers from './components/Speakers';
import LiveStreams from './components/LiveStreams';
import RegistrationForm from './components/RegistrationForm';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';

function App() {
  const registerRef = useRef<HTMLElement>(null);
  const streamsRef = useRef<HTMLElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStreams = () => {
    streamsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onScrollToRegister={scrollToRegister} onScrollToStreams={scrollToStreams} />
        <About />
  <Schedule />
      <Bootcamp onRegister={scrollToRegister} />
      <Speakers />
      <LiveStreams />
      <div ref={registerRef}>
        <RegistrationForm />
      </div>
      <Sponsors />
      <Footer />
    </>
  );
}

export default App;
