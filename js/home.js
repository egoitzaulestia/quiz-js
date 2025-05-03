// home.js

// Variable con la dirección de la URL de questions.html
const urlQuestions = '/questions.html';

// // Recuperamos el id del formulario donde el usuario mete su nombre y le añadimos un evento para prevenir fallos. Luego cogemos el input que se encuentra dentro del formulario con "playerForm.querySelector('input')" y recogemos el valor introducido y lo asignamos a la variable playerName. Después nos aseguramos de que si el playerName esta vacío (!), haga return para que el usuario rellene el campo y si el campo está rellenado guardamos el valor "playerName" en el local storage para despues redirigir al usuario a questions.html.

// Formulario de inicio de juego y elemento para mensajes de validación

const playerForm = document.getElementById('playerForm');
// const messageElement = document.getElementById('message');

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Recogemos y limpiamos el nombre de jugador/a
  const playerName = document.getElementById('playerName').value.trim();

  // Validación: si está vacío, mostramos mensaje y salimos
  if (playerName === '') {
    // messageElement.innerText = 'Por favor, introduce un nombre de usuario.';
    return;
  }

  // Borramos cualquier mensaje anterior
  // messageElement.innerText = '';

  // Inicializamos la puntuación de usuario en '0' (cero patatero)
  let playerScore = 0;
  // Establecemos fecha de comienzo de de la partida
  const gameStartDate = new Date().toString(); // FORMATO: "Sat May 03 2025 14:20:15 GMT+0200 (Central European Summer Time)"

  // Cargamos usuarios existentes o array vacío
  let userData = JSON.parse(localStorage.getItem('users')) || [];

  // Generamos un ID único para este jugador
  if (userData.length > 0) {
    // Obtenemos el máximo playerId de los usuarios existentes
    const maxId = Math.max(...userData.map((user) => user.playerId));
    playerId = maxId + 1;
  } else {
    playerId = 1;
  }

  // Añadimos el nuevo jugador al array y lo guardamos en localStorage
  userData.push({ playerId, playerName, playerScore, gameStartDate });
  localStorage.setItem('users', JSON.stringify(userData));

  // Guardamos temporalmente el ID del jugador para luego actualizar la puntuación
  localStorage.setItem('currentPlayerId', playerId);

  // Redirigimos a la página de preguntas
  changeURL(urlQuestions);

  // // Redirigir a la siguiente página del juego
  // document.location.href = '/questions.html';
});

// Función para cambiar de URL sin dejar rastro en el historial
const changeURL = (url) => {
  // return window.location.href = url;
  return window.location.replace(url);
};

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
// NOTA: El siguiente código es del ejercicio de usuarios (Bootstrap y Validaciones)
// para ver como guardar los datos de los usuarios en un array
// en LocalStorage a modo de bases de datos

// const urlUsers = './users.html';

// const form = document.getElementById('formData');

// const userDataBase2 = [];

// let userId2 = 1;

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const userName = document.querySelector('#inputName').value;
//   const userEmail = document.querySelector('#inputEmail').value;
//   const userPassword = document.querySelector('#inputPassword').value;
//   const userVerifyPassword = document.querySelector(
//     '#inputVerifyPassword',
//   ).value;
//   const message = document.querySelector('#message');

//   if (
//     userName === '' ||
//     userEmail === '' ||
//     userPassword === '' ||
//     userVerifyPassword === ''
//   ) {
//     // If any field is empty, we show an launch (alert-danger) to the user in the page

//     message.className = 'alert alert-danger col-md-3';
//     message.innerHTML = 'Please fill all the fields';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//     }, 3000);
//   } else if (!validateEmail(userEmail)) {
//     // If email doesn't have  correct format, we launch an error (alert-danger)
//     message.className = 'alert alert-danger col-md-3';
//     message.innerHTML = 'Please introduce a correct email';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//     }, 3000);

//     // If invalid password, we launch an error (alert-danger)
//   } else if (!validatePassword(userPassword)) {
//     // If passwords doesn't match, we launch an error (alert-danger)
//   } else if (!passwordMatch(userPassword, userVerifyPassword)) {
//   } else {
//     message.className = 'alert alert-success col-md-3';
//     message.innerHTML = 'User created successfully';
//     form.innerHTML = '';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//       changeURL(urlUsers);
//     }, 3000);

//     let userData = JSON.parse(localStorage.getItem('users')) || [];

//     // Determine a unique userId:
//     // If there are users, take the highest current userId and increment it. Otherwise, start with 1.
//     let userId;
//     if (userData.length > 0) {
//       // Get the maximum userId from existing users
//       const maxId = Math.max(...userData.map((user) => user.userId));
//       userId = maxId + 1;
//     } else {
//       userId = 1;
//     }

//     userData.push({ userId, userName, userEmail, userPassword });

//     localStorage.setItem('users', JSON.stringify(userData));
//   }
// });

// // // URL - successChangeURL function: change the URL
// // const changeURL2 = (url) => {
// //   // return window.location.href = url;
// //   return window.location.replace(url);
// // };

// // // EMAIL - validateEmail function
// // const validateEmail = (email) => {
// //   return email.match(
// //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// //   );
// // };

// const passwordMatch = (password1, password2) => {
//   // If the passwords doesn't mathc, we launch an error (alert-danger) to the user in the page
//   if (password1 !== password2) {
//     message.className = 'alert alert-danger col-md-3';
//     message.innerHTML = 'The passwords do not match';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//     }, 3000);

//     return false;
//   } else {
//     return true;
//   }
// };

// const validatePassword = (password) => {
//   let errors = [];

//   if (password.length < 8) {
//     errors.push('Your password must be at least 8 characters');

//     message.className = 'alert alert-danger col-md-3';
//     message.innerHTML = 'Your password must be at least 8 characters';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//     }, 3000);

//     return false;
//   }

//   if (password.search(/[a-z]/i) < 0) {
//     errors.push('Your password must contain at least one letter.');

//     message.className = 'alert alert-danger col-md-3';
//     message.innerHTML = 'Your password must contain at least one letter.';

//     setTimeout(function () {
//       message.className = '';
//       message.innerHTML = '';
//     }, 3000);

//     return false;
//   }

//   if (password.search(/[0-9]/) < 0) {
//     errors.push('Your password must contain at least one digit.');
//   }

//   if (errors.length > 0) {
//     return false;
//   }

//   return true;
// };
