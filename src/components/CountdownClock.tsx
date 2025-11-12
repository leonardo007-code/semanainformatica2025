import { useEffect, useState, useRef } from 'react';
import styles from './CountdownClock.module.css';
import { fadeInUp } from '../utils/animations';

const TARGET_DATE = new Date('2025-12-01T11:00:00').getTime();

const LABELS = [
  { label: 'Días', key: 'dias' },
  { label: 'Horas', key: 'horas' },
  { label: 'Min', key: 'minutos' },
  { label: 'Seg', key: 'segundos' }
];

function getTimeLeft() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;
  return {
    dias: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
    horas: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    minutos: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
    segundos: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))
  };
}

const CountdownClock = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clockRef.current) {
      fadeInUp(clockRef.current, 900);
    }
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={clockRef} className={styles.clockGrid}>
      {LABELS.map(({ label, key }) => (
        <div key={key} className={styles.clockItem}>
          <div className={styles.value}>{timeLeft[key as keyof typeof timeLeft]}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownClock;
