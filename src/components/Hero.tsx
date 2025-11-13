import { useEffect, useRef } from 'react';
import { Calendar, Sparkles, MapPin } from 'lucide-react';
import { enterStagger, pulseAccent } from '../utils/animations';
import CountdownClock from './CountdownClock';
import styles from './Hero.module.css';

interface HeroProps {
  onScrollToRegister: () => void;
  onScrollToStreams: () => void;
}

const Hero = ({ onScrollToRegister, onScrollToStreams }: HeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      badgeRef.current,
      titleRef.current,
      subtitleRef.current,
      ctaRef.current
    ];

    enterStagger(elements.filter(Boolean), 100);

    if (badgeRef.current) {
      pulseAccent(badgeRef.current);
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <a
            href="https://www.istta.edu.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
            aria-label="Instituto de Educación Superior Túpac Amaru"
          >
            <div className={styles.logoPlaceholder}>
              <span>ISTTA</span>
            </div>
          </a>
          <div ref={badgeRef} className={styles.badge}>
            <Sparkles size={16} />
            <span>50 años</span>
          </div>
        </div>

        <div className={styles.content}>
          <h1 ref={titleRef} className={styles.title}>
            DEV WEEK 22222
          </h1>

          {/* Mover infoCard aquí debajo del título */}
          <div className={styles.infoCard}>
            <p className={styles.institution}>
              Instituto de Educación Superior Túpac Amaru
            </p>
            <p className={styles.carrera}>
              Desarrollo de Sistemas de Información
            </p>
          </div>


          <div
            ref={subtitleRef}
            className={styles.subtitle}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} style={{ color: 'var(--dorado)' }} />
              <span style={{ color: 'var(--morado_claro)' }}>1 al 5 de diciembre</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              <span style={{ color: 'var(--morado_claro)' }}>11:00 a.m. – 1:00 p.m.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} style={{ color: 'var(--dorado)' }} />
              <span style={{ color: 'var(--morado_claro)' }}>Ubicación</span>
              <span style={{ fontWeight: 700, marginLeft: '0.25rem', color: 'var(--dorado)' }}>ISTTA</span>
            </div>
          </div>

          {/* Reloj de cuenta regresiva */}
          <CountdownClock />

          <div ref={ctaRef} className={styles.ctaGroup}>
            <button
              onClick={() => {
                const el = document.getElementById('fechas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
                const el = document.getElementById('transmisiones');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
