// results.js

// URLs
const urlHome = '/homeCopy.html';
const urlQuiz = '/questionsCopy.html';

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
  changeURL(urlHome);
});

newGameBtn.addEventListener('click', () => {
  changeURL(urlQuiz);
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
  userNameh1.innerHTML = `<span class="player-name">${playerName}</span> ha conseguido una puntuación de:`;
  userResultP.innerText = `${lastSession.score}`;
} else {
  userNameh1.innerText = `${playerName}`;
  userResultP.innerText = 'No se encontró ninguna partida';
}

// Referencia a la tabla (ya debe existir en el DOM)
const rankingTable = document.querySelector('#rankingCard table');

if (players.length > 0) {
  // Generar array de estadísticas por jugador
  const stats = players.map((p) => {
    const pSes = sessions.filter((s) => s.playerId === p.id);
    const totalPuntos = pSes.reduce((sum, s) => sum + s.score, 0);
    const partidas = pSes.length;

    // Reducir el nombre a los 3 primeros caracteres
    const nombreCorto = p.name.slice(0, 3);

    return { id: p.id, name: nombreCorto, totalPuntos, partidas };
  });

  // Ordenar por totalPuntos descendente
  stats.sort((a, b) => b.totalPuntos - a.totalPuntos);

  // Tomar sólo los top 10
  const top10 = stats.slice(0, 10);

  // Añadir cada fila al <table>
  top10.forEach((st, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${st.totalPuntos}</td>
      <td>${st.name}</td>
      <td>${st.partidas}</td>
    `;
    rankingTable.appendChild(tr);
  });
}
