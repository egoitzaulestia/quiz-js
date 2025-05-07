// home.js

// Variable con la dirección de la URL de questions.html
const urlQuiz = '/questions.html';

// Referencias al DOM
// Referencia al formulario y al input de nombre
const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('playerName');
const inputBox = document.getElementById('playerName');
const messageElement = document.getElementById('message');

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Recogemos y limpiamos el nombre de jugador/a
  const name = playerNameInput.value.trim();

  // Validamos que el/la jugador/a introduduza el nombre
  if (!validateName(name)) {
  } else {
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
  }
});

// Función para cambiar de URL sin dejar rastro en el historial
const changeURL = (url) => {
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

// Función para validar el campo del nombre: Verfica que no esté vacío
const validateName = (name) => {
  if (name === '') {
    messageElement.className = 'alert-danger';
    messageElement.innerText = 'Introduce un nombre';

    inputBox.classList.add('alert-border-line');

    setTimeout(function () {
      messageElement.className = '';
      messageElement.innerHTML = '';
      inputBox.classList.remove('alert-border-line');
    }, 3000);

    return false;
  } else {
    return true;
  }
};
