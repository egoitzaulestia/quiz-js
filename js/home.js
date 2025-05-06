// home.js

// Variable con la dirección de la URL de questions.html
const urlQuiz = '/questionsCopy.html';

// Formulario de inicio de juego y elemento para mensajes de validación

// Referencia al formulario y al input de nombre
const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('playerName');
// const messageElement = document.getElementById('message');

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Recogemos y limpiamos el nombre de jugador/a
  const name = playerNameInput.value.trim();

  // Validación: si está vacío, mostramos mensaje y salimos
  if (playerName === '') {
    // messageElement.innerText = 'Por favor, introduce un nombre de usuario.';
    return;
  }

  // Cargar o inicializar los arrays de player y sessions
  const players = JSON.parse(localStorage.getItem('players')) || [];
  const sessions = JSON.parse(localStorage.getItem('sessions')) || [];

  // Buscamos si ya existe el/la jugador/a, si no crear uno nuevo
  let player = players.find((p) => p.name === name);

  if (!player) {
    const newId = players.length
      ? Math.max(...players.map((p) => p.id)) + 1
      : 1;
    player = { id: newId, name };
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  }

  // Guardar el playerId actual para usarlo en question.js
  localStorage.setItem('currentPlayerId', player.id);

  // Registramos la fecha/hora de inicio de sesión
  localStorage.setItem('gameStart', new Date().toISOString());

  // Redirigimos al quis
  changeURL(urlQuiz);
});

// Función para cambiar de URL sin dejar rastro en el historial
const changeURL = (url) => {
  // return window.location.href = url;
  return window.location.replace(url);
};

// Mostrar historial de partidas
const players = JSON.parse(localStorage.getItem('players')) || [];
const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
const gamesList = document.getElementById('gamesList');

if (sessions.length && gamesList) {
  // Ordenamos cronológicamente
  sessions.sort((a, b) => new Date(b.end) - new Date(a.end));

  // Nos quedamos con los 5 primeros elementos
  const recentFive = sessions.slice(0, 5);

  // Ireramos sobre el sub-array recentFive
  recentFive.forEach((sess) => {
    const player = players.find((p) => p.id === sess.playerId);
    const name = player ? player.name : 'Jugador/a';
    const when = new Date(sess.end).toLocaleString();

    const li = document.createElement('li');
    li.innerText = `${name} - ${sess.score}/10 - ${when}`;
    gamesList.appendChild(li);

    if (sessions.length === 5) {
      return;
    }
  });
}

// const ctx = document.getElementById('scoreChart').getContext('2d');

// const totals = {};
// sessions.forEach((s) => {
//   totals[s.playersId] = (totals[s.playerId] || 0) + s.score;
// });
// const labels = players.map((p) => p.name);
// const data = players.map((p) => totals[p.id] || 0);

// new Chart(ctx, {
//   type: 'line',
//   data: {
//     // asume sesiones ordenadas cronológicamente
//     labels: sessions.map((_, i) => `Game ${i + 1}`),
//     datasets: players.map((p) => ({
//       label: p.name,
//       data: sessions.filter((s) => s.playerId === p.id).map((s) => s.score),
//       fill: false,
//       tension: 0.3,
//     })),
//   },
//   options: {
//     scales: { y: { beginAtZero: true, max: 10 } },
//   },
// });

const ctx = document.getElementById('scoreChart').getContext('2d');

// Totales por jugador
const totals = {};
sessions.forEach((s) => {
  totals[s.playerId] = (totals[s.playerId] || 0) + s.score;
});

// Prepara, ordena y recorta a 5
const entries = players
  .map((p) => ({ name: p.name, score: totals[p.id] || 0 }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 5); // ← sólo los top 5

const labels = entries.map((e) => e.name);
const data = entries.map((e) => e.score);

// Colores de cada barra (fondo y borde)
const backgroundColors = [
  '#EF4786',
  '#7EDACA',
  '#FCE74A',
  '#FF8BBD',
  '#66B2FF',
];
const borderColors = backgroundColors;

// Crea el gráfico vertical
new Chart(ctx, {
  type: 'bar',
  data: {
    labels,
    datasets: [
      {
        label: 'Puntuación total',
        data,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: borderColors.slice(0, labels.length),
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data, 10),
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '🏆 Clasificación general (Top 5)',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} pt${ctx.parsed.y === 1 ? '' : 's'}`,
        },
      },
    },
  },
});

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
