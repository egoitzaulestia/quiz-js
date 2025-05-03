// Variable con la dirección de la URL de questions.html
const urlQuestions = '/questions.html';

// // Variable que utilizaremos para...
// const userDataBase = [];

let playerId = 1;
// const gameDate = ''; // Cuando le demos a COMENZAR JUEGO, lo activaremos ---> new Date().toString()

// // Recuperamos el id del formulario donde el usuario mete su nombre y le añadimos un evento para prevenir fallos. Luego cogemos el input que se encuentra dentro del formulario con "playerForm.querySelector('input')" y recogemos el valor introducido y lo asignamos a la variable playerName. Después nos aseguramos de que si el playerName esta vacío (!), haga return para que el usuario rellene el campo y si el campo está rellenado guardamos el valor "playerName" en el local storage para despues redirigir al usuario a questions.html.

const playerForm = document.getElementById('playerForm');
playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // const input = playerForm.querySelector('input');
  // const playerName = input.value.trim();

  // Recogemos en nombre del/de la player
  const playerName = document.querySelector('#playerName').value.trim();

  // Inicializamos la puntuación de usuario en '0' (cero patatero)
  let playerScore = 0;

  // Establecemos fecha de comienzo de de la partida
  const gameDate = new Date().toString(); // FORMATO: "Sat May 03 2025 14:20:15 GMT+0200 (Central European Summer Time)"

  // NOTA: Aún sin implantar. Lo usaremos para mostrar mensajes -> validación ("Nombre de usuario ocupado! Elige otro nombre". Ejmp. Ana, Ana1, Anna...)
  // Checkearemos si el nombre existe en nuestra base de datos (es decir, en nuestro caso el LocalStorage)
  const message = document.querySelector('#message');

  // if (!playerName) { // CUIDADO! La validación más pura y estricta es la siguiente --> playerName === ''
  //   return;
  // }

  // if (playerName === '') {
  //   return;
  // }

  // // Guardar el nombre en localStorage
  // localStorage.setItem('nombreUsuario', playerName);

  if (playerName === '') {
    return;
  } else {
    let userData = JSON.parse(localStorage.getItem('users')) || [];

    // Determine a unique playerId:
    // If there are users, take the highest current playerId and increment it + 1. Otherwise, start with 1.
    let playerId;
    if (userData.length > 0) {
      // Get the maximum playerId from existing users
      const maxId = Math.max(...userData.map((user) => user.playerId));
      playerId = maxId + 1;
    } else {
      playerId = 1;
    }

    userData.push({ playerId, playerName, playerScore, gameDate });

    localStorage.setItem('users', JSON.stringify(userData));
  }

  // // Redirigir a la siguiente página del juego
  // document.location.href = '/questions.html';

  // Pasamos la URL (definida arriba) a la función para cambiar de URL
  changeURL(urlQuestions);
});

// Función para cambiar de URL
const changeURL = (url) => {
  // return window.location.href = url;
  return window.location.replace(url);
};

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

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
