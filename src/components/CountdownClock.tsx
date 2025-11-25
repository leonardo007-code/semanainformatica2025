import { useEffect, useState, useRef } from "react";
import styles from "./CountdownClock.module.css";

const TARGET_DATE = new Date("2025-12-09T11:00:00").getTime();
const LABELS = [
  { label: "Días", key: "dias" },
  { label: "Horas", key: "horas" },
  { label: "Min", key: "minutos" },
  { label: "Seg", key: "segundos" },
];

function getTimeLeft() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;
  return {
    dias: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
    horas: Math.max(
      0,
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ),
    minutos: Math.max(
      0,
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    ),
    segundos: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
  };
}

const CountdownClock = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [animatedTime, setAnimatedTime] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const [animatingKeys, setAnimatingKeys] = useState<string[]>([]);
  const hasAnimatedRef = useRef(false);
  const prevTimeRef = useRef(animatedTime);

  // Initial counting animation - runs only once
  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const initialTime = getTimeLeft();
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const frameInterval = duration / steps;
    let currentStep = 0;

    const animationInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedTime({
        dias: Math.floor(initialTime.dias * progress),
        horas: Math.floor(initialTime.horas * progress),
        minutos: Math.floor(initialTime.minutos * progress),
        segundos: Math.floor(initialTime.segundos * progress),
      });

      if (currentStep >= steps) {
        clearInterval(animationInterval);
        setAnimatedTime(initialTime);
        hasAnimatedRef.current = true;
      }
    }, frameInterval);

    return () => clearInterval(animationInterval);
  }, []);

  // Regular countdown - runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeLeft();
      setTimeLeft(newTime);
      if (hasAnimatedRef.current) {
        // Detect which values changed
        const changedKeys: string[] = [];
        (Object.keys(newTime) as Array<keyof typeof newTime>).forEach((key) => {
          if (newTime[key] !== prevTimeRef.current[key]) {
            changedKeys.push(key);
          }
        });

        if (changedKeys.length > 0) {
          setAnimatingKeys(changedKeys);
          // Remove animation class after animation completes
          setTimeout(() => setAnimatingKeys([]), 400);
        }

        setAnimatedTime(newTime);
        prevTimeRef.current = newTime;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdownWrapper}>
      <div className={styles.countdownHeader}>
        <h3 className={styles.countdownTitle}>Comienza en</h3>
      </div>
      <div className={styles.clockGrid}>
        {LABELS.map(({ label, key }) => (
          <div key={key} className={styles.clockItem}>
            <div
              className={`${styles.value} ${
                animatingKeys.includes(key) ? styles.valueAnimating : ""
              }`}
            >
              {animatedTime[key as keyof typeof animatedTime]}
            </div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownClock;
