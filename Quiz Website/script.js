const questions = [
    {
        question: "What attribute specifies the default language of a web page?",
        answers: [
            { text: "lang", correct: true},
            { text: "language", correct: false},
            { text: "default-language", correct: false},
            { text: "There is no way to specify the language", correct: false},
        ]
    },
    {
        question: "What property in CSS is used to specify the spacing between the top border of an element and its content?",
        answers: [
            { text: "border-top", correct: false},
            { text: "padding-top", correct: true},
            { text: "margin-top", correct: false},
            { text: "top-spacing", correct: false},
        ]
    },
    {
        question: "What property in CSS is used to change the background color of an element?",
        answers: [
            { text: "color", correct: false},
            { text: "background-color", correct: true},
            { text: "style", correct: false},
            { text: "paint", correct: false},
        ]
    },
    {
        question: "How can you select an element with a specific ID in CSS?",
        answers: [
            { text: "element.id", correct: false},
            { text: "#id_name", correct: true},
            { text: ".class_name", correct: false},
            { text: "[attribute_name]", correct: false},
        ]
    },
    {
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        answers: [
            { text: "var name = value", correct: true},
            { text: "let name = value", correct: false},
            { text: "const name = value", correct: false},
            { text: "define name = value", correct: false},
        ]
    },
    {
        question: "What is an event in JavaScript?",
        answers: [
            { text: "A variable that stores data", correct: false},
            { text: "A function in JavaScript", correct: false},
            { text: "An action that happens on a web page, like a click or a key press", correct: true},
            { text: "A style applied to an element", correct: false},
        ]
    },
    {
        question: "What does the DOM (Document Object Model) represent in web development?",
        answers: [
            { text: "A programming language for web pages", correct: false},
            { text: "A tree-like structure representing the content of a web page", correct: true},
            { text: "A tool for managing web servers", correct: false},
            { text: "A way to style web pages", correct: false},
        ]
    },
    {
        question: "Which attribute is used to specify a unique identifier for an HTML element?",
        answers: [
            { text: "id", correct: true},
            { text: "class", correct: false},
            { text: "name", correct: false},
            { text: "unique", correct: false},
        ]
    },
    {
        question: "Which is largest animal in the world ?",
        answers: [
            { text: "To define the structure of a web page", correct: false},
            { text: "To style the appearance of a web page", correct: false},
            { text: "To add interactivity and dynamic behavior to web pages", correct: true},
            { text: "To create server-side applications", correct: false},
        ]
    },
    {
        question: "What is the difference between single-threaded and multi-threaded programming models?",
        answers: [
            { text: "Single-threaded executes multiple tasks concurrently, while multi-threaded does not.", correct: false},
            { text: "Single-threaded executes one task at a time, while multi-threaded can execute multiple tasks concurrently.", correct: true},
            { text: "There is no difference; they are the same.", correct: false},
            { text: "Single-threaded is used for web development, while multi-threaded is used for other applications.", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();

