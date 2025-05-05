// results.js

// URLs
const urlHome = '/homeCopy.html';
const urlQuiz = '/questions.html';

// Referencias al DOM
const goHomeBtn = document.getElementById('goHomeBtn');
const newGameBtn = document.getElementById('newGameBtn');
const userNameh1 = document.getElementById('userNameh1');
const userResultP = document.getElementById('userResult');

// Función para cambiar de URL sin dejar rastro en el historial
const changeURL = (url) => {
  return window.location.replace(url);
};

// Listeners de botones:

goHomeBtn.addEventListener('click', () => {
  // localStorage.removeItem('currentPlayerId');
  changeURL(urlHome);
});

newGameBtn.addEventListener('click', () => {
  changeURL(urlQuiz);
  // document.location.href = '/home.html';
});

// Cargar arrays desde localStorage
const players = JSON.parse(localStorage.getItem('players')) || [];
const sessions = JSON.parse(localStorage.getItem('sessions')) || [];

// Obtener el ID del jugador actual
const currentId = parseInt(localStorage.getItem('currentPlayerId'), 10);

// Buscar nombre del jugador
const player = players.find((p) => p.id === currentId);
const playerName = player ? player.name : 'Jugador/a';

// Filtrar solo las sesioses de este jugador
const mySessions = sessions.filter((s) => s.playerId === currentId);

// Obtener la última sesión jugada
const lastSession = mySessions.length
  ? mySessions[mySessions.length - 1]
  : null;

// Mostrar en pantall
if (lastSession) {
  userNameh1.innerText = `${playerName} ha conseguido una puntuación de:`;
  userResultP.innerText = `${lastSession.score}`;
} else {
  userNameh1.innerText = `${playerName}`;
  userResultP.innerText = 'No se encontró ninguna partida';
}

// // Leer del local storage el nombre de usuario y el score del ultimo jugador del array de USERS del localStorage:

// //recuperamos del local storage el array 'users' y como nos devuelve un string, lo pasamos a objeto con JSON.parse y lo metemos en una variable.

// const users = JSON.parse(localStorage.getItem('users'));

// //recuperamos del DOM el ID del <p> 'userResult' donde insertaremos la puntuación del usuario y lo metemos en una variable.

// const userResultParagraph = document.getElementById('userResult');

// //recuperamos del DOM el ID del <h1> 'userNameh1' donde insertaremos la puntuación del usuario y lo metemos en una variable.

// // Le decimos que si (if) users Y (&&) la longitud de users es mayor que 0, nos haga: primero, que nos coja el último usuario que ha jugado a nuestro juego con 'users[users.length - 1];'
// // y lo meta en la variable 'currentUser'. Luego, le decimos que en las variables que hemos creado arriba 'userNameh1' y 'userResult' nos haga un innerText para meter los valores recogidos.

// if (users && users.length > 0) {
//   const currentUser = users[users.length - 1];
//   userNameh1.innerText = `${currentUser.playerName} ha conseguido una puntuación de:`;
//   userResultParagraph.innerText = `${currentUser.playerScore}/10`;
// } else {
//   userResultParagraph.innerText = 'No se encontraron resultados.';
// }
