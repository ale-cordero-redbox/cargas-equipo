# Panel de Cargas — RedBox

## Qué es esto
Dashboard de cargas del equipo de diseño, con:
- Estado por persona, timeline de proyectos, tabla filtrable
- Registro semanal de horas por proyecto
- Editor de datos accesible para todo el equipo (sin contraseña)

## Estructura
- `public/index.html` — el sitio (todo el dashboard)
- `netlify/functions/data.js` — función que lee/escribe los datos compartidos (Netlify Blobs)
- `netlify.toml` — configuración de Netlify
- `package.json` — dependencia `@netlify/blobs`

## Cómo publicarlo
Ver las instrucciones que te dio Claude en el chat (paso a paso con GitHub + Netlify).
