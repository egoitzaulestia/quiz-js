// // Recuperamos el id del formulario donde el usuario mete su nombre y le añadimos un evento para prevenir fallos. Luego cogemos el input que se encuentra dentro del formulario con "playerForm.querySelector('input')" y recogemos el valor introducido y lo asignamos a la variable playerName. Después nos aseguramos de que si el playerName esta vacío (!), haga return para que el usuario rellene el campo y si el campo está rellenado guardamos el valor "playerName" en el local storage para despues redirigir al usuario a questions.html.

const playerForm = document.getElementById('playerForm');
playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = playerForm.querySelector('input');
  const playerName = input.value.trim();

  if (!playerName) {
    return;
  }

  // Guardar el nombre en localStorage
  localStorage.setItem('nombreUsuario', playerName);

  // Redirigir a la siguiente página del juego
  document.location.href = '/questions.html';
});
