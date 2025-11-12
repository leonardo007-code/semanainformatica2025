import { useState, useEffect, useRef } from 'react';
import { Tv, X, Clock, Users } from 'lucide-react';
import { fadeInUp, scaleIn } from '../utils/animations';
import styles from './LiveStreams.module.css';

interface Stream {
  id: number;
  title: string;
  day: string;
  time: string;
  platform: 'YouTube' | 'Twitch';
  url: string;
  viewers?: number;
  isLive?: boolean;
}

const STREAMS: Stream[] = [
  {
    id: 1,
    title: 'Inauguración DEV WEEK 2025',
    day: 'Lunes',
    time: '9:00 AM',
    platform: 'YouTube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    viewers: 245,
    isLive: false
  },
  {
    id: 2,
    title: 'Talleres de Desarrollo Web',
    day: 'Martes',
    time: '10:00 AM',
    platform: 'Twitch',
    url: 'https://player.twitch.tv/?channel=placeholder',
    isLive: false
  },
  {
    id: 3,
    title: 'Bootcamp Intensivo - En Vivo',
    day: 'Miércoles',
    time: '9:00 AM - 1:00 PM',
    platform: 'YouTube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    viewers: 532,
    isLive: true
  },
  {
    id: 4,
    title: 'Conferencias Tech Leaders',
    day: 'Jueves',
    time: '2:00 PM',
    platform: 'YouTube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isLive: false
  }
];

const LiveStreams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      const firstFocusable = modalRef.current?.querySelector('button');
      (firstFocusable as HTMLElement)?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
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

  return (
    <section ref={sectionRef} className={styles.section} id="transmisiones">
      <div className={styles.container}>
        <div className={styles.header}>
          <Tv className={styles.icon} size={32} />
          <h2 className={styles.title}>Transmisiones en Vivo</h2>
          <p className={styles.description}>
            Sigue todos los eventos en tiempo real desde donde estés
          </p>
        </div>

        <div className={styles.grid}>
          {STREAMS.map(stream => (
            <div key={stream.id} className={styles.streamCard}>
              {stream.isLive && (
                <div className={styles.liveBadge}>
                  <span className={styles.liveDot}></span>
                  EN VIVO
                </div>
              )}

              <div className={styles.cardHeader}>
                <div className={styles.platformBadge}>
                  {stream.platform}
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.streamTitle}>{stream.title}</h3>

                <div className={styles.streamInfo}>
                  <div className={styles.infoItem}>
                    <Clock size={16} />
                    <span>{stream.day} - {stream.time}</span>
                  </div>
                  {stream.viewers !== undefined && (
                    <div className={styles.infoItem}>
                      <Users size={16} />
                      <span>{stream.viewers} espectadores</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => openModal(stream)}
                  className={styles.watchBtn}
                  aria-label={`Ver transmisión: ${stream.title}`}
                >
                  Ver Transmisión
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chatInfo}>
          <p>
            Participa en el chat en vivo durante las transmisiones y conecta con otros asistentes
          </p>
        </div>
      </div>

      {isModalOpen && (
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

            {selectedStream && (
              <>
                <h3 id="modal-title" className={styles.modalTitle}>
                  {selectedStream.title}
                </h3>

                <div className={styles.videoContainer}>
                  <iframe
                    src={selectedStream.url}
                    title={selectedStream.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                  ></iframe>
                </div>

                <div className={styles.modalInfo}>
                  <span>{selectedStream.day} - {selectedStream.time}</span>
                  <span className={styles.separator}>•</span>
                  <span>{selectedStream.platform}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveStreams;
