import { useState, useEffect, useRef } from "react";
import { Tv, X, Clock, Calendar } from "lucide-react";
import { fadeInUp, scaleIn } from "../utils/animations";
import { Stream } from "../types/stream";
import {
  getStreamWithStatus,
  getEmbedUrl,
  getTodayStream,
  formatCountdown,
  getStatusLabel,
} from "../utils/streamHelpers";
import styles from "./LiveStreams.module.css";

// Datos de transmisiones alineados con el cronograma
const STREAMS: Stream[] = [
  {
    id: 1,
    title: "Inauguración y Gestión de TI",
    day: "Miércoles 10",
    date: "2025-12-10",
    startTime: "11:00",
    endTime: "13:00",
    platform: "facebook",
    embedUrl: "",
    description:
      "Inicio oficial de la DEV WEEK 2025 con presentación del 4º semestre y ponencia sobre Gestión de TI por Tec. Rodrigo Salazar",
  },
  {
    id: 2,
    title: "Bootcamp - Ciberseguridad (Día 1)",
    day: "Jueves 11",
    date: "2025-12-11",
    startTime: "08:00",
    endTime: "13:00",
    platform: "facebook",
    embedUrl: "",
    description:
      "Primer día del Bootcamp intensivo de Ciberseguridad impartido por OWASP Cusco",
  },
  {
    id: 3,
    title: "Bootcamp - Ciberseguridad (Día 2)",
    day: "Viernes 12",
    date: "2025-12-12",
    startTime: "08:00",
    endTime: "13:00",
    platform: "facebook",
    embedUrl: "",
    description:
      "Segundo día del Bootcamp de Ciberseguridad con OWASP Cusco y cierre del evento",
  },
];

// Componente CountdownTimer
const CountdownTimer = ({ timeUntilStart }: { timeUntilStart: number }) => {
  const [countdown, setCountdown] = useState(formatCountdown(timeUntilStart));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = timeUntilStart - (Date.now() - now);
      if (remaining > 0) {
        setCountdown(formatCountdown(remaining));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeUntilStart]);

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownLabel}>Comienza en:</div>
      <div className={styles.countdownTime}>
        {countdown.hours > 0 && (
          <div className={styles.timeUnit}>
            <span className={styles.timeValue}>
              {String(countdown.hours).padStart(2, "0")}
            </span>
            <span className={styles.timeLabel}>hrs</span>
          </div>
        )}
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>
            {String(countdown.minutes).padStart(2, "0")}
          </span>
          <span className={styles.timeLabel}>min</span>
        </div>
        <div className={styles.timeUnit}>
          <span className={styles.timeValue}>
            {String(countdown.seconds).padStart(2, "0")}
          </span>
          <span className={styles.timeLabel}>seg</span>
        </div>
      </div>
    </div>
  );
};

const LiveStreams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const todayStream = getTodayStream(STREAMS);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, 1000);
    }

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll(`.${styles.streamCard}`);
      scaleIn(cards, 500);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      const firstFocusable = modalRef.current?.querySelector("button");
      (firstFocusable as HTMLElement)?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openModal = (stream: Stream) => {
    setSelectedStream(stream);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStream(null), 300);
  };

  // Filtrar streams: ocultar los que ya pasaron y no tienen video
  const visibleStreams = STREAMS.map(getStreamWithStatus).filter((stream) => {
    // Si ya pasó la fecha de fin y no tiene videoId, ocultarlo
    const now = new Date();
    const streamEndDate = new Date(`${stream.date}T${stream.endTime}:00`);

    if (now > streamEndDate && !stream.videoId) {
      return false; // Ocultar card
    }

    return true; // Mostrar card
  });

  return (
    <>
      <section ref={sectionRef} className={styles.section} id="transmisiones">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>Transmisiones en Vivo</h2>
              <Tv size={28} className={styles.titleIcon} />
            </div>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              Sigue todos los eventos en tiempo real desde donde estés
            </p>
          </div>

          {/* Grid de streams */}
          <div className={styles.grid}>
            {visibleStreams.map((stream) => (
              <div
                key={stream.id}
                className={`${styles.streamCard} ${styles[stream.status]}`}
              >
                <div className={styles.statusBadge}>
                  {getStatusLabel(stream.status)}
                </div>

                <div className={styles.cardHeader}>
                  <div className={styles.platformBadge}>{stream.platform}</div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.streamTitle}>{stream.title}</h3>

                  <div className={styles.streamInfo}>
                    <div className={styles.infoItem}>
                      <Clock size={16} style={{ color: "var(--dorado)" }} />
                      <span>
                        {stream.day} - {stream.startTime} hrs.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal(stream)}
                    className={styles.watchBtn}
                  >
                    {stream.status === "live" && "Ver Live"}
                    {stream.status === "recorded" && "Ver Video"}
                    {stream.status === "upcoming" && "Próximamente"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.chatInfo}>
            <p>
              Participa en el chat en vivo durante las transmisiones y conecta
              con otros asistentes
            </p>
          </div>
        </div>
      </section>

      {/* Modal fuera del section para centrarse en toda la pantalla */}
      {isModalOpen &&
        selectedStream &&
        (() => {
          const streamWithStatus = getStreamWithStatus(selectedStream);
          const embedUrl = getEmbedUrl(selectedStream);

          return (
            <div
              className={styles.modalOverlay}
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div
                ref={modalRef}
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className={styles.closeBtn}
                  aria-label="Cerrar modal"
                >
                  <X size={24} />
                </button>

                <h3 id="modal-title" className={styles.modalTitle}>
                  {selectedStream.title}
                </h3>

                {/* Mostrar video solo si es LIVE o RECORDED */}
                {embedUrl &&
                (streamWithStatus.status === "live" ||
                  streamWithStatus.status === "recorded") ? (
                  <div className={styles.videoContainer}>
                    <iframe
                      src={embedUrl}
                      title={selectedStream.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.iframe}
                    ></iframe>
                  </div>
                ) : (
                  <div className={styles.noStream}>
                    <Tv size={48} />
                    <p>
                      {streamWithStatus.status === "live" && !embedUrl
                        ? "La transmisión comenzará pronto. Agrega el enlace para verla en vivo."
                        : streamWithStatus.status === "recorded" && !embedUrl
                        ? "Este evento ya finalizó pero aún no hay grabación disponible."
                        : streamWithStatus.status === "upcoming" ||
                          streamWithStatus.status === "scheduled"
                        ? `Este evento comenzará el ${selectedStream.day} a las ${selectedStream.startTime} hrs. ¡Vuelve en ese momento!`
                        : "Información no disponible"}
                    </p>
                  </div>
                )}

                <div className={styles.modalInfo}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Clock size={16} style={{ color: "var(--dorado)" }} />
                    <span>
                      {selectedStream.day} - {selectedStream.startTime} -{" "}
                      {selectedStream.endTime} hrs.
                    </span>
                  </div>
                  <span className={styles.separator}>•</span>
                  <span className={styles.modalStatusBadge}>
                    {getStatusLabel(streamWithStatus.status)}
                  </span>
                  <span className={styles.separator}>•</span>
                  <span>{selectedStream.platform}</span>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
};

export default LiveStreams;
