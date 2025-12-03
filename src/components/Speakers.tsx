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
    name: "Tec. Rodrigo Salazar",
    role: "Especialista en Gestión de TI",
    bio: "Especialista en gestión de tecnologías de la información, administración de recursos tecnológicos, procesos de TI y adopción de soluciones organizacionales. Enfocado en la optimización operativa y gestión de servicios tecnológicos.",
    topic: "Gestión de TI",
    day: "Miércoles 10",
    time: "12:10 - 12:50",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 2,
    name: "Alejandro Miguel Choqueluque García",
    role: "OWASP Cusco - Ciberseguridad",
    bio: "Miembro de OWASP Cusco, capítulo local de la Fundación OWASP dedicado a mejorar la seguridad del software en la región. Especialista en ciberseguridad y desarrollo seguro.",
    topic: "Bootcamp - Ciberseguridad",
    day: "Jueves 11",
    time: "08:00 - 13:00",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 3,
    name: "Everth Juvenal Gallegos Puma",
    role: "OWASP Cusco - Ciberseguridad",
    bio: "Miembro de OWASP Cusco, organización dedicada a mejorar la seguridad del software. Experto en seguridad informática, proyectos colaborativos de código abierto y mejores prácticas de desarrollo seguro.",
    topic: "Bootcamp - Ciberseguridad",
    day: "Jueves 11",
    time: "08:00 - 13:00",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 4,
    name: "Jim Cardenas Cruz",
    role: "OWASP Cusco - Ciberseguridad",
    bio: "Miembro de OWASP Cusco, especializado en seguridad del software y ciberseguridad. Colabora en eventos gratuitos para compartir conocimientos y fomentar el aprendizaje comunitario en la región.",
    topic: "Bootcamp - Ciberseguridad",
    day: "Viernes 12",
    time: "08:00 - 13:00",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 5,
    name: "Dante Srtdhara Quiliche Recharte",
    role: "Estudiante del 4to Semestre - DSI",
    bio: "Estudiante del cuarto semestre de la carrera Desarrollo de Sistemas de Información del IESP Túpac Amaru. Participante activo en proyectos académicos y presentaciones técnicas.",
    topic: "Ponencia Académica",
    day: "Miércoles 10",
    time: "11:30 - 12:10",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 6,
    name: "Moises Rimachi Cusi",
    role: "Estudiante del 4to Semestre - DSI",
    bio: "Estudiante del cuarto semestre de la carrera Desarrollo de Sistemas de Información del IESP Túpac Amaru. Participante en actividades académicas y desarrollo de proyectos tecnológicos.",
    topic: "Ponencia Académica",
    day: "Miércoles 10",
    time: "11:30 - 12:10",
    image: "/placeholder-speaker.jpg",
  },
];

const DAYS = ["Todos", "Miércoles 10", "Jueves 11", "Viernes 12"];

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
