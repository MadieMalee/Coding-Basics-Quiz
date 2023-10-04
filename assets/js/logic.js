//event listener to ensure that your code executes after the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () { 

    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz");
    const gameOverContainer = document.getElementById("game-over");
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers");
    const timerDisplay = document.getElementById("time-left");
    const scoreDisplay = document.getElementById("score");
    const initialsInput = document.getElementById("initials");
    const saveScoreButton = document.getElementById("save-score");

    const userData = [];

    let currentQuestionIndex = 0;
    let timeLeft = 30; 
    let score = 0;
    let timer;

// Quiz questions
    const questions = [
        {
            question: "What is a Syntax error?",
            answers: ["User error", "Error you'll never find", "Error caused by language rules being broken", "Wrong input error"],
            correct: "Error caused by language rules being broken", 
        },
        {
            question: "What is a short section of code written to complete a task?",
            answers: ["Function", "Buffer", "Array", "Loop"],
            correct: "Function", 
        },
        {
            question: "What is the format called that is used for storing and transporting data?",
            answers: ["HTML", "JSON", "Font", "Syntax"],
            correct:  "JSON"
        }
    ];

// Event listener for starting the quiz
    startButton.addEventListener("click", startQuiz);

// Event listener for saving the score
    saveScoreButton.addEventListener("click", saveScore);

    function startQuiz() {
        startButton.style.display = "none";
        quizContainer.classList.remove("hidden");
        showNextQuestion();
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
                clearInterval(timer);
                console.log(currentQuestionIndex)
                endGame();
            }
        }, 1000);
    }

    function showNextQuestion() {
        if (currentQuestionIndex <= questions.length) {
            const question = questions[currentQuestionIndex];
            questionText.textContent = question.question;
            answersContainer.innerHTML = "";

            for (let i = 0; i < question.answers.length; i++) {
                const answerButton = document.createElement("button");
                answerButton.textContent = question.answers[i];
                answerButton.addEventListener("click", (event) => {
                    var clickButton = event.target.textContent
                    checkAnswer(clickButton, question.correct);
                });
                answersContainer.appendChild(answerButton);
            }

        }
    }

    function checkAnswer(selectedIndex, correctIndex) {
        console.log("Selected Index", selectedIndex, "correct index", correctIndex)
        if (selectedIndex === correctIndex) {
            score++;
            console.log(score)
            currentQuestionIndex++;
            showNextQuestion();
        } else {
            timeLeft -= 10; //deduct time for wrong answer
            if (timeLeft <= 0) {
                timeLeft = 0;
            }
            currentQuestionIndex++;
            showNextQuestion();
        }
    }

    function endGame() {
        quizContainer.style.display = "none";
        gameOverContainer.style.display = "block";
        scoreDisplay.textContent = score;
    }

    function saveScore() {
        const initials = initialsInput.value.trim();
        if (initials !== "") {
            // Save the score and initials
            alert(`Score saved for ${initials}: ${score}`);
            initialsInput.value = "";
        }
    }
});