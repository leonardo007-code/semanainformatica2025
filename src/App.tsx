import { lazy, Suspense } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Lazy load all non-critical components for better performance
const About = lazy(() => import("./components/About"));
const Schedule = lazy(() => import("./components/Schedule"));
const Speakers = lazy(() => import("./components/Speakers"));
const LiveStreams = lazy(() => import("./components/LiveStreams"));
const Sponsors = lazy(() => import("./components/Sponsors"));

function App() {
  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Hero />

      <main id="main-content">
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

        {/*<Suspense fallback={<div style={{ minHeight: "400px" }} />}>
          <LiveStreams />
        </Suspense>*/}

        {/*<div ref={registerRef}>
          <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
            <RegistrationForm />
          </Suspense>
        </div>*/}

        <Suspense fallback={<div style={{ minHeight: "300px" }} />}>
          <Sponsors />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
