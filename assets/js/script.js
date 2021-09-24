// On load, add the main menu to the screen
var quizSpace = window.document.getElementById("quiz");
var testMultipleChoiceQuestion = {
    "type": "multiple-choice",
    "questionText": "which of these is a cheese?",
    "answers": ["burgandy", "salmon", "gouda", "camero"],
    "explaination": "it cheese."
}

clearQuiz();
//buildStartMenu();
buildQuestion(testMultipleChoiceQuestion);

function buildStartMenu() {
    quizSpace.dataset.state = "start-menu";
    let title = document.createElement("h2");
    title.innerHTML = "JavaScript Coding Quiz";
    title.setAttribute("class", "title");
    console.log(title);

    let startBtn = document.createElement("button");
    startBtn.innerHTML = "Start"
    startBtn.setAttribute("class", "start-btn");
    console.log(startBtn);

    quizSpace.appendChild(title);
    quizSpace.appendChild(startBtn);
}

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
                answerBtn.innerHTML = question.answers[i];
                answers.appendChild(answerBtn);
            }
            break;
    }
    quizSpace.appendChild(answers);

    
}