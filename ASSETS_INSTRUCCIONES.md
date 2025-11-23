# Instrucciones para Assets Faltantes

## 📸 Imágenes Requeridas

### 1. Favicon

Necesitas crear y colocar los siguientes archivos en la carpeta `/public`:

#### `favicon-16x16.png`

- Dimensiones: 16x16px
- Formato: PNG
- Contenido: Logo simple de DEV WEEK o iniciales "DW"
- Colores: Morado (#61398C) y Dorado (#FBBC30)

#### `favicon-32x32.png`

- Dimensiones: 32x32px
- Formato: PNG
- Contenido: Logo simple de DEV WEEK o iniciales "DW"
- Colores: Morado (#61398C) y Dorado (#FBBC30)

#### `apple-touch-icon.png`

- Dimensiones: 180x180px
- Formato: PNG
- Contenido: Logo de DEV WEEK ISTTA más detallado
- Colores: Morado (#61398C) y Dorado (#FBBC30)

### 2. Open Graph Image

#### `og-image.jpg`

- Ubicación: `/public/og-image.jpg`
- Dimensiones: 1200x630px
- Formato: JPG (optimizado)
- Contenido debe incluir:
  - Título: "DEV WEEK 2025"
  - Subtítulo: "ISTTA - Instituto de Educación Superior Túpac Amaru"
  - Fechas: "1-5 de diciembre, 2025"
  - Badge: "50 años"
  - Fondo morado con elementos tecnológicos
  - Texto en dorado y blanco

---

## 🎨 Herramientas Sugeridas para Crear los Assets

### Opciones Online (Gratis)

1. **Canva** (https://www.canva.com)
   - Plantillas predefinidas para favicons y OG images
   - Fácil de usar
2. **Figma** (https://www.figma.com)

   - Profesional y gratuito
   - Control total sobre diseño

3. **Favicon.io** (https://favicon.io/)
   - Generador de favicon desde texto o imagen
   - Genera todos los tamaños automáticamente

### Opciones de Software

1. **Adobe Photoshop** / **Illustrator**
2. **GIMP** (gratis)
3. **Inkscape** (gratis, vectorial)

---

## 📐 Plantilla de Diseño

### Colores del Proyecto

```css
Morado principal: #61398C
Morado claro: #8B5FBF
Dorado: #FBBC30
Blanco: #FFFFFF
Plomo: #535255
```

### Tipografía

- **Títulos**: Montserrat (Bold/Extra Bold)
- **Cuerpo**: Inter (Regular/Medium)

---

## ✅ Checklist de Implementación

Después de crear los assets:

- [ ] Colocar `favicon-16x16.png` en `/public`
- [ ] Colocar `favicon-32x32.png` en `/public`
- [ ] Colocar `apple-touch-icon.png` en `/public`
- [ ] Colocar `og-image.jpg` en `/public`
- [ ] Verificar que las rutas en `index.html` sean correctas
- [ ] Probar compartiendo en redes sociales (Facebook, Twitter, WhatsApp)

---

## 🔍 Verificación

Para verificar que los assets funcionan correctamente:

1. **Favicon**: Abre la página y verifica que aparece el favicon en la pestaña del navegador
2. **OG Image**: Usa validadores como:
   - https://www.opengraph.xyz/
   - https://cards-dev.twitter.com/validator
   - https://developers.facebook.com/tools/debug/

---

## 📝 Nota Importante

Como no pude generar las imágenes automáticamente debido a limitaciones de cuota, necesitarás crearlas manualmente o con alguna de las herramientas mencionadas.

Si necesitas ayuda con las especificaciones de diseño o quieres que te guíe en el proceso de creación, házmelo saber.
