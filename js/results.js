// Recuperamos el botón de la tarjeta de la página Results

const newGameBtn = document.getElementById('newGameBtn');

// Hacemos que al clicar en el botón nos lleve a la página de inicio

newGameBtn.addEventListener('click', () => {
  document.location.href = '/home.html';
});
