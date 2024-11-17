let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function addQuestion() {
    const questionText = document.getElementById('question').value;
    const optionsText = document.getElementById('options').value.split(',');
    const correctAnswer = document.getElementById('correct-answer').value.trim();

    if (questionText && optionsText.length > 0 && correctAnswer) {
        questions.push({ question: questionText, options: optionsText, correctAnswer });
        updateQuestionList();
        clearInputs();
    } else {
        alert("لطفا همه فیلدها را پر کنید.");
    }
}

function updateQuestionList() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
        questionList.innerHTML += <li>${q.question} - <button onclick="deleteQuestion(${index})">حذف</button></li>;
    });
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    updateQuestionList();
}

function startQuiz() {
    if (questions.length === 0) {
        alert("لطفا حداقل یک سوال اضافه کنید.");
        return;
    }
    
    document.getElementById('quiz-builder').style.display = 'none';
    document.getElementById('quiz-taker').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('current-question').innerText = currentQuestion.question;
    document.getElementById('feedback').innerText = '';
    document.getElementById('score').innerText = امتیاز: ${score};
}

function submitAnswer() {
    const userAnswer = document.getElementById('user-answer').value.trim();
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        score++;
        document.getElementById('feedback').innerText = "پاسخ صحیح است!";
    } else {
        document.getElementById('feedback').innerText = پاسخ نادرست است! پاسخ صحیح: ${currentQuestion.correctAnswer};
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-taker').style.display = 'none';
    alert(آزمون تمام شد! نمره شما: ${score} از ${questions.length});
}

// اضافه کردن دکمه شروع آزمون
const startButton = document.createElement('button');
startButton.innerText = 'شروع آزمون';
startButton.onclick = startQuiz;
document.getElementById('quiz-builder').appendChild(startButton);