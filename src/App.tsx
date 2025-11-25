import { useRef, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Lazy load all non-critical components for better performance
const About = lazy(() => import("./components/About"));
const Schedule = lazy(() => import("./components/Schedule"));
const Bootcamp = lazy(() => import("./components/Bootcamp"));
const Speakers = lazy(() => import("./components/Speakers"));
const LiveStreams = lazy(() => import("./components/LiveStreams"));
const RegistrationForm = lazy(() => import("./components/RegistrationForm"));
const Sponsors = lazy(() => import("./components/Sponsors"));

function App() {
  const registerRef = useRef<HTMLDivElement>(null);
  const streamsRef = useRef<HTMLElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStreams = () => {
    streamsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero
        onScrollToRegister={scrollToRegister}
        onScrollToStreams={scrollToStreams}
      />

      {/* Suspense boundary for each section to load independently */}
      <Suspense fallback={<div style={{ minHeight: "200px" }} />}>
        <About />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
        <Schedule />
      </Suspense>

      {/*<Bootcamp onRegister={scrollToRegister} />*/}

      <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
        <Speakers />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
        <LiveStreams />
      </Suspense>

      {/*<div ref={registerRef}>
        <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
          <RegistrationForm />
        </Suspense>
      </div>*/}

      <Suspense fallback={<div style={{ minHeight: "300px" }} />}>
        <Sponsors />
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
