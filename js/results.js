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
  return window.location.replace(url);
};

// Listeners de botones:

// Hacemos que al clicar en el botón nos lleve a la página de inicio

goHomeBtn.addEventListener('click', () => {
  // localStorage.removeItem('currentPlayerId');
  changeURL(urlHome);
});

// NOTA: No borrar
// // Hacemos que al clicar reinicia el quiz

newGameBtn.addEventListener('click', () => {
  changeURL(urlQuiz);
  // document.location.href = '/home.html';
});

// Leer del local storage el nombre de usuario y el score del ultimo jugador del array de USERS del localStorage:

//recuperamos del local storage el array 'users' y como nos devuelve un string, lo pasamos a objeto con JSON.parse y lo metemos en una variable.

const users = JSON.parse(localStorage.getItem('users'));

//recuperamos del DOM el ID del <p> 'userResult' donde insertaremos la puntuación del usuario y lo metemos en una variable.

const userResultParagraph = document.getElementById('userResult');

//recuperamos del DOM el ID del <h1> 'userNameh1' donde insertaremos la puntuación del usuario y lo metemos en una variable.

const userNameh1 = document.getElementById('userNameh1');

// Le decimos que si (if) users Y (&&) la longitud de users es mayor que 0, nos haga: primero, que nos coja el último usuario que ha jugado a nuestro juego con 'users[users.length - 1];'
// y lo meta en la variable 'currentUser'. Luego, le decimos que en las variables que hemos creado arriba 'userNameh1' y 'userResult' nos haga un innerText para meter los valores recogidos.

if (users && users.length > 0) {
  const currentUser = users[users.length - 1];
  userNameh1.innerText = `${currentUser.playerName} ha conseguido una puntuación de:`;
  userResultParagraph.innerText = `${currentUser.playerScore}/10`;
} else {
  userResultParagraph.innerText = 'No se encontraron resultados.';
}
