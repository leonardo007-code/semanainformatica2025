import { useEffect, useRef } from "react";
import { Building2 } from "lucide-react";
import { fadeInUp } from "../utils/animations";
import styles from "./Sponsors.module.css";

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
          <div className={styles.anniversaryContent}>
            <div className={styles.logoSection}>
              <span className={styles.sparkle1}></span>
              <span className={styles.sparkle2}></span>
              <span className={styles.sparkle3}></span>
              <span className={styles.sparkle4}></span>
              <img
                src="/Logo-50-años-instituto-Tupac-Amaru.png"
                alt="Instituto de Educación Superior Público Túpac Amaru"
                className={styles.logo}
              />
              <p className={styles.anniversarySubtext}>
                Formando profesionales técnicos de calidad
              </p>
              <a
                href="https://www.istta.edu.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                www.istta.edu.pe
              </a>
            </div>
            <div className={styles.imageSection}>
              <img
                src="/chica-señalando-lado-derecho-color.png"
                alt="Estudiante señalando"
                className={styles.studentImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.organizedSection}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.organizedTitle}>Organizado por</h3>
            <Building2 size={28} className={styles.titleIcon} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.organizedLogos}>
            <a
              href="https://www.istta.edu.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.organizerLogo}
            >
              <img
                src="/logo-instituto-Tupac-Amaru.png"
                alt="Instituto Superior Túpac Amaru"
                className={styles.logoImage}
              />
            </a>
            <a
              href="https://www.istta.edu.pe/cdsi.php"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.organizerLogo}
            >
              <img
                src="/logo-desarrollo-de-sistemas-de-informacion.png"
                alt="Desarrollo de Sistemas de Información"
                className={styles.logoImage}
              />
            </a>
          </div>
        </div>

        <div className={styles.careerInfo}>
          <h3 className={styles.careerTitle}>
            Desarrollo de Sistemas de Información
          </h3>
          <p className={styles.careerDescription}>
            Anteriormente "Computación e Informática" (1983), renombrada hace 6
            años para reflejar el enfoque moderno en desarrollo de software y
            sistemas empresariales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
