// results.js

// URLs
const urlHome = '/home.html';
const urlQuiz = '/questions.html';

// Referencias al DOM
const goHomeBtn = document.getElementById('goHomeBtn');
// NOTA: No borrar
// const newGameBtn = document.getElementById('newGameBtn');

// Función para cambiar de URL sin dejar rastro en el historial
const changeURL = (url) => {
  // return window.location.href = url;
  return window.location.replace(url);
};

// Listeners de botones:

// Hacemos que al clicar en el botón nos lleve a la página de inicio

goHomeBtn.addEventListener('click', () => {
  changeURL(urlHome);
});

// NOTA: No borrar
// // Hacemos que al clicar reinicia el quiz

// newGameBtn.addEventListener('click', () => {
//   changeURL(urlQuiz);
//   // document.location.href = '/home.html';
// });
