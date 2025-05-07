![Juegilandia](./images/juaguilandia.png)

# Juegilandia Quiz

Aplicación web tipo Quiz interactivo que presenta al usuario 10 preguntas de opción múltiple, con una única respuesta correcta. Las preguntas se obtienen de forma dinámica desde la API pública OpenTDB.

El objetivo es evaluar conocimientos de forma entretenida y registrar el rendimiento del usuario a lo largo del tiempo.

## Tecnologías empleadas:

- **HTML5:** Maquetación semántica y responsive
- **CSS3:** Lógica, asincronía, manipulación DOM
- **JavaScript ES6:** Consumo de API externa de preguntas
- **LocalStorage:** Persistencia de partidas jugadas
- **Fetch API:** Visualización gráfica del rendimiento

# Objetivos didácticos:

- Diseñar y desarrollar una SPA (Single Page Application) con JS puro.

- Consumir y procesar datos de una API externa de manera asíncrona.

- Manipular el DOM de forma dinámica.

- Almacenar y visualizar datos persistentes usando LocalStorage.

- Aplicar buenas prácticas de desarrollo: modularidad, semántica, control de versiones, responsive design, etc.

# Estructura de la aplicación:

- home.html – Página de bienvenida con historial de las últimas jugadas y gráfica de resultados.

- question.html – SPA principal donde se muestra una pregunta a la vez.

- results.html – Muestra el resultado final del usuario tras finalizar el Quiz y ranking de últimas jugadas.

# Funcionalidades principales:

- Single Page Application (SPA) para una experiencia fluida.

- Preguntas aleatorias desde OpenTDB.

- Gráfica de rendimiento basada en partidas anteriores.

- Persistencia de datos en LocalStorage (puntaje y fecha).

- Diseño responsive, mobile-first.

- Reinicio y navegación entre partidas.

## Mockups del diseño

**Versión Escritorio:**

![Versión Escritorio](./images/Mockup%20PC.png)

**Versión Móvil:**

![Versión Escritorio](./images/Mockup%20Movil.png)

## Autores:

- [@AinhoaColorado](https://github.com/AinhoaColorado)

- [@egoitzaulestia](https://github.com/egoitzaulestia)

## Créditos:

- Preguntas externas proporcionadas por [Open Trivia Database](https://opentdb.com/)
