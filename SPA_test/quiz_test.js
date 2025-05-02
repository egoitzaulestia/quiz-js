const questionList = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false },
    ],
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
      { text: 'Yes', correct: false },
    ],
  },
];

const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('nextBtn');

const questionContainerElement = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerButtons');

let currentQuestionIndex;

const startGame = () => {
  startButton.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

const showQuestion = (item) => {
  questionElement.innerText = item.question;
  item.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;

    if (answer.correct) {
      button.dataset.correct = true;
    }

    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

const setNextQuestion = () => {
  resetState();
  showQuestion(questionList[currentQuestionIndex]);
};

const setStatusClass = (element) => {
  if (element.dataset.correct) {
    element.classList.add('color-correct');
  } else {
    element.classList.add('color-wrong');
  }
};

const selectAnswer = () => {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });

  if (questionList.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
};

const resetState = () => {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
