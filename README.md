# Glampur Camping · Web interactiva con JavaScript

Web de un camping de lujo en Asturias, con bungalows y alquiler de furgonetas camper. El contenido (carruseles, galería, servicios y preguntas frecuentes) se carga dinámicamente desde archivos JSON, e incluye una calculadora de presupuesto y un mapa con la ruta hasta el camping.

Proyecto final del módulo de JavaScript del ciclo de **Técnico Superior en Desarrollo de Aplicaciones Web**.

## Demo en vivo

**https://drfrodorick.github.io/Marcelino_Ramos_trabajoJAVASCRIPT/**

## Funcionalidades

- **Contenido dinámico desde JSON:** carrusel de portada, galería, servicios y preguntas frecuentes se generan con `fetch()` a partir de los archivos de `data/`. Para añadir un servicio o una foto basta con editar el JSON, sin tocar el HTML.
- **Carruseles y galería** con navegación por botones y cambio automático de imagen.
- **Preguntas frecuentes** en tarjetas que se giran al pasar el ratón.
- **Calculadora de presupuesto:** calcula el precio según el alojamiento, los extras elegidos y los descuentos por duración de la estancia.
- **Validación de formularios** con expresiones regulares (nombre, teléfono y email) y aceptación obligatoria de condiciones.
- **Mapa interactivo** con Leaflet y OpenStreetMap que calcula la ruta desde la ubicación del usuario hasta el camping.
- **Diseño responsive** adaptado a móvil, tablet y escritorio.

## Tecnologías

- HTML5 semántico y CSS3 (Flexbox, Grid, animaciones y media queries)
- JavaScript (ES6+): `fetch`, manipulación del DOM, eventos y expresiones regulares
- [Leaflet](https://leafletjs.com/) y Leaflet Routing Machine para el mapa y las rutas
- Publicado con GitHub Pages

## Estructura

```
├── index.html          # Portada
├── views/              # Galería, presupuesto, contacto y aviso legal
├── css/styles.css      # Estilos
├── js/                 # main.js (portada), galeria.js, formulario.js (presupuesto), contacto.js (mapa)
├── data/               # Contenido en JSON
└── assets/             # Imágenes y favicon
```

## Ejecutarlo en local

Como el contenido se carga con `fetch()`, la web necesita un servidor (abrir el `index.html` con doble clic no carga los JSON). Con VS Code, la forma más sencilla es la extensión **Live Server**: clic derecho sobre `index.html` → *Open with Live Server*.

## Autor

**Marcelino Ramos Martínez** · Desarrollador Web Junior
[GitHub](https://github.com/DrFrodorick) · [LinkedIn](https://www.linkedin.com/in/marcelino-ramos-martinez-0b4178262/)
