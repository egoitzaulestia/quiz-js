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
    // Question Card:

    // Tipo de pregunta (multiple, boolean, etc)
    const questionType = question.type;

    // Nivel de dificultad de la pregunta
    const questionDifficulty = question.difficulty;

    // Categoría de la pregunta
    const questionCategory = question.category;

    // Pregunta:
    // Recuperamos la pregunta en modo 'raw'
    const rawQuestion = question.question;
    // Decodificamos elemento HTML de la pregunta (si es que los lleva)
    const decodedQuestion = decodeHtml(rawQuestion);
    const questionText = decodedQuestion;

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

    // Formato del objeto questionData, con toda la información de cada pregunta:
    const questionData = {
      type: questionType, // Tipo de pregunta -> str
      difficulty: questionDifficulty, // Dificultad de la pregunta -> str
      category: questionCategory, // Categoría de la pregunta -> str
      question: questionText, // Texto de la pregunta -> str
      answers: shuffledAnswers, // Array con las respuestas de la pregunta -> obj (array)
      // correct: correctAnswer, // Respuesta correcta a la pregunta -> str
    };

    quizQuestionsArray.push(questionData);
  });

  return quizQuestionsArray;
};

// Variables de estado:
let formatedQuestions = formatQuizQuestions(dataQuiz); // Obtenemos el array con todas las preguntas y con toda la metadata de cada una de ellas (parametros de cada pregunta)
let score = 0;
let currentQuestionIndex = 0;

let currentAnswerButtonsDiv;

// Referencias al DOM
const questionCardHtml = document.getElementById('questionCard');
const nextButton = document.getElementById('nextBtn');
const goHomeBtn = document.getElementById('goHomeBtn');
const showResultsBtn = document.getElementById('showResultsBtn');

// let currentQuestionIndex;

// Función para inciar el quiz: oculta botones y muestra la primera pregunta
const startQuiz = () => {
  score = 0;
  currentQuestionIndex = 0;
  nextButton.classList.add('hid');
  goHomeBtn.classList.add('hide');
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

  // Si quedan preguntas, muestra "Next", si no, muestra botones volver al inicio y resultados
  if (currentQuestionIndex < formatedQuestions.length - 1) {
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
  document.location.href = '/results.html';
});

// Esto hace que al clicar en el botón "volver a empezar" se redirija al usuario a la página html home.
goHomeBtn.addEventListener('click', () => {
  document.location.href = '/home.html';
});

// Arrancamos el quiz automáticamente al cargar la página
startQuiz();

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

// main.js //
////////////

// const getQuestions = async () => {
//   try {
//     const response = await axios.get('https://opentdb.com/api.php?amount=10');
//     console.log(response.data.results);
//   } catch (error) {
//     console.error(`Error: ${error}`);
//   }
// };
// getQuestions();

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // /TODO: 5 - Crea un botón que cuando lo cliques ejecute la función que habías creado

// // Incializamos la función getUsers3
// const getUsersInConsole = () => {
//   return axios
//     .get('https://jsonplaceholder.typicode.com/users')
//     .then((res) => {
//       const users = res.data;
//       console.log(users); // Pintamos los usuarios por consola
//     })
//     .catch((err) => console.log(err));
// };

// const body = document.body;
// const btnGetUsersInConsole = document.createElement('button');
// btnGetUsersInConsole.setAttribute('id', 'btnGetUsers');
// btnGetUsersInConsole.textContent = 'Get all users in console';
// body.appendChild(btnGetUsersInConsole);

// btnGetUsersInConsole.addEventListener('click', getUsersInConsole);

// //TODO: 6 - Ahora en vez de mostrar los usuarios por consola muestra el nombre de cada uno en el DOM ( en el HTML)

// // Incializamos la función getUsers3
// const getUsersInHtml = () => {
//   return axios
//     .get('https://jsonplaceholder.typicode.com/users')
//     .then((res) => {
//       const users = res.data;
//       const sectionUsers = document.createElement('section');
//       users.forEach((user) => {
//         sectionUsers.innerHTML += `<b>id:</b> ${user.id}
//                                        <br> <b>name:</b> ${user.name}<br>
//                                        <b>address:</b><br>
//                                        &nbsp; &nbsp; &nbsp; <b>city:</b> ${user.address.city}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>geolocalization:</b><br>
//                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>latitude:</b> ${user.address.geo.lat}<br>
//                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>longitude:</b> ${user.address.geo.lng}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>street:</b> ${user.address.street}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>suite:</b> ${user.address.suite}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>zipcode:</b> ${user.address.zipcode}<br>
//                                        <b>company:</b><br>
//                                        &nbsp; &nbsp; &nbsp; <b>bs:</b> ${user.company.bs}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>catch phrase:</b> ${user.company.catchPhrase}<br>
//                                        &nbsp; &nbsp; &nbsp; <b>company name:</b> ${user.company.name}<br>
//                                        <b>email:</b> ${user.email}<br>
//                                        <b>phone:</b> ${user.phone}<br>
//                                        <b>username:</b> ${user.username}<br>
//                                        <b>website:</b> ${user.website}<br>
//                                        <br><br>`;

//         body2.appendChild(sectionUsers);
//       });
//     })
//     .catch((err) => console.log(err));
// };

// const body2 = document.body;
// const btngetUsersInHtml = document.createElement('button');
// btngetUsersInHtml.setAttribute('id', 'btnGetUsers');
// btngetUsersInHtml.textContent = 'Get all users in HTML';
// body2.appendChild(btngetUsersInHtml);

// btngetUsersInHtml.addEventListener('click', getUsersInHtml);

// // Recuerda que para estos ejercicios deberás utilizar Axios.

// function helloWorl() {
//   console.log('Hello world!');
// }

// // We capture elements from the DOM
// const formData = document.getElementById('formData');
// const searchInput = document.getElementById('searchInput');
// const sectionMovies = document.getElementById('containerMovies');
// const genreSelect = document.getElementById('movieGenre');

// const searchAndShowTheMovie = async (e) => {
//   e.preventDefault();

//   containerMovies.innerHTML = '';
//   const movieSearch = searchInput.value.trim();
//   const selectedGenre = genreSelect.value;
//   console.log('Selected genre:', selectedGenre);

//   try {
//     let response;

//     if (movieSearch) {
//       // Search by title
//       response = await axios.get('/search/movie', {
//         params: {
//           query: movieSearch,
//           language: 'en-US'
//         }
//       });
//     } else if (selectedGenre !== "") {
//       // Filter by genre
//       response = await axios.get('/discover/movie', {
//         params: {
//           with_genres: selectedGenre,
//           language: 'en-US'
//         }
//       });
//     }

//     const movies = response.data.results;
//     renderMovies(movies);

//   } catch (error) {
//     console.error('Error fetching movies:', error);
//   }

//   searchInput.value = '';
// };

// // Function to render all the movies of the search
// // 1. we pass the searched data array as an argument.
// // 2. we iterate the array and we call to createMovieCard() function.
// const renderMovies = (movies) => {
//   movies.forEach(movie => {
//     createMovieCard(movie)
//   });
// }

// const createMovieCard = (movie) => {
//   const posterUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//     : 'placeholder.jpg'; // Fallback if no poster

//   // DOM content creation (HTML)
//   const movieCard = document.createElement('div');

//   const moviePoster = document.createElement('img');
//   moviePoster.setAttribute('src', posterUrl);
//   moviePoster.setAttribute('alt', `${movie.title} poster`);

//   const movieTitle = document.createElement('h1');
//   movieTitle.textContent = `${movie.title}`;

//   movieCard.append(moviePoster, movieTitle);

//   sectionMovies.appendChild(movieCard);
// }

// const loadGenres = async () => {
//   try {
//     // First get all genre IDs
//     const response = await axios.get(`/genre/movie/list`, {
//       params: {
//         language: 'en-US'
//       }
//     })

//     const genres = response.data.genres;
//     console.log('Genres loaded:', genres);

//     genres.forEach(genre => {
//       const option = document.createElement('option');
//       option.value = genre.id;
//       option.textContent = genre.name;
//       genreSelect.appendChild(option);
//     })

//   } catch (error) {
//     console.error('Error loading genres',error)
//   }
// }

// loadGenres()

// formData.addEventListener('submit', searchAndShowTheMovie);
// genreSelect.addEventListener('change', searchAndShowTheMovie);
