// ========= Custom Javascript Code goes here ========

// getting elements from html
const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("item-option"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
console.log(questionCounterText);

// all variables ...
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCouter = 0;
let availableQuestions = [];
const correct_bonus = 10;
const max_questions = 4;

// some hard coded questions ...
let questions = [
  {
    question: "HTML stands for?",
    choice1: "Hyper Text Markup Language",
    choice2: "High Text Markup Language",
    choice3: "Hyper Tabular Markup Language",
    answer: "1"
  },
  {
    question:
      "which of the following tag is used to mark a begining of paragraph ?",
    choice1: "<TD>",
    choice2: "<br>",
    choice3: "<P>",
    answer: "1"
  },
  {
    question: "From which tag descriptive list starts?",
    choice1: "<LL>",
    choice2: "<DD>",
    choice3: "<DL>",
    answer: "1"
  },
  {
    question: "Correct HTML tag for the largest heading is",
    choice1: "<head>",
    choice2: "<h6>",
    choice3: "<heading>",
    answer: "1"
  }
];

// Starting the Game ....
startGame = () => {
  questionCouter = 0;
  score = 0;

  // take a copy of questions ...
  availableQuestions = [...questions];

  //get a new questions ....
  getNewQuestion();
};

// Getting a New question everytime ...
getNewQuestion = () => {
  // checking if question reached their limits .....
  if (availableQuestions.length === 0 || questionCouter >= max_questions) {
    // save the score
    localStorage.setItem("mostRecentScore", score);

    // go to the end page
    return window.location.assign("./end.html");
  }

  // increase question + 1
  questionCouter++;

  //updating question counter dinamically
  questionCounterText.innerText = `${questionCouter} / ${max_questions}`;

  // rendomly picking questions .....
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // showing choices with their data-number
  choice.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // splice that question , that has allready showed
  availableQuestions.splice(questionIndex, 1);
  // now accpting the answer ...
  acceptingAnswers = true;
};

// After Click on choice .....
choice.forEach(choice => {
  choice.addEventListener("click", e => {
    // if answer is not accepting then it it will return
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // if answer matching dn bg color will green , rather than it will be red
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "bg-success" : "bg-danger";

    //   if success dn update score
    if (classToApply === "bg-success") {
      incrementScore(correct_bonus);
    }
    // adding the green / success color
    selectedChoice.classList.add(classToApply);

    // seting a time out for entering new question...
    setTimeout(() => {
      // adding the green / success color
      selectedChoice.classList.remove(classToApply);
      // then get the next qestion
      getNewQuestion();
    }, 500);
  });
});

// increment score function
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// starting the game ........
startGame();
