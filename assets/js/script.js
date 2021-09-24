// On load, add the main menu to the screen
var quizSpace = window.document.getElementById("quiz");
var timerValue;
var timerEl;
var score;
var questionsGiven;
var allQuestions;
var lastQuestion;

// Test variables ============================================
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
allQuestions = [testMultipleChoiceQuestion, testShortAnswerQuestion];
// ===========================================================

clearQuiz();
buildTimer();
buildStartMenu();

function buildTimer() {
    // Create a timer and put it on the page
    timerEl = document.createElement("h2");
    quizSpace.appendChild(timerEl);
    timerEl.setAttribute("class", "timer");
    timerValue = 10;
    updateTimer();

    // Every 1 second, decrease the timer value and update the timer. 
    var timerInterval = setInterval(function() {
        timerValue--;
        updateTimer();

        //If the timer runs out, end the game.
        if(timerValue == 0) {
            endGame();
            clearInterval(timerInterval);
        }
    }, 1000);
}

function updateTimer() {
    timerEl.innerHTML = timerValue;
}

// TODO: end the game and bring up the stats page
function endGame() {
    console.log("run end game");
}

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
    answers.setAttribute("name", "answers");
    switch(question.type) {
        case "short-answer":
            // Short answer question
            let answerLabel = document.createElement("label");
            answerLabel.setAttribute("for", "answer");
            answerLabel.innerHTML = "Answer: ";

            let answerField = document.createElement("input");
            answerField.setAttribute("class", "answer-field");
            answerField.setAttribute("type", "text");
            answerField.setAttribute("id", "answer-field")
            answerField.setAttribute("name", "answer");
            
            let submitBtn = document.createElement("button");
            submitBtn.setAttribute("class", "submit-btn");
            submitBtn.innerHTML = "Submit";

            submitBtn.addEventListener("click", onSubmitBtnClick);

            answers.appendChild(answerLabel);
            answers.appendChild(answerField);
            answers.appendChild(submitBtn);
            break;
        
        case "multiple-choice":
            // Multiple choice question
            for(i=0; i<question.answers.length; i++) {
                let answerBtn = document.createElement("button");
                answerBtn.setAttribute("class", "answer-btn");
                answerBtn.setAttribute("data-value", i+1)
                answerBtn.innerHTML = question.answers[i];

                answers.appendChild(answerBtn);

                answerBtn.addEventListener("click", onAnswerBtnClick)
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
    questionsGiven.push(allQuestions[1]);
    lastQuestion = allQuestions[1];
    return allQuestions[1];
}

// A function to handle behavior when a multiple choice answer is clicked.
function onAnswerBtnClick() {
    // Calculate whether the question was answered correctly
    // console.log(this.dataset.value);
    let correctAnswer = this.dataset.value === lastQuestion.answer;

    if(correctAnswer) {
        score++;
    }

    lastQuestion.result = this.dataset.value;
    

    console.log(score);

    // Clear the quiz space
    clearQuiz();

    // Build the next question
    let nextQuestion = selectQuestion();
    buildQuestion(nextQuestion);
}

function onSubmitBtnClick() {
    // Store the users answer
    let answer = this.parentElement.children[1].value;
    
    // Calculate whether the question was answered correctly
    let correctAnswer = answer === lastQuestion.answer;

    // Increment score if correct
    if(correctAnswer) score++;
    lastQuestion.result = answer;
    console.log(answer);
    console.log(score);

    // Clear the quiz space
    clearQuiz();

    // Build the next question
    let nextQuestion = selectQuestion();
    buildQuestion(nextQuestion);
}