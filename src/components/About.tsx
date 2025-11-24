import { useEffect, useRef } from "react";
import { Code2, Users, Lightbulb, Rocket, Laptop } from "lucide-react";
import anime from "animejs";
import styles from "./About.module.css";

const features = [
  {
    icon: <Code2 size={48} className={styles.aboutIcon} />,
    title: "Innovación Tecnológica",
    description:
      "Explora las últimas tendencias en desarrollo de software y herramientas modernas",
  },
  {
    icon: <Users size={48} className={styles.aboutIcon} />,
    title: "Networking",
    description:
      "Conecta con profesionales, expertos del sector y estudiantes apasionados por la tecnología",
  },
  {
    icon: <Lightbulb size={48} className={styles.aboutIcon} />,
    title: "Aprendizaje Práctico",
    description:
      "Workshops y bootcamps hands-on para desarrollar habilidades reales y aplicables",
  },
  {
    icon: <Rocket size={48} className={styles.aboutIcon} />,
    title: "Impulso Profesional",
    description:
      "Oportunidades laborales, mentoría y consejos para acelerar tu carrera tech",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: `.${styles.aboutCard}`,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              delay: anime.stagger(150),
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHeader}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.aboutTitle}>¿Qué es DEV WEEK?</h2>
            <Laptop size={28} className={styles.titleIcon} />
          </div>
          <div className={styles.aboutDivider}></div>
          <p className={styles.aboutDescription}>
            DEV WEEK es la Semana Informática 2025, un evento anual, organizada
            por estudiantes del VI ciclo de
            <span style={{ fontWeight: 600, color: "var(--morado)" }}>
              {" "}
              Desarrollo de Sistemas de Información
            </span>
            . Un evento diseñado para inspirar, educar y conectar a la comunidad
            tecnológica.
          </p>
        </div>
        <div className={styles.aboutGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.aboutCard}>
              {feature.icon}
              <h3 className={styles.aboutCardTitle}>{feature.title}</h3>
              <p className={styles.aboutCardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
