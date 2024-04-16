const questions = [];
const totalQuestions = 5;
const maxNumber = 10;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    const answer = num1 + num2;
    const options = shuffleArray([answer, getRandomNumber(maxNumber * 2), getRandomNumber(maxNumber * 2)]);

    const question = {
        questionText: `What is ${num1} + ${num2}?`,
        options: options,
        correctAnswer: answer
    };

    return question;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function displayQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.textContent = question.questionText;

    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionElement.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const messageElement = document.getElementById('message');
    if (selectedAnswer == correctAnswer) {
        messageElement.textContent = 'Correct! Well done!';
    } else {
        messageElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    }
}

let currentQuestionIndex = 0;

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        const question = generateQuestion();
        displayQuestion(question);
        currentQuestionIndex++;
        document.getElementById('message').textContent = '';
    } else {
        document.getElementById('question').textContent = 'Quiz completed! Good job!';
        document.getElementById('options').innerHTML = '';
        document.getElementById('message').textContent = '';
        document.querySelector('button').style.display = 'none';
    }
}

// Initialize the game
for (let i = 0; i < totalQuestions; i++) {
    questions.push(generateQuestion());
}

displayQuestion(questions[currentQuestionIndex]);