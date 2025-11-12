# DEV WEEK 2025 - ISTTA

Página web single-page para el evento estudiantil anual **DEV WEEK**, organizado por la carrera de Desarrollo de Sistemas de Información del Instituto de Educación Superior Túpac Amaru (ISTTA).

## 📅 Evento

- **Fechas:** 1 - 5 de diciembre de 2025
- **Institución:** ISTTA (50° Aniversario)
- **Organizador:** Carrera de Desarrollo de Sistemas de Información

## 🚀 Tecnologías

- **React 18** con TypeScript
- **Vite** como build tool
- **Tailwind CSS** para estilos base
- **CSS Modules** para componentes específicos
- **anime.js** para animaciones fluidas
- **Lucide React** para iconografía

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Hero.tsx         # Sección principal con CTA
│   ├── DateCounter.tsx  # Calendario de la semana
│   ├── Bootcamp.tsx     # Banner del bootcamp
│   ├── Speakers.tsx     # Ponentes con filtrado
│   ├── LiveStreams.tsx  # Transmisiones con modal
│   ├── RegistrationForm.tsx  # Formulario de inscripción
│   ├── Sponsors.tsx     # Sponsors e institucional
│   └── Footer.tsx       # Pie de página
├── utils/
│   └── animations.js    # Funciones de anime.js
├── __tests__/           # Tests unitarios
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globales y variables CSS
```

## 🎨 Paleta de Colores

El proyecto utiliza variables CSS para mantener consistencia:

```css
--morado: #61398C    /* Color principal */
--plomo: #535255     /* Secundario / neutral */
--dorado: #FBBC30    /* Acento / aniversario */
--blanco: #FFFFFF
--negro: #000000
--gris-1: #F5F5F5
```

**Importante:** NUNCA uses colores hardcoded en componentes. Siempre usa las variables CSS.

## ✨ Animaciones

Las animaciones están implementadas con **anime.js** en `src/utils/animations.js`:

### Funciones Disponibles

- `enterStagger(target, delay)` - Entrada escalonada con fade + translateY
- `hoverLift(target)` - Elevación sutil en hover
- `pulseAccent(target)` - Pulso continuo para destacar elementos
- `fadeInUp(target, duration)` - Fade + slide up
- `slideInLeft(target, duration)` - Slide desde la izquierda
- `scaleIn(target, duration)` - Escala con efecto elástico
- `batchHoverLift(selector)` - Aplica hover a múltiples elementos

### Uso en Componentes

```tsx
import { useEffect, useRef } from 'react';
import { fadeInUp, pulseAccent } from '../utils/animations';

const MyComponent = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    fadeInUp(elementRef.current, 800);
    pulseAccent('.accent-badge');
  }, []);

  return <div ref={elementRef}>...</div>;
};
```

### Accesibilidad

Las animaciones respetan `prefers-reduced-motion`. Usuarios con esta preferencia verán animaciones reducidas o desactivadas.

## 📝 Formulario de Registro

### Validaciones Incluidas

- Nombre y apellido: requeridos
- Email: formato válido
- Tipo de participante: requerido
- Sesiones: al menos una seleccionada
- Términos: debe aceptarse

### LocalStorage

El formulario guarda automáticamente el progreso en localStorage para recuperarlo si el usuario recarga la página.

### Endpoint de Registro

Mock endpoint: `POST /api/register`

**Payload esperado:**

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@email.com",
  "institution": "Universidad XYZ",
  "career": "Ingeniería de Software",
  "participantType": "student",
  "sessions": ["lunes", "miercoles", "viernes"],
  "acceptTerms": true
}
```

## 📺 Transmisiones en Vivo

### Configuración

Las URLs de transmisión están en `src/components/LiveStreams.tsx`:

```tsx
const STREAMS = [
  {
    id: 1,
    title: 'Título del stream',
    url: 'https://www.youtube.com/embed/VIDEO_ID',
    platform: 'YouTube',
    // ... otros campos
  }
];
```

### Plataformas Soportadas

- **YouTube:** Usa formato embed `https://www.youtube.com/embed/VIDEO_ID`
- **Twitch:** Usa formato `https://player.twitch.tv/?channel=CHANNEL_NAME`

## 🎤 Ponentes

Los datos de ponentes están en `src/components/Speakers.tsx` en el array `SPEAKERS_DATA`.

Para agregar un ponente:

```tsx
{
  id: 9,
  name: 'Nombre Completo',
  role: 'Cargo en Empresa',
  bio: 'Bio corta de 20-25 palabras máximo',
  topic: 'Tema de la charla',
  day: 'Lunes',  // o Martes, Miércoles, etc.
  time: '10:00 AM',
  image: '/placeholder-speaker.jpg'
}
```

## 🖼️ Assets & Placeholders

### Logos

- Logo ISTTA: reemplazar en `Hero.tsx`
- Actualmente usa un placeholder con texto "ISTTA"

### Imágenes de Ponentes

- Ruta esperada: `/public/placeholder-speaker.jpg`
- Las iniciales se muestran si no hay imagen

### Sponsors

- Placeholders en `Sponsors.tsx`
- Reemplaza con logos reales en producción

## 🔧 Integraciones Sugeridas

### Google Analytics

Agregar en `index.html` antes del `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### reCAPTCHA

1. Obtén las keys en [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Instala: `npm install react-google-recaptcha`
3. Reemplaza el placeholder en `RegistrationForm.tsx`

```tsx
import ReCAPTCHA from 'react-google-recaptcha';

<ReCAPTCHA
  sitekey="YOUR_SITE_KEY"
  onChange={handleRecaptcha}
/>
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage
```

Tests incluidos:
- `RegistrationForm.test.tsx` - Renderizado del formulario
- `LiveStreams.test.tsx` - Modal de transmisiones

## 🎯 Características Destacadas

✅ **Responsive Design** - Móvil, tablet y desktop
✅ **Animaciones Fluidas** - Con anime.js
✅ **Accesibilidad** - ARIA labels, navegación por teclado
✅ **SEO Optimizado** - Meta tags y Open Graph
✅ **Validación de Forms** - Cliente-side con feedback
✅ **Modal Accesible** - Focus trap y ESC para cerrar
✅ **Variables CSS** - Paleta centralizada
✅ **TypeScript** - Type-safe components

## 📱 Breakpoints

- **Móvil:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚨 Notas Importantes

1. **Nunca uses colores inline** - Siempre usa variables CSS
2. **Respeta prefers-reduced-motion** - Ya implementado en animations.js
3. **Mantén componentes pequeños** - Refactoriza si excede 300 líneas
4. **Tests son importantes** - Agrega tests para nuevas features

## 📞 Contacto

Instituto de Educación Superior Túpac Amaru
- Web: [https://www.istta.edu.pe/](https://www.istta.edu.pe/)
- Email: contacto@istta.edu.pe

---

**Desarrollado por estudiantes de Desarrollo de Sistemas de Información - ISTTA**

🎉 Celebrando 50 años de excelencia educativa
