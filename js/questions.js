// questions.js

// Preguntas
const dataQuiz = {
  response_code: 0,
  results: [
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Politics',
      question: 'What year did Gerald Ford Become President?',
      correct_answer: '1974',
      incorrect_answers: ['1977', '1973', '1969'],
    },
    {
      type: 'boolean',
      difficulty: 'easy',
      category: 'Geography',
      question:
        'There is an island in Japan called Ōkunoshima, A.K.A. &quot;Rabbit Island&quot;, so named because of it&#039;s huge population of rabbits.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Geography',
      question: 'Which country has three capital cities?',
      correct_answer: 'South Africa',
      incorrect_answers: ['Somalia', 'China', 'United Kingdom'],
    },
    {
      type: 'multiple',
      difficulty: 'hard',
      category: 'Science: Computers',
      question:
        'Lenovo acquired IBM&#039;s personal computer division, including the ThinkPad line of laptops and tablets, in what year?',
      correct_answer: '2005',
      incorrect_answers: ['1999', '2002', '2008'],
    },
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Entertainment: Video Games',
      question:
        'Gordon Freeman is said to have burnt and destroyed what food in the break room microwave?',
      correct_answer: 'Casserole',
      incorrect_answers: ['Sub Sandwich', 'Chicken Soup', 'Pepperoni Pizza'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'General Knowledge',
      question:
        'Which of these is the name of a Japanese system of alternative medicine, literally meaning &quot;finger pressure&quot;?',
      correct_answer: 'Shiatsu',
      incorrect_answers: ['Ukiyo', 'Majime', 'Ikigai'],
    },
    {
      type: 'multiple',
      difficulty: 'easy',
      category: 'Art',
      question:
        'Which Van Gogh painting depicts the view from his asylum in Saint-R&eacute;my-de-Provence in southern France?',
      correct_answer: 'The Starry Night',
      incorrect_answers: [
        'Wheatfields with Crows',
        'The Sower with Setting Sun',
        'The Church at Auvers',
      ],
    },
    {
      type: 'multiple',
      difficulty: 'hard',
      category: 'Entertainment: Television',
      question:
        'Prior to working at Wizards of the Coast, &quot;Mark Rosewater&quot; was a writer for which show?',
      correct_answer: 'Roseanne',
      incorrect_answers: ['Boy Meets World', 'The X-Files', 'NYPD Blue'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'Science &amp; Nature',
      question:
        'Which Swiss psychologist is synonymous with the concepts of introvert and extrovert personalities?',
      correct_answer: 'Carl Jung',
      incorrect_answers: ['Jean Piaget', 'Alice Miller', 'Hermann Rorschach'],
    },
    {
      type: 'multiple',
      difficulty: 'medium',
      category: 'History',
      question:
        'In what dialogue did Socrates defend himself to the court of Athens? ',
      correct_answer: 'The Apology',
      incorrect_answers: ['The Euthyphro', 'The Laws', 'The Republic'],
    },
  ],
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

// Fucnión para preparar cada pregunta: decodifica texto, crea array de respuestas y lo mezcla
const formatQuizQuestions = (data) => {
  // Objeto quizQuestions con todas las preguntas y sus parametros
  const quizQuestions = data.results;

  const quizQuestionsArray = [];

  quizQuestions.forEach((question) => {
    // console.log(question); // Debugging: Imprimimos tipo de pregunta por consola

    // Question Card:

    // Tipo de pregunta (multiple, boolean, etc)
    const questionType = question.type;
    // console.log(questionType); // Debugging: Imprimimos tipo de pregunta por consola

    // Nivel de dificultad de la pregunta
    const questionDifficulty = question.difficulty;
    // console.log(questionDifficulty); // Debugging: Imprimimos dificulta por consola

    // Categoría de la pregunta
    const questionCategory = question.category;
    // console.log(questionCategory);

    // Pregunta:
    // Recuperamos la pregunta en modo 'raw'
    const rawQuestion = question.question;
    // Decodificamos elemento HTML de la pregunta (si es que los lleva)
    const decodedQuestion = decodeHtml(rawQuestion);
    // Asignamos el el valor de la pregunta (str) al elemento question

    const questionText = decodedQuestion;
    // console.log(questionText); // Debugging: Imprimimos pregunta

    // Respuestas:
    // Respuesta correcta
    const correctAnswer = question.correct_answer;
    // Array con la/las respuesta/s incorrecta/s
    const incorrectAnswers = question.incorrect_answers;

    // Cremaos el array 'answers' mapeando el array de 'incorrectAnswers' y retornando un array de objtos
    const answers = incorrectAnswers.map((answer) => {
      return { label: answer, value: false };
    });
    answers.push({ label: correctAnswer, value: true });

    // Creamos una variable con el array de las preguntas mezcladas
    const shuffledAnswers = shuffleArray(answers); // Aplicamos función shuffleArray()
    // console.log(answers);

    // Formato del objeto questionData, con toda la información de cada pregunta:
    const questionData = {
      type: questionType, // Tipo de pregunta -> str
      difficulty: questionDifficulty, // Dificultad de la pregunta -> str
      category: questionCategory, // Categoría de la pregunta -> str
      question: questionText, // Texto de la pregunta -> str
      answers: shuffledAnswers, // Array con las respuestas de la pregunta -> obj (array)
      // correct: correctAnswer, // Respuesta correcta a la pregunta -> str
    };

    // console.log(questionData);
    quizQuestionsArray.push(questionData);
  });

  return quizQuestionsArray;
};

// const card = document.getElementById('questionCard');

console.log('questions2.js');

// Variables de estado:
const formatedQuestions = formatQuizQuestions(dataQuiz); // Obtenemos el array con todas las preguntas y con toda la metadata de cada una de ellas (parametros de cada pregunta)
let score = 0;
let currentQuestionIndex = 0;

let currentAnswerButtonsDiv;

// Referencias al DOM
const questionCardHtml = document.getElementById('questionCard');
const nextButton = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const showResultsBtn = document.getElementById('showResultsBtn');

// let currentQuestionIndex;

// Función para inciar el quiz: oculta botones y muestra la primera pregunta
const startQuiz = () => {
  score = 0;
  currentQuestionIndex = 0;
  nextButton.classList.add('hid');
  restartBtn.classList.add('hide');
  showResultsBtn.classList.add('hide');
  questionCardHtml.classList.remove('hide');
  setNextQuestion();
};

// Función para limpiar la tarjeta y mostrar la pregunta + sus opciones
const showQuestion = (item) => {
  // Contenedor de la pregunta
  const divQuestionHtml = document.createElement('div');
  const questionTextHtml = document.createElement('h2');
  questionTextHtml.innerText = item.question;
  divQuestionHtml.appendChild(questionTextHtml);

  // Contenedor de botones de respuesta
  const divAnswersButtons = document.createElement('div');
  currentAnswerButtonsDiv = divAnswersButtons; // ????
  item.answers.forEach((answer) => {
    const btn = document.createElement('button');
    btn.classList.add('option');
    btn.innerText = answer.label;

    if (answer.value) {
      btn.dataset.value = true;
    }

    btn.addEventListener('click', () => {
      selectAnswer(divAnswersButtons, answer.value);
      console.log(btn.innerText);
    });

    divAnswersButtons.appendChild(btn);
  });

  console.log(`Score: ${score}`);

  questionCardHtml.appendChild(divQuestionHtml);
  questionCardHtml.appendChild(divAnswersButtons);
};

// Función para pasas a la siguiente pregunta tras resetear el estado
const setNextQuestion = () => {
  resetState();
  showQuestion(formatedQuestions[currentQuestionIndex]);
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
  // Si la respuesta es correcta, suma punto
  if (isCorrect) score++;

  // Marca toda las opciones según su valor
  Array.from(answerContainer.children).forEach((btn) => {
    setStatusClass(btn);
    btn.disabled = true; // evita re-click
  });

  // Si quedan preguntas, muestra "Next", si no, muestra botones restart y resultados
  if (currentQuestionIndex < formatedQuestions.length - 1) {
    nextButton.classList.remove('hide');
  } else {
    restartBtn.classList.remove('hide');
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
  document.location.href = '/results.html';
});

// Esto hace que al clicar en el botón "volver a empezar" se redirija al usuario a la página html home.
restartBtn.addEventListener('click', () => {
  document.location.href = '/home.html';
});

// Arrancamos el quiz automáticamente al cargar la página
startQuiz();
