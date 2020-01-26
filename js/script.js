// ========= Custom Javascript Code goes here ========
const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("item-option"));
console.log(choice)

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCouter = 0;
let availableQuestions = [];

let questions =[
    {
        question:"HTML stands for?",
        choice1:"Hyper Text Markup Language",
        choice2:"High Text Markup Language",
        choice3:"Hyper Tabular Markup Language"
    },
    {
        question:"which of the following tag is used to mark a begining of paragraph ?",
        choice1:"<TD>",
        choice2:"<br>",
        choice3:"<P>"
    },
    {
        question:"From which tag descriptive list starts?",
        choice1:"<LL>",
        choice2:"<DD>",
        choice3:"<DL>"
    },
    {
        question:"Correct HTML tag for the largest heading is",
        choice1:"<head>",
        choice2:"<h6>",
        choice3:"<heading>"
    }
]

// Constants
const correct_bonus = 10;
const max_questions = 3;

startGame = () =>{
    questionCouter = 0;
    score= 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}
getNewQuestion = ()=>{

    if(availableQuestions.length==0 || questionCouter >= max_questions){
        return window.location.assign("./end.html");
    }

    questionCouter++;
    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choice.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choice.forEach(choice=>{
    choice.addEventListener("click", e =>{
      if(!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number']

      getNewQuestion();
    })
})

startGame();