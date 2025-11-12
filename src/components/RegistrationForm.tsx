import { useState, useEffect, useRef, FormEvent } from 'react';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeInUp } from '../utils/animations';
import styles from './RegistrationForm.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  career: string;
  participantType: 'student' | 'guest' | '';
  sessions: string[];
  acceptTerms: boolean;
}

const SESSIONS = [
  { id: 'lunes', label: 'Lunes - Inauguración y Charlas' },
  { id: 'martes', label: 'Martes - Talleres y Workshops' },
  { id: 'miercoles', label: 'Miércoles - Bootcamp (Día Central)' },
  { id: 'jueves', label: 'Jueves - Conferencias' },
  { id: 'viernes', label: 'Viernes - Clausura y Premiación' },
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    career: '',
    participantType: '',
    sessions: [],
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, 1000);
    }

    const savedData = localStorage.getItem('devWeekFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.firstName || formData.email) {
      localStorage.setItem('devWeekFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'La institución es obligatoria';
    }

    if (!formData.participantType) {
      newErrors.participantType = 'Selecciona el tipo de participante';
    }

    if (formData.sessions.length === 0) {
      newErrors.sessions = 'Selecciona al menos una sesión';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        localStorage.removeItem('devWeekFormData');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          institution: '',
          career: '',
          participantType: '',
          sessions: [],
          acceptTerms: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSessionToggle = (sessionId: string) => {
    setFormData(prev => ({
      ...prev,
      sessions: prev.sessions.includes(sessionId)
        ? prev.sessions.filter(s => s !== sessionId)
        : [...prev.sessions, sessionId]
    }));
  };

  return (
    <section ref={sectionRef} className={styles.section} id="registro">
      <div className={styles.container}>
        <div className={styles.header}>
          <UserPlus className={styles.icon} size={32} />
          <h2 className={styles.title}>Inscripción</h2>
          <p className={styles.description}>
            Completa el formulario para asegurar tu lugar en DEV WEEK 2025
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className={styles.successMessage}>
            <CheckCircle size={48} />
            <h3>¡Registro Exitoso!</h3>
            <p>
              Hemos recibido tu inscripción. Revisa tu correo electrónico para más detalles.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="firstName" className={styles.label}>
                  Nombre *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <span id="firstName-error" className={styles.error} role="alert">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName" className={styles.label}>
                  Apellido *
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && (
                  <span id="lastName-error" className={styles.error} role="alert">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.error} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="institution" className={styles.label}>
                  Institución *
                </label>
                <input
                  type="text"
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                  className={`${styles.input} ${errors.institution ? styles.inputError : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.institution}
                  aria-describedby={errors.institution ? 'institution-error' : undefined}
                />
                {errors.institution && (
                  <span id="institution-error" className={styles.error} role="alert">
                    {errors.institution}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="career" className={styles.label}>
                  Carrera
                </label>
                <input
                  type="text"
                  id="career"
                  value={formData.career}
                  onChange={(e) => setFormData(prev => ({ ...prev, career: e.target.value }))}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo de Participante *</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="participantType"
                    value="student"
                    checked={formData.participantType === 'student'}
                    onChange={(e) => setFormData(prev => ({ ...prev, participantType: e.target.value as 'student' }))}
                    className={styles.radio}
                  />
                  Estudiante
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="participantType"
                    value="guest"
                    checked={formData.participantType === 'guest'}
                    onChange={(e) => setFormData(prev => ({ ...prev, participantType: e.target.value as 'guest' }))}
                    className={styles.radio}
                  />
                  Invitado
                </label>
              </div>
              {errors.participantType && (
                <span className={styles.error} role="alert">
                  {errors.participantType}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Sesiones a las que asistirás *</label>
              <div className={styles.checkboxGroup}>
                {SESSIONS.map(session => (
                  <label key={session.id} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.sessions.includes(session.id)}
                      onChange={() => handleSessionToggle(session.id)}
                      className={styles.checkbox}
                    />
                    {session.label}
                  </label>
                ))}
              </div>
              {errors.sessions && (
                <span className={styles.error} role="alert">
                  {errors.sessions}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                  className={styles.checkbox}
                  aria-required="true"
                />
                Acepto los términos y condiciones *
              </label>
              {errors.acceptTerms && (
                <span className={styles.error} role="alert">
                  {errors.acceptTerms}
                </span>
              )}
            </div>

            <div className={styles.recaptchaPlaceholder}>
              <p>
                <AlertCircle size={16} />
                reCAPTCHA se integrará aquí
              </p>
            </div>

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                <AlertCircle size={20} />
                <span>
                  Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? 'Enviando...' : 'Completar Inscripción'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrationForm;
