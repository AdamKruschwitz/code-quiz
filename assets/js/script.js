// On load, add the main menu to the screen
var quizSpace = window.document.getElementById("quiz");
var testMultipleChoiceQuestion = {
    "type": "multiple-choice",
    "question": "which of these is a cheese?",
    "answers": ["burgandy", "salmon", "gouda", "camero"],
    "explaination": "it cheese."
}

clearQuiz();
buildStartMenu();

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

