// On load, add the main menu to the screen
var quizSpace = window.document.getElementById("quiz");
var timerSpace = window.document.getElementById("timer");
var tabsSpace = window.document.getElementById("tabs");
var reviewQuestionSpace = window.document.getElementById("review-questions");
var timerValue;
var timerEl;
var timerInterval;
var score;
var questionsGiven;
var lastQuestion;
const allQuestions = [
    {   // Question 1, assignment operators vs comparison operators
        "type": "multiple-choice",
        "questionText": "Which of the following expressions could assign a new value to i?",
        "answers": ["i === i", "i == j", "i += j", "i !== j"],
        "correctAnswer": 3, // i += j
        "explaination": "\"===\" (strict equal), \"==\" (equal), and \"!==\" (not equal) are each comparison operators, which will not affect the value of i. \"i += j\" uses an assignment operator, specifically an addition assignment, which will add i and j then assign i to that value.",
        "result": "unanswered"
    },
    {   // Question 2, for loop syntax
        "type": "multiple-choice",
        "questionText": "Which of these for loops is syntactically correct?",
        "answers": ["for(i<10; i++; var i)", "for(i++; i<10; var i)", "for(var i=0; i++; i<10)", "for(var i=0; i<10; i++)"],
        "correctAnswer": 4, // for(var i=0; i<10; i++)
        "explaination": "The correct order of operations within a for loop are first instantiate variables, second the condition for which to continue the loop, third to increment your variable",
        "result": "unanswered"
    },
    {   // Question 3, for loop conceptualization
        "type": "short-answer",
        "questionText": "What will be logged to the console when this code is run? <br/> <code>var total=0, max=5; <br> for(var i=1; i<= max; i++) {<br>    total += i;<br>}<br>console.log(total)</code>",
        "correctAnswer": "15",
        "explaination":"This code adds the value of i to total during each loop. Since max is 5, this will sum the numbers between 1 and 5 and log them to the console.",
        "result": "unanswered"
    },
    {   // Question 4, while loop conceptualization
        "type": "multiple-choice",
        "questionText":"How many times will the console log \"hello world!\"<br/><code>var count=10;\nwhile(count >= 0) {<br>    console.log(\"hello world!\");\ncount -= 2;<br>}</code>",
        "answers": ["6", "5", "10", "0"],
        "correctAnswer": 1, // 6
        "explaination": "Every time the loop runs count will decrease by 2, and the loop will run as long as count is greater than or equal to 0. At the the beginning of each loop when count is checked, it will be 10, 8, 6, 4, 2, 0, then -2. When count is checked and it's -2, the while loop will not run the code again and will advance onto the next block. In all, the loop will run 6 times.",
        "result": "unanswered"
    },
    {   // Question 5, get properties from an element
        "type": "multiple-choice",
        "questionText": "Which of these are not a correct way to access a property of a page Element in JavaScript?",
        "answers": ["element.property", "element.getProperty(\"property\")", "element[\"property\"]", "element::property"],
        "correctAnswer": 4, // element::property
        "explaination": "You can access the property of an element in javascript in three ways. You can use dot notation (element.property), you can use the getAttribute() method, or you can use object notation (element[property]).",
        "result": "unanswered"
    },
    {   // Question 6, variable scope
        "type": "short-answer",
        "questionText": "What is logged to the console when this code is run?<br><code>var temp =\"foo\"2; \nfunction printTemp() {<br>    var temp=\"bar\";<br>    console.log(temp)<br>}<br>\nprintTemp();",
        "correctAnswer": "bar",
        "explaination": "Since the variable temp is created again within the function, it is used instead of the global variable when the function is called.",
        "result": "unanswered"
    },
    {   // Question 7, image tags
        "type": "multiple-choice",
        "questionText": "Which of these image tags are formatted correctly?",
        "answers": ["<img href=\"./assets/image.png\" />", "<img file=\"./assets/image.png\" />", "<img image=\"./assets/image.png\" />", "<img value=\"./assets/image.png\">"],
        "correctAnswer": 1, // <img href="./assets/image.png" />
        "explaination": "Image tags must take their image file path through either the href or src properties. Using src will embed the image in the webpage, and href can be used to link to files hosted elsewhere.",
        "result": "unanswered"
    }

]

// Test variables ============================================
// var testMultipleChoiceQuestion = {
//     "type": "multiple-choice",
//     "questionText": "which of these is a cheese?",
//     "answers": ["burgandy", "salmon", "gouda", "camero"],
//     "answer": "3",
//     "explaination": "it cheese.",
//     "result": "unanswered"
// }
// var testShortAnswerQuestion = {
//     "type": "short-answer",
//     "questionText": "how many fingers do you have?",
//     "answer": "10",
//     "explaination": "I hope you got 10 fingies!",
//     "result": "unanswered"
// }
// allQuestions = [testMultipleChoiceQuestion, testShortAnswerQuestion];
// ===========================================================

initializeStorage();
clearQuiz();
buildStartMenu();

// Initialize storage
function initializeStorage() {
    if(!localStorage.getItem("quizScores")) {
        localStorage.setItem("quizScores", JSON.stringify({
            players: [],
            scores: []
        }));
    }
}

// Creates timer element and starts timer.
function buildTimer() {
    // Create a timer and put it on the page
    timerEl = document.createElement("h2");
    timerSpace.appendChild(timerEl);
    timerEl.setAttribute("class", "timer");
    timerValue = 60;
    updateTimerEl();

    // Every 1 second, decrease the timer value and update the timer. 
    timerInterval = setInterval(updateTimer, 1000);
}

// Runs timer interval to check update display and check for 
function updateTimer() {
    timerValue--;
    updateTimerEl();

    //If the timer runs out, end the game.
    if(timerValue <= 0) {
        endGame();
        clearInterval(timerInterval);
    }
}

// Updates timer display
function updateTimerEl() {
    timerEl.innerHTML = timerValue;
}

// Remove the timer and clear its interval
function removeTimer() {
    timerEl.innerHTML = "";
}

// Ends the game and bring up the stats page.
function endGame() {
    removeTimer();
    clearQuiz();
    buildEndGame();
}

// Builds the start menu.
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

// Empties the quiz space.
function clearQuiz() {
    quizSpace.innerHTML = "";
}

// Builds the html for the question.
function buildQuestion(question) {
    // Build and add the question text
    let questionText = document.createElement("h2");
    questionText.setAttribute("class", "question-text");
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
                answerBtn.textContent = question.answers[i];

                answers.appendChild(answerBtn);

                answerBtn.addEventListener("click", onAnswerBtnClick)
            }
            break;
    }
    quizSpace.appendChild(answers);
}

// Set up game variables and build the question and the timer in html.
function startGame() {
    score = 0;
    questionsGiven = [];
    let firstQuestion = selectQuestion();

    // Clear the start menu and build the first question
    clearQuiz();
    buildTimer();
    buildQuestion(firstQuestion);
}

// TODO: Returns a random question that hasn't been given.
function selectQuestion() {
    let question;
    if(!lastQuestion) {
        question = allQuestions[0];
    }
    else {
        // Go to the next question. If it's the last question, end the game
        currentIndex = allQuestions.indexOf(lastQuestion);
        currentIndex++;
        if(currentIndex < allQuestions.length){
            question = allQuestions[currentIndex];
        }
        else {
            endGame();
            return null; 
        }
    }

    questionsGiven.push(question);
    lastQuestion = question;
    return question;
}

// Takes answer, checks if it's correct, then handles scoring and question tracking and moves to the next question.
function onAnswerBtnClick() {
    // Calculate whether the question was answered correctly
    // console.log(this.dataset.value);
    let correctAnswer = this.dataset.value == lastQuestion["correctAnswer"];

    if(correctAnswer) {
        score++;
    }
    else {
        timerValue -= 10;
        updateTimer();
    }

    lastQuestion.result = this.dataset.value;
    

    console.log(score);

    // Clear the quiz space
    clearQuiz();

    // Build the next question if one was given
    let nextQuestion = selectQuestion();
    if(nextQuestion) buildQuestion(nextQuestion);
}

// Takes answer, checks it, then handles scoring and quetsion tracking and moves to the next question.
function onSubmitBtnClick() {
    // Store the users answer
    let answer = this.parentElement.children[1].value;
    
    // Calculate whether the question was answered correctly
    let correctAnswer = answer === lastQuestion.answer;

    // Increment score if correct
    if(correctAnswer) score++;
    else {
        timerValue -= 10;
        updateTimer();
    }
    lastQuestion.result = answer;
    console.log(answer);
    console.log(score);

    // Build the next question
    clearQuiz();
    let nextQuestion = selectQuestion();
    buildQuestion(nextQuestion);
}

