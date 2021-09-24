// On load, add the main menu to the screen
var quizSpace = window.document.getElementById("quiz");
var score;
var questionsGiven;
var allQuestions;
var lastQuestion;

// Test variables
var testMultipleChoiceQuestion = {
    "type": "multiple-choice",
    "questionText": "which of these is a cheese?",
    "answers": ["burgandy", "salmon", "gouda", "camero"],
    "answer": "3",
    "explaination": "it cheese.",
    "result": "unanswered"
}
var testShortAnswerQuestion = {
    "type": "short-answer",
    "questionText": "how many fingers do you have?",
    "answer": "10",
    "explaination": "I hope you got 10 fingies!",
    "result": "unanswered"
}
allQuestions = [testMultipleChoiceQuestion];

clearQuiz();
buildStartMenu();
//buildQuestion(testMultipleChoiceQuestion);

function buildStartMenu() {
    quizSpace.dataset.state = "start-menu";
    let title = document.createElement("h2");
    title.innerHTML = "JavaScript Coding Quiz";
    title.setAttribute("class", "title");
    //console.log(title);

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start"
    startBtn.setAttribute("class", "start-btn");
    //console.log(startBtn);

    quizSpace.appendChild(title);
    quizSpace.appendChild(startBtn);

    startBtn.addEventListener("click", startGame);
}

// Empties the quiz space
function clearQuiz() {
    quizSpace.innerHTML = "";
}

// Builds the html for the question
function buildQuestion(question) {
    // Build and add the question text
    let questionText = document.createElement("h2");
    questionText.setAttribute("class", "questionText");
    questionText.innerHTML = question.questionText; 
    quizSpace.appendChild(questionText);

    // Handle the number of answers for each question type
    let answers = document.createElement("section");
    answers.setAttribute("class", "answers");
    switch(question.type) {
        case "short-answer":
            // TODO: Short answer question
            break;
        
        case "multiple-choice":
            // Multiple choice question
            for(i=0; i<question.answers.length; i++) {
                let answerBtn = document.createElement("button");
                answerBtn.setAttribute("class", "answer-btn");
                answerBtn.setAttribute("data-value", i+1)
                answerBtn.innerHTML = question.answers[i];

                answers.appendChild(answerBtn);

                answerBtn.addEventListener("click", onAnswerClick)
            }
            break;
    }
    quizSpace.appendChild(answers);
}

// Set up game variables and build the question in html
function startGame() {
    score = 0;
    questionsGiven = [];
    let firstQuestion = selectQuestion();

    // Clear the start menu and build the first question
    clearQuiz();
    buildQuestion(firstQuestion);
}

//TODO: select a random question that hasn't been given to give.
function selectQuestion() {
    questionsGiven.push(allQuestions[0]);
    lastQuestion = allQuestions[0];
    return allQuestions[0];
}

// A function to handle behavior when a multiple choice answer is clicked.
function onAnswerClick(event) {
    // Calculate whether the question was answered correctly
    console.log(this.dataset.value);
    let correctAnswer = this.dataset.value === lastQuestion.answer;

    if(correctAnswer) {
        lastQuestion.result = "correct";
        score++;
    }
    else {
        lastQuestion.result = "incorrect";
    }

    console.log(score);

    // Clear the quiz space
    clearQuiz();

    // Build the next question
    let nextQuestion = selectQuestion();
    buildQuestion(nextQuestion);
}