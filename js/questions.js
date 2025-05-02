// TODO: History 2
// Mostrar 1ª pregunta
// question.html
// - Pintar la pregunta 1 desde un array local.
// - Marcar la opción elegida (clase CSS).

// Creamos un array de prueba para pintarlo en HTML

const quizQuestions = {
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
  ],
};

const card = document.getElementById('questionCard');

// Función para formatear elemento &quot; y &#039; en texto HTML proviente de las preguntas
// Ejemplo: 'There is an island in Japan called Ōkunoshima, A.K.A. &quot;Rabbit Island&quot;' /// --> &quot; = Comillas dobles
// Resultado en texto HTML: 'There is an island in Japan called Ōkunoshima, A.K.A. "Rabbit Island"' /// <-- Comillas dobles!

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const rawQuestion = quizQuestions.results[1].question;
const decodedQuestion = decodeHtml(rawQuestion);
console.log(decodedQuestion); // Shows the cleaned-up version

// Question Card:

// Creamos elemento <h2> para que contenga la pregunta
const question = document.createElement('h2');
// // const data = quizQuestions.results[0].question;
question.innerText = quizQuestions.results[0].question;
console.log(question);

const questionType = quizQuestions.results[0].type;

const answers = quizQuestions.results[0].incorrect_answers;
answers.push(quizQuestions.results[0].correct_answer);
console.log(answers);
