// ========= Custom Javascript Code goes here ========

// getting elements from html
const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("item-option"));
console.log(choice)

// all variables ...
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCouter = 0;
let availableQuestions = [];
const correct_bonus = 10;
const max_questions = 4;


// some hard coded questions ...
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

// Starting the Game .... 
startGame = () =>{

    questionCouter = 0;
    score= 0;

    // take a copy of questions ...
    availableQuestions = [...questions];

    //get a new questions .... 
    getNewQuestion();
}

// Getting a New question everytime ...
getNewQuestion = ()=>{
    
    // checking if question reached their limits .....
    if(availableQuestions.length==0 || questionCouter >= max_questions){
        return window.location.assign("./end.html");
    }

    // increase question + 1
    questionCouter++;

    // rendomly picking questions .....
    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // showing choices with their data-number 
    choice.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })

    // splice that question , that has allready showed
    availableQuestions.splice(questionIndex, 1);
    // now accpting the answer ...
    acceptingAnswers = true;
}

// After Click on choice .....
choice.forEach(choice=>{
    choice.addEventListener("click", e =>{
      if(!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number']

      getNewQuestion();
    })
})


// starting the game ........
startGame();