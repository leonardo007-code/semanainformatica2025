import { useEffect, useRef, useState } from 'react';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';
import { slideInLeft, scaleIn } from '../utils/animations';
import styles from './Bootcamp.module.css';

const Bootcamp = ({ onRegister }: { onRegister: () => void }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [availableSlots] = useState(45);

  useEffect(() => {
    if (bannerRef.current) {
      slideInLeft(bannerRef.current, 800);
    }

    const features = document.querySelectorAll(`.${styles.feature}`);
    if (features.length > 0) {
      scaleIn(features, 600);
    }
  }, []);

  return (
    <section className={styles.section} id="bootcamp">
      <div className={styles.container}>
        <div ref={bannerRef} className={styles.banner}>
          <div className={styles.bannerContent}>
            <div className={styles.badgeContainer}>
              <Award className={styles.badgeIcon} size={28} />
              <span className={styles.badgeText}>Miércoles 3 de Diciembre</span>
            </div>

            <h2 className={styles.title}>Bootcamp Intensivo</h2>
            <p className={styles.subtitle}>
              Día central del evento con experiencia de aprendizaje práctica e intensiva
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <Clock size={24} />
                <div>
                  <span className={styles.statValue}>4 horas</span>
                  <span className={styles.statLabel}>de duración</span>
                </div>
              </div>
              <div className={styles.stat}>
                <Users size={24} />
                <div>
                  <span className={styles.statValue}>{availableSlots}</span>
                  <span className={styles.statLabel}>cupos disponibles</span>
                </div>
              </div>
            </div>

            <button onClick={onRegister} className={styles.ctaButton}>
              Registrarme al Bootcamp
            </button>
          </div>

          <div className={styles.bannerGraphic}>
            <div className={styles.graphicCircle}></div>
            <div className={styles.graphicSquare}></div>
          </div>
        </div>

        <div className={styles.details}>
          <h3 className={styles.detailsTitle}>¿Qué incluye el Bootcamp?</h3>

          <div className={styles.features}>
            <div className={styles.feature}>
              <CheckCircle className={styles.featureIcon} size={24} />
              <div>
                <h4 className={styles.featureTitle}>Sesiones Prácticas</h4>
                <p className={styles.featureText}>
                  Trabajo hands-on con tecnologías actuales y casos reales
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <CheckCircle className={styles.featureIcon} size={24} />
              <div>
                <h4 className={styles.featureTitle}>Mentores Expertos</h4>
                <p className={styles.featureText}>
                  Guía personalizada de profesionales con experiencia en la industria
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <CheckCircle className={styles.featureIcon} size={24} />
              <div>
                <h4 className={styles.featureTitle}>Certificado</h4>
                <p className={styles.featureText}>
                  Reconocimiento oficial de participación del ISTTA
                </p>
              </div>
            </div>

            <div className={styles.feature}>
              <CheckCircle className={styles.featureIcon} size={24} />
              <div>
                <h4 className={styles.featureTitle}>Materiales Incluidos</h4>
                <p className={styles.featureText}>
                  Recursos digitales, templates y acceso a repositorio exclusivo
                </p>
              </div>
            </div>
          </div>

          <div className={styles.requirements}>
            <h4 className={styles.requirementsTitle}>Requisitos</h4>
            <ul className={styles.requirementsList}>
              <li>Laptop con software de desarrollo instalado</li>
              <li>Conocimientos básicos de programación</li>
              <li>Compromiso de asistencia completa (4 horas)</li>
              <li>Inscripción previa (cupos limitados)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bootcamp;
