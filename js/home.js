// Recuperamos el botón de la tarjeta de la página Home

const startGameBtn = document.getElementById('startGameBtn');

// Hacemos que al clicar en el botón nos lleve a la página de las preguntas

startGameBtn.addEventListener('click', () => {
  document.location.href = '/questions.html';
});
