import { useState, useEffect, useRef } from "react";
import { Search, Calendar, Users } from "lucide-react";
import { fadeInUp, batchHoverLift } from "../utils/animations";
import styles from "./Speakers.module.css";

interface Speaker {
  id: number;
  name: string;
  role: string;
  bio: string;
  topic: string;
  day: string;
  time: string;
  image: string;
}

const SPEAKERS_DATA: Speaker[] = [
  {
    id: 1,
    name: "Ing. Mauro Pilco",
    role: "Especialista en Robótica - UNSAAC",
    bio: "Especialista en robótica aplicada y sistemas automatizados. Cuenta con experiencia en el desarrollo de soluciones tecnológicas orientadas al control, automatización y domótica en entornos educativos y profesionales.",
    topic: "Robótica y Domótica",
    day: "Lunes 01",
    time: "12:30 - 13:00",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 2,
    name: "Jimmi Carrillo",
    role: "Profesional en Ciberseguridad",
    bio: "Profesional dedicado a la ciberseguridad y seguridad informática. Especializado en protección de sistemas, gestión de vulnerabilidades, análisis de incidentes y formación en prácticas seguras.",
    topic: "Bootcamp - Ciberseguridad",
    day: "Miércoles 03",
    time: "12:00 - 12:30",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 3,
    name: "Rodrigo Salazar",
    role: "Especialista en Gestión de TI",
    bio: "Especialista en gestión de tecnologías de la información, administración de recursos tecnológicos, procesos de TI y adopción de soluciones organizacionales. Enfocado en la optimización operativa y gestión de servicios tecnológicos.",
    topic: "Gestión de TI",
    day: "Jueves 04",
    time: "12:00 - 12:30",
    image: "/placeholder-speaker.jpg",
  },
];

const DAYS = ["Todos", "Lunes 01", "Miércoles 03", "Jueves 04"];

const Speakers = () => {
  const [selectedDay, setSelectedDay] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, 1000);
    }

    const timer = setTimeout(() => {
      batchHoverLift(`.${styles.speakerCard}`);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredSpeakers = SPEAKERS_DATA.filter((speaker) => {
    const matchesDay = selectedDay === "Todos" || speaker.day === selectedDay;
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDay && matchesSearch;
  });

  return (
    <section ref={sectionRef} className={styles.section} id="ponentes">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Nuestros Ponentes</h2>
            <Users size={28} className={styles.titleIcon} />
          </div>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Aprende de los mejores profesionales de la industria tecnológica
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, tema o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Buscar ponentes"
            />
          </div>

          <div className={styles.filters}>
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`${styles.filterBtn} ${
                  selectedDay === day ? styles.active : ""
                }`}
                aria-pressed={selectedDay === day}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredSpeakers.map((speaker) => (
            <div key={speaker.id} className={styles.speakerCard}>
              <div className={styles.imageContainer}>
                <div className={styles.imagePlaceholder}>
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{speaker.name}</h3>
                <p className={styles.role}>{speaker.role}</p>
                <p className={styles.bio}>{speaker.bio}</p>
                <div className={styles.topic}>
                  <span className={styles.topicLabel}>Tema:</span>
                  <span className={styles.topicName}>{speaker.topic}</span>
                </div>
                <div className={styles.schedule}>
                  <Calendar size={16} />
                  <span>
                    {speaker.day} - {speaker.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpeakers.length === 0 && (
          <div className={styles.noResults}>
            <p>No se encontraron ponentes con los criterios seleccionados</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Speakers;
