import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
const stagger = anime.stagger;
import { Calendar, Clock, Download, X, Star } from 'lucide-react';
import { diasEvento } from '../data/schedule';
import { Dia, Actividad } from '../types';
import styles from './Schedule.module.css';

export default function Schedule() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<Dia | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: `.${styles.scheduleCard}`,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              delay: stagger(100),
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="cronograma" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cronograma de la Semana</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Cinco días intensivos de aprendizaje, innovación y networking
          </p>
        </div>
        <div className={styles.grid}>
          {diasEvento.map((dia) => (
            <div
              key={dia.id}
              onClick={() => setSelectedDay(dia)}
              className={`${styles.scheduleCard} ${dia.destacado ? styles.featured : ''}`}
            >
              {dia.destacado && (
                <div className={styles.starBadge}>
                  <Star className={styles.starIcon} />
                </div>
              )}
              <div className={dia.destacado ? styles.dayFeatured : styles.dayName}>
                {dia.nombre.toUpperCase()}
              </div>
              <h3 className={styles.cardTitle}>{dia.tema}</h3>
              <div className={styles.cardInfo}>
                <Calendar className={styles.cardIcon} />
                <span>{dia.fecha}</span>
              </div>
              <div className={styles.cardInfo}>
                <Clock className={styles.cardIcon} />
                <span>{dia.hora}</span>
              </div>
              {dia.destacado && (
                <div className={styles.centralBadge}>¡DÍA CENTRAL!</div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.downloadRow}>
          <button className={styles.downloadBtn}>
            <Download className={styles.downloadIcon} />
            Descargar Cronograma Completo
          </button>
        </div>
      </div>
      {selectedDay && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.dayModal}>{selectedDay.nombre.toUpperCase()}</div>
                <h3 className={styles.modalTitle}>{selectedDay.tema}</h3>
                <div className={styles.modalDetails}>
                  <div className={styles.cardInfo}>
                    <Calendar className={styles.cardIcon} />
                    <span>{selectedDay.fecha}</span>
                  </div>
                  <div className={styles.cardInfo}>
                    <Clock className={styles.cardIcon} />
                    <span>{selectedDay.hora}</span>
                  </div>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedDay(null)}>
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalDesc}>{selectedDay.descripcion}</p>
              <h4 className={styles.modalSubtitle}>Actividades</h4>
              <ul className={styles.modalList}>
                {selectedDay.actividades.map((actividad: Actividad, index: number) => (
                  <li key={index} className={styles.modalListItem}>
                    <div className={styles.modalListNum}>{index + 1}</div>
                      <div className={styles.actividadBox}>
                          {actividad.hora && (
                            <span className={styles.actividadHora}>
                              {actividad.hora}
                            </span>
                          )}
                          <div className={styles.actividadTitulo}>
                            {actividad.titulo}
                          </div>
                      </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