// Builds endGame screen.
function buildEndGame() {
    // Create the score header
    let scoreEl = document.createElement("h2");
    scoreEl.setAttribute("class", "final-score");
    scoreEl.innerHTML = "Final Score: " + score;
    quizSpace.appendChild(scoreEl);

    // Create the initials form
    let initialsContainer = document.createElement("div");
    initialsContainer.setAttribute("class", "initials-container");

    let initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("class", "initials-label");
    initialsLabel.innerHTML = "Initials: ";
    initialsContainer.appendChild(initialsLabel);

    let initialsField = document.createElement("input");
    initialsField.setAttribute("class", "initials-field");
    initialsField.setAttribute("type", "text");
    initialsContainer.appendChild(initialsField);

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "submit-btn");
    submitBtn.innerHTML = "Submit";
    initialsContainer.appendChild(submitBtn);

    quizSpace.appendChild(initialsContainer);

    // Set event for submit button
    submitBtn.addEventListener("click", submitInitials);

}

// Adds initials and score local storage, then moves to high score menu.
function submitInitials() {
    // Get the initials
    let initials = this.parentElement.children[1].value;

    // Store the initial/score pair in the local storage
    // BUG: if someone enters the same initials, their score will overwrite the previous.
    recordScore(initials, score);

    // Build the high score page and set up the tabs for review and high scores
    clearQuiz();
    buildScoreReviewTabs();
    buildHighScores();
}

// Record the given score and initials if applicable.
function recordScore(initials, score) {
    // Load the high score data
    let scoresObj = JSON.parse(localStorage.getItem("quizScores"));

    // Check if the player is recorded, and if so return their index
    playerIndex = scoresObj.players.indexOf(initials);
    // If the player doesn't exist there, add them
    if(playerIndex === -1 ) {
        scoresObj.players.push(initials);
        scoresObj.scores.push(score);
    }
    // otherwise, if the recorded score is lower than the given, replace it
    else if(scoresObj.scores[playerIndex] < score) {
        scoresObj.scores[playerIndex] = score;
    }

    localStorage.setItem("quizScores", JSON.stringify(scoresObj));
}

// Build the high score table.
function buildHighScores() {
    // Add a header
    let highScoreHeader = document.createElement("h2");
    highScoreHeader.setAttribute("class", "high-score");
    highScoreHeader.innerHTML = "High Scores";
    quizSpace.appendChild(highScoreHeader);

    // Add a table for high scores
    let highScoreTable = document.createElement("table");
    highScoreTable.setAttribute("class", "high-score-table");

    // Add a header row
    let firstRow = document.createElement("tr");

    let firstRowInitials = document.createElement("th");
    firstRowInitials.innerHTML = "Initials";
    firstRow.appendChild(firstRowInitials);

    let firstRowScore = document.createElement("th");
    firstRowScore.innerHTML = "Score";
    firstRow.appendChild(firstRowScore);

    highScoreTable.appendChild(firstRow);

    // For each initial/score pair in the high scores, add a row
    let scoresObj = JSON.parse(localStorage.getItem("quizScores"));

    for(let i=0; i<scoresObj.players.length; i++) {
        let initials = scoresObj.players[i];
        let highScore = scoresObj.scores[i];

        let newRow = document.createElement("tr");

        let newRowInitials = document.createElement("td");
        newRowInitials.innerHTML = initials;
        newRow.appendChild(newRowInitials);

        let newRowScore = document.createElement("td");
        newRowScore.innerHTML = highScore;
        newRow.appendChild(newRowScore);

        highScoreTable.appendChild(newRow);
    }

    quizSpace.appendChild(highScoreTable);

}

// Build review score tabs.
function buildScoreReviewTabs() {
    // make 2 buttons for review and high score tabs, and set their ids
    let reviewTab = document.createElement("div");
    let scoresTab = document.createElement("div");
    reviewTab.innerHTML = "Review";
    scoresTab.innerHTML = "High Scores";
    reviewTab.setAttribute("id", "review-tab");
    scoresTab.setAttribute("id", "scores-tab");

    // Add event listeners for the buttons
    reviewTab.addEventListener("click", function(event) {
        // If the tab isn't active, clear out the score and build the review page.
        if(this.dataset.state != "active") {
            clearQuiz();
            buildReviewTab();
            this.dataset.state = "active";
            event.target.parentElement.children[1].dataset.state = "inactive";
        }
    });
    scoresTab.addEventListener("click", function(event) {
        // If the tab isn't active, clear out the review and build the score page.
        if(this.dataset.state != "active") {
            clearQuiz();
            clearReviewQuestionButtons();
            buildHighScores();
            this.dataset.state = "active";
            event.target.parentElement.children[0].dataset.state = "inactive";
        }
    });

    // Set the initial state of the buttons 
    reviewTab.dataset.state = "inactive";
    scoresTab.dataset.state = "active";

    // Add the buttons to the page
    tabsSpace.appendChild(reviewTab);
    tabsSpace.appendChild(scoresTab);
}

