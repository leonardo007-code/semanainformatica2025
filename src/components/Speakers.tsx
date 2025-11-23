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
    name: "Ana García",
    role: "Senior Developer en Google",
    bio: "Experta en arquitectura de software con 10 años de experiencia",
    topic: "Microservicios Modernos",
    day: "Lunes",
    time: "10:00 AM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Tech Lead en Microsoft",
    bio: "Especialista en cloud computing y DevOps automation",
    topic: "Azure y DevOps",
    day: "Lunes",
    time: "2:00 PM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 3,
    name: "María López",
    role: "UX Designer en Airbnb",
    bio: "Diseñadora centrada en experiencia de usuario y accesibilidad",
    topic: "Diseño Inclusivo",
    day: "Martes",
    time: "11:00 AM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 4,
    name: "Roberto Silva",
    role: "CTO en Startup Tech",
    bio: "Emprendedor tecnológico y mentor de startups innovadoras",
    topic: "Emprendimiento Tech",
    day: "Martes",
    time: "3:00 PM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 5,
    name: "Laura Ramirez",
    role: "AI Engineer en OpenAI",
    bio: "Investigadora en inteligencia artificial y machine learning",
    topic: "IA Generativa",
    day: "Miércoles",
    time: "9:00 AM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 6,
    name: "Diego Torres",
    role: "Security Expert",
    bio: "Especialista en ciberseguridad y ethical hacking",
    topic: "Seguridad Web",
    day: "Jueves",
    time: "10:00 AM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 7,
    name: "Patricia Vega",
    role: "Data Scientist en Amazon",
    bio: "Analista de datos con enfoque en big data y analytics",
    topic: "Big Data Analytics",
    day: "Jueves",
    time: "2:00 PM",
    image: "/placeholder-speaker.jpg",
  },
  {
    id: 8,
    name: "Javier Ruiz",
    role: "Mobile Developer Lead",
    bio: "Desarrollador móvil experto en React Native y Flutter",
    topic: "Desarrollo Móvil",
    day: "Viernes",
    time: "11:00 AM",
    image: "/placeholder-speaker.jpg",
  },
];

const DAYS = ["Todos", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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
