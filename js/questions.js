// TODO: History 2
// Mostrar 1ª pregunta
// question.html
// - Pintar la pregunta 1 desde un array local.
// - Marcar la opción elegida (clase CSS).

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

const card = document.getElementById('questionCard');

let currentAnswerButtonsDiv;

// Función para formatear elemento &quot; y &#039; en texto HTML proviente de las preguntas
// Ejemplo: 'There is an island in Japan called Ōkunoshima, A.K.A. &quot;Rabbit Island&quot;' /// --> &quot; = Comillas dobles
// Resultado en texto HTML: 'There is an island in Japan called Ōkunoshima, A.K.A. "Rabbit Island"' /// <-- Comillas dobles!

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;

  return txt.value;
}

// Creamos función para mezclar las preguntas
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ✅ Correct swap
  }
  return array;
};

// Función para formatear el JSON recibidio para crear un array con todas las preguntas y con toda la metadata de cada una de ellas (parametros de cada pregunta)
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
      correct: correctAnswer, // Respuesta correcta a la pregunta -> str
    };

    // console.log(questionData);
    quizQuestionsArray.push(questionData);
  });

  return quizQuestionsArray;
};

// Obtenemos el array con todas las preguntas y con toda la metadata de cada una de ellas (parametros de cada pregunta)
const formatedQuestions = formatQuizQuestions(dataQuiz);
console.log(formatedQuestions[0]);

const questionCardContainerElement = document.getElementById(
  'questionCardContainer',
);
const questionCardHtml = document.getElementById('questionCard');

// Botones de Next y Restart
const nextButton = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const showResultsBtn = document.getElementById('showResultsBtn');

// let currentQuestionIndex;

// Función para que se incializar el cuestionario (SIN TERMINAR)
const startQuiz = () => {
  // nextButton.classList.add('hide');
  currentQuestionIndex = 0;
  questionCardHtml.classList.remove('hide');
  // showQuestion(formatedQuestions[currentQuestionIndex]);

  setNextQuestion();
};

// Función para mostrar preguntas (SIN TERMINAR)
const showQuestion = (item) => {
  const divQuestionHtml = document.createElement('div');
  const questionTextHtml = document.createElement('h2');
  questionTextHtml.innerText = item.question;

  divQuestionHtml.appendChild(questionTextHtml);

  const divAnswersButtons = document.createElement('div');
  currentAnswerButtonsDiv = divAnswersButtons;
  item.answers.forEach((answer) => {
    const answerButton = document.createElement('button');
    answerButton.classList.add('option');
    answerButton.innerText = answer.label;

    if (answer.value) {
      answerButton.dataset.value = true;
    }

    answerButton.addEventListener('click', () =>
      selectAnswer(divAnswersButtons),
    );
    divAnswersButtons.appendChild(answerButton);
  });

  questionCardHtml.appendChild(divQuestionHtml);
  questionCardHtml.appendChild(divAnswersButtons);
};

// Función para mostrar la siguiente pregunta (SIN TERMINAR)
// const setNextQuestion = () => {
//   resetState(currentAnswerButtonsDiv);
//   showQuestion(formatedQuestions[currentQuestionIndex]);
// };

const setNextQuestion = () => {
  resetState();
  showQuestion(formatedQuestions[currentQuestionIndex]);
};

const setStatusClass = (element) => {
  if (element.dataset.value) {
    element.classList.add('color-correct');
  } else {
    element.classList.add('color-wrong');
  }
};

const selectAnswer = (setOfAnswers) => {
  Array.from(setOfAnswers.children).forEach((button) => {
    setStatusClass(button);
  });

  if (formatedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // NOTA: Hay que mirar si lo hacemos así o no
    // document.location.href = '/results.html';
    restartBtn.classList.remove('hide');
    showResultsBtn.classList.remove('hide');
  }
};

// NO BORRAR
// const resetState = (divAnswersButtons) => {
//   nextButton.classList.add('hide');

//   while (divAnswersButtons.firstChild) {
//     divAnswersButtons.removeChild(divAnswersButtons.firstChild);
//   }
// };

const resetState = () => {
  nextButton.classList.add('hide');
  // Clears out everything (question + answers) ready for the next one:
  questionCardHtml.innerHTML = '';
};

// NO BORRAR
// const resetState = (divAnswersButtons) => {
//   nextButton.classList.add('hide');
//   if (!divAnswersButtons) return; // ← bail out if undefined

//   while (divAnswersButtons.firstChild) {
//     divAnswersButtons.removeChild(divAnswersButtons.firstChild);
//   }
// };

// Se incializa el cuestionario
startQuiz();

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
