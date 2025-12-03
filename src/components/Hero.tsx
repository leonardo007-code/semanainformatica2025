import { useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { enterStagger } from "../utils/animations";
import CountdownClock from "./CountdownClock";
import styles from "./Hero.module.css";

interface HeroProps {
  onScrollToRegister: () => void;
  onScrollToStreams: () => void;
}

const Hero = ({ onScrollToRegister, onScrollToStreams }: HeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const binaryRainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current];

    enterStagger(elements.filter(Boolean), 100);

    // Binary rain animation - optimized with CSS animations
    if (binaryRainRef.current) {
      const container = binaryRainRef.current;
      const numColumns = 15; // Optimized: Reduced from 25 for better performance

      // Create columns of binary code
      for (let i = 0; i < numColumns; i++) {
        const column = document.createElement("div");
        column.className = styles.binaryColumn;
        column.style.left = `${(i / numColumns) * 100}%`;

        // Random animation duration for variety (30-45 seconds - very slow)
        const duration = Math.random() * 15 + 30;
        column.style.animationDuration = `${duration}s`;

        // Staggered delays to ensure continuous coverage
        const delay = (i / numColumns) * 15;
        column.style.animationDelay = `-${delay}s`; // Negative delay starts mid-animation

        // Optimized: Reduced column length (40-50 digits instead of 60-90)
        const numDigits = Math.floor(Math.random() * 11) + 40;

        for (let j = 0; j < numDigits; j++) {
          const digit = document.createElement("span");
          digit.textContent = Math.random() > 0.5 ? "1" : "0";
          digit.className = styles.binaryDigit;

          // Random animation delay for each digit (0-2 seconds) for async blinking
          digit.style.animationDelay = `${Math.random() * 2}s`;

          column.appendChild(digit);
        }

        container.appendChild(column);
      }
    }

    return () => {
      // Cleanup: remove binary rain elements
      if (binaryRainRef.current) {
        binaryRainRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* SEO: H1 semántico oculto visualmente pero accesible */}
      <h1 className="sr-only">
        DEV WEEK 2025 - Semana del Desarrollo del IESP Túpac Amaru Cusco
      </h1>

      {/* Binary rain animation container */}
      <div ref={binaryRainRef} className={styles.binaryRain}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <span className={styles.sparkle1}></span>
            <span className={styles.sparkle2}></span>
            <span className={styles.sparkle3}></span>
            <span className={styles.sparkle4}></span>
            <img
              src="/logo-50-años.png"
              alt="Logo 6 años del Programa de Estudios de Desarrollo de Sistemas de Información"
              className={styles.logo50}
            />
            <img
              src="/logo-DEV-WEEK-blanco.png"
              alt="DEV WEEK 2025 - Semana del Desarrollo"
              className={styles.heroLogo}
            />
          </div>

          {/* Reloj y detalles del evento juntos */}
          <div className={styles.eventDetailsWrapper}>
            {/* Reloj de cuenta regresiva */}
            <CountdownClock />

            {/* Información del evento */}
            <div ref={subtitleRef} className={styles.eventInfo}>
              <div className={styles.infoBox}>
                <Calendar size={22} className={styles.infoIcon} />
                <span className={styles.infoValue}>10 al 12 de diciembre</span>
              </div>
              <div className={styles.infoBox}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.infoIcon}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className={styles.infoValue}>11:00 a.m. – 1:00 p.m.</span>
              </div>
              <div className={styles.infoBox}>
                <MapPin size={22} className={styles.infoIcon} />
                <span className={styles.infoValue}>
                  Auditórium del IESP Túpac Amaru
                </span>
              </div>
            </div>
          </div>

          <div ref={ctaRef} className={styles.ctaGroup}>
            <button
              onClick={() => {
                const el = document.getElementById("fechas");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={styles.btnSecondary}
              aria-label="Ver agenda del evento"
            >
              Ver agenda
            </button>
            <button
              onClick={onScrollToRegister}
              className={styles.btnPrimary}
              aria-label="Inscríbete al evento"
            >
              Inscríbete
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("transmisiones");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={styles.btnSecondary}
              aria-label="Ver transmisiones en vivo"
            >
              Ver transmisiones
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
