import { useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import { fadeInUp } from '../utils/animations';
import styles from './Sponsors.module.css';

const Sponsors = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, 1000);
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.anniversary}>
          <Award className={styles.icon} size={48} />
          <h2 className={styles.anniversaryTitle}>50 Años de Excelencia</h2>
          <p className={styles.anniversaryText}>
            Instituto de Educación Superior Túpac Amaru
          </p>
          <p className={styles.anniversarySubtext}>
            Formando profesionales desde 1975
          </p>
        </div>

        <div className={styles.careerInfo}>
          <h3 className={styles.careerTitle}>
            Desarrollo de Sistemas de Información
          </h3>
          <p className={styles.careerDescription}>
            Anteriormente "Computación e Informática" (1983), renombrada hace 5 años para
            reflejar el enfoque moderno en desarrollo de software y sistemas empresariales.
          </p>
        </div>

        <div className={styles.sponsorsSection}>
          <h3 className={styles.sponsorsTitle}>Sponsors & Colaboradores</h3>
          <p className={styles.sponsorsDescription}>
            Esta sección puede incluir logos de empresas patrocinadoras
          </p>

          <div className={styles.sponsorGrid}>
            <div className={styles.sponsorPlaceholder}>
              Sponsor 1
            </div>
            <div className={styles.sponsorPlaceholder}>
              Sponsor 2
            </div>
            <div className={styles.sponsorPlaceholder}>
              Sponsor 3
            </div>
            <div className={styles.sponsorPlaceholder}>
              Sponsor 4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
