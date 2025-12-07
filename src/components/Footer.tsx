import { Facebook, Instagram } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>DEV WEEK 2025</h3>
            <p className={styles.text}>
              Semana del Desarrollo del IESP Túpac Amaru. Evento tecnológico con
              Bootcamp de Ciberseguridad y Gestión de TI. Del 10 al 12 de
              diciembre.
            </p>
            <div className={styles.social}>
              <a
                href="https://www.facebook.com/share/1FFHtQDqx8/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/dev.week?igsh=YTU2NmM5Z3VhZWVo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@devweek?_t=ZS-90zI7zBet2e&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Enlaces Rápidos</h3>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={styles.link}
                >
                  Acerca del Evento
                </a>
              </li>
              <li>
                <a
                  href="#cronograma"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("cronograma")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={styles.link}
                >
                  Cronograma
                </a>
              </li>
              <li>
                <a
                  href="#ponentes"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("ponentes")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={styles.link}
                >
                  Ponentes
                </a>
              </li>
              <li>
                <a
                  href="#transmisiones"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("transmisiones")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={styles.link}
                >
                  Transmisiones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 IESP Túpac Amaru - Instituto de Educación Superior Público
            Túpac Amaru. Todos los derechos reservados.
          </p>
          <div className={styles.credits}>
            <span className={styles.creditsText}>Desarrollado por</span>
            <a
              href="https://nyuroframe.expandeya.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/logo-nyuro-frame.png"
                alt="Nyuro Frame"
                className={styles.creditsLogo}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
