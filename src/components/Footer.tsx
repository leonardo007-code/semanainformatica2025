import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>DEV WEEK 2025</h3>
            <p className={styles.text}>
              Evento estudiantil anual organizado por la carrera de Desarrollo de Sistemas
              de Información del ISTTA.
            </p>
            <div className={styles.social}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Enlaces Rápidos</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#fechas" className={styles.link}>
                  Fechas del Evento
                </a>
              </li>
              <li>
                <a href="#bootcamp" className={styles.link}>
                  Bootcamp
                </a>
              </li>
              <li>
                <a href="#ponentes" className={styles.link}>
                  Ponentes
                </a>
              </li>
              <li>
                <a href="#transmisiones" className={styles.link}>
                  Transmisiones
                </a>
              </li>
              <li>
                <a href="#registro" className={styles.link}>
                  Inscripción
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Información</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="#" className={styles.link}>
                  Políticas de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="https://www.istta.edu.pe/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Sobre el ISTTA
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <a href="mailto:contacto@istta.edu.pe" className={styles.contactLink}>
                  contacto@istta.edu.pe
                </a>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span className={styles.text}>
                  Instituto de Educación Superior Túpac Amaru
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 ISTTA - Instituto de Educación Superior Túpac Amaru. Todos los derechos reservados.
          </p>
          <p className={styles.credits}>
            Desarrollado por estudiantes de Desarrollo de Sistemas de Información
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
