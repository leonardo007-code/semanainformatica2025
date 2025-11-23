import { useRef, lazy, Suspense } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Schedule from "./components/Schedule";
import Bootcamp from "./components/Bootcamp";
import Footer from "./components/Footer";

// Lazy load heavy components for better performance
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
      <About />
      <Schedule />
      {/*<Bootcamp onRegister={scrollToRegister} />*/}

      <Suspense
        fallback={
          <div
            style={{
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--morado)",
            }}
          >
            <div>Cargando...</div>
          </div>
        }
      >
        <Speakers />
        <LiveStreams />
        <div ref={registerRef}>
          <RegistrationForm />
        </div>
        <Sponsors />
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