// Build Question review.
function buildReviewTab() {
    //
    // Build list of questions given with symbol showing right or wrong
    let questionsEl = document.createElement("ul");
    for(i=0; i<questionsGiven.length; i++) {
        // Create element for styling
        let questionParentEl = document.createElement("li");
        let questionEl = document.createElement("button");
        questionParentEl.appendChild(questionEl);
        questionEl.setAttribute("class", "question-review-btn");

        // Used for click event
        questionEl.dataset.state = "inactive"; 
        questionEl.dataset.question = JSON.stringify(questionsGiven[i]);
        
        // Set the symbol within the element and styling for correct or incorrect
        let innerText;
        console.log(questionsGiven);
        if(questionsGiven[i].result == questionsGiven[i].correctAnswer) {
            innerText = "???";
            questionEl.setAttribute("class", questionEl.getAttribute("class")+" correct")
        }
        else {
            innerText = "X";
            questionEl.setAttribute("class", questionEl.getAttribute("class")+" incorrect")
        }
        questionEl.innerHTML = innerText;

        questionEl.addEventListener("click", onQuestionReviewButtonClick);

        questionsEl.appendChild(questionEl);
    }

    // Build the first question and set the first question in the list to be active
    buildReviewQuestion(questionsGiven[0]);
    questionsEl.children[0].dataset.state = "active";

    // Add the questions to the page
    reviewQuestionSpace.appendChild(questionsEl);
}

// Displays the selected question.
function onQuestionReviewButtonClick(event) {
    if(this.dataset.state != "active") {
        clearQuiz();
        buildReviewQuestion(JSON.parse(this.dataset.question));
        // Set other buttons to inactive
        console.log(event.target.parentElement.children.length);
        for(let i=0; i<event.target.parentElement.children.length; i++) {
            event.target.parentElement.children[i].dataset.state = "inactive";
        }
        this.dataset.state = "active";
    }
}

// Clears review question buttons.
function clearReviewQuestionButtons() {
    reviewQuestionSpace.innerHTML = "";
}

// build the question for review.
function buildReviewQuestion(question) {

    // Make the question text
    let questionTextEl = document.createElement("h2");
    questionTextEl.setAttribute("class", "question-text");
    questionTextEl.innerHTML = question.questionText;
    quizSpace.appendChild(questionTextEl);

    // Handle the number of answers for each question type
    let answersEl = document.createElement("section");
    answersEl.setAttribute("class", "answers");

    switch(question.type) {
        case "short-answer":
            // Short answer questions
            // Display the given answer and the correct answer.
            let givenAnswer = question.result;
            let correctAnswer = question.correctAnswer;

            let givenAnswerEl = document.createElement("span");
            correctAnswerEl = document.createElement("span");
            givenAnswerEl.innerHTML = "Given: " + givenAnswer;
            correctAnswerEl.innerHTML = "Correct: " + correctAnswer;
            givenAnswerEl.setAttribute("class", "short-answer");
            correctAnswerEl.setAttribute("class", "short-answer");

            if(givenAnswer === correctAnswer) {
                givenAnswerEl.setAttribute("class", givenAnswerEl.getAttribute("class") + " correct");
            }
            else {
                givenAnswerEl.setAttribute("class", givenAnswerEl.getAttribute("class") + " incorrect");
            }
            answersEl.appendChild(givenAnswerEl);
            answersEl.append(correctAnswerEl);
            break;

        case "multiple-choice":
            // Multiple choice questions
            // Display each of the answers, hilighting the correct answer and the chosen answer
            for(i=0; i<question.answers.length; i++) {
                let answerBtn = document.createElement("button");
                answerBtn.setAttribute("class", "review-button");
                answerBtn.textContent = question.answers[i];

                // Add extra styling for correct or incorrect
                if(i+1 == question.correctAnswer) {
                    // Add the correct class
                    answerBtn.setAttribute("class", answerBtn.getAttribute("class") + " correct");
                }
                else if (question.result == i+1) {
                    // Add the incorrect class
                    answerBtn.setAttribute("class", answerBtn.getAttribute("class") + " incorrect");
                }

                answersEl.appendChild(answerBtn);
            }
            break;
    }

    quizSpace.appendChild(answersEl);

    // Add explainations of answers
    let explainationEl = document.createElement("p");
    explainationEl.setAttribute("class", "explaination");
    explainationEl.innerHTML = question.explaination;

    quizSpace.appendChild(explainationEl);
}