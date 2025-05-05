// questions.js

// Función para obtener preguntas de la API de Open Trivia DB
const getQuestions = async () => {
  try {
    const res = await axios.get('https://opentdb.com/api.php?amount=10');
    return res.data.results; // Devuelve un array de objetos pregunta
  } catch (error) {
    console.error(`Error al obtener preguntas: ${error}`);
    return [];
  }
};

// Función para decodificar entidades HTML (&quot;, &#039;) en texto legible
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Función para mezclar un array in-place usando Fisher-Yates
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Función para formatear el array de preguntas crudas
// Recibe un array de objetos con { question, correct_answer, incorrect_answers, ... }
const formatQuizQuestions = (rawQuestions) => {
  return rawQuestions.map((q) => {
    // Decodificar el texto de la pregunta
    const questionText = decodeHtml(q.question);

    // Crear un array de respuestas con flag de correcto/falso
    const answers = q.incorrect_answers.map((a) => ({
      label: decodeHtml(a),
      isCorrect: false,
    }));
    answers.push({ label: decodeHtml(q.correct_answer), isCorrect: true });

    // Mezclar respuestas
    shuffleArray(answers);

    return {
      question: questionText,
      answers,
      type: q.type,
      difficulty: q.difficulty,
      category: q.category,
    };
  });
};

// Variables de estado:
let formattedQuestions = [];
let score = 0;
let currentQuestionIndex = 0;

let currentAnswerButtonsDiv;

// Referencias al DOM
const questionCardHtml = document.getElementById('questionCard');
const nextButton = document.getElementById('nextBtn');
const goHomeBtn = document.getElementById('goHomeBtn');
const showResultsBtn = document.getElementById('showResultsBtn');

// Función para inciar el quiz
const startQuiz = () => {
  score = 0;
  currentQuestionIndex = 0;

  // Ocultar botones de navegación hasta que se necesiten
  nextButton.classList.add('hid');
  goHomeBtn.classList.add('hide');
  showResultsBtn.classList.add('hide');

  // Mostrar el contenedor de la pregunta
  questionCardHtml.classList.remove('hide');

  // Montrar la primera pregunta
  setNextQuestion();
};

// Función para mostrar una pregunta y sus opciones
const showQuestion = (item) => {
  // Limpiar cualquier contenido previo
  // questionCardHtml.innerHTML = '';

  // Crear y añadir el título de la pregunta
  const h2 = document.createElement('h2');
  h2.innerText = item.question;
  questionCardHtml.appendChild(h2);

  // Crear contenedor para botones de respuesta
  const divAnswers = document.createElement('div');
  divAnswers.id = 'answerButtons';

  // Crear un botón por cada opción
  item.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.innerText = answer.label;
    // Marcar dataset si es la respuesta correcta
    if (answer.isCorrect) {
      button.dataset.value = true;
    }

    // Al hacer clic, procesar la selección
    button.addEventListener('click', () => {
      selectAnswer(divAnswers, answer.isCorrect);
      // console.log(button.innerText);
    });

    divAnswers.appendChild(button);
  });

  // console.log(`Score: ${score}`);

  questionCardHtml.appendChild(divAnswers);
};

// Función para pasas a la siguiente pregunta tras resetear el estado
const setNextQuestion = () => {
  resetState();
  // nextButton.classList.add('hide');
  showQuestion(formattedQuestions[currentQuestionIndex]);
};

// Función que quita todo el contenido previo para preparar la siguiente pregunta
const resetState = () => {
  nextButton.classList.add('hide');
  questionCardHtml.innerHTML = '';
};

// Fucnión que aplica clase según correcta/incorrecta
const setStatusClass = (element) => {
  if (element.dataset.value) {
    element.classList.add('color-correct');
  } else {
    element.classList.add('color-wrong');
  }
};

// Función que maneja la selección de respuesta
const selectAnswer = (answerContainer, isCorrect) => {
  // Si la respuesta es correcta, incrementa el score + 1
  if (isCorrect) score++;

  // Deshabilita y marca cada botón según su dataset.correct
  Array.from(answerContainer.children).forEach((btn) => {
    setStatusClass(btn);
    btn.disabled = true; // evita re-click
  });

  // Si quedan preguntas, muestra "Siguiente"; si no, muestra Home/Results
  if (currentQuestionIndex < formattedQuestions.length - 1) {
    nextButton.classList.remove('hide');
  } else {
    goHomeBtn.classList.remove('hide');
    showResultsBtn.classList.remove('hide');

    // Actualiza el score en localStorage para el jugador actual
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentId = parseInt(localStorage.getItem('currentPlayerId'), 10);
    const idx = users.findIndex((u) => u.playerId === currentId);
    if (idx !== -1) {
      users[idx].playerScore = score;
      users[idx].gameEndDate = new Date().toString();
      localStorage.setItem('users', JSON.stringify(users));
    }

    localStorage.removeItem('currentPlayerId');
    localStorage.setItem('score', score);
  }
};

// Listeners de botones:
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Esto hace que al clicar en el botón "ver resultados" se redirija al usuario a la página html results.
showResultsBtn.addEventListener('click', () => {
  window.location.href = '/results.html';
});

// Esto hace que al clicar en el botón "volver a empezar" se redirija al usuario a la página html home.
goHomeBtn.addEventListener('click', () => {
  window.location.href = '/home.html';
});

getQuestions()
  .then((rawQuestions) => {
    formattedQuestions = formatQuizQuestions(rawQuestions);
    startQuiz();
  })
  .catch((error) => {
    console.error(`No se pudieron cargar las preguntas; ${error}`);
  });
