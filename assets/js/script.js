let welcomePopup = document.getElementById('welcome-popup');
let startBtn = document.querySelector('button[type="submit"]');
let questionContainer = document.getElementById('question-container');
let labelElement = document.querySelector('label');
let username = document.getElementById('username');
let imageContainer = document.getElementById('image-container');
let answerBtns = document.getElementById('answer-btns');
let nextBtn = document.getElementById('next-btn');
let currentQuestionIndex = 0;
let score = 0;
let outOfTen = document.getElementById('out-of-ten');
let rightOrWrong = document.getElementById('right-or-wrong');
let resultsContainer = document.getElementById('results-container');
let finalResult = document.getElementById('result');
let resultMessage = document.getElementById('result-message');
let tryAgainBtn = document.getElementById('try-again-btn');
let specialCharacters = /[!@#$£%=+%^&*/(),.?":{}|<>0-9]/;

// Questions array containing the question image(image1), correct answer image(image2), and answers for the buttons.

const questions = [
    {
        image1: "url(assets/images/answer-images/elephant-poo.webp)",
        image2: "url(assets/images/answer-images/elephant.webp)",
        answers: [
            {text: "Crocodile", correct: false},
            {text: "Elephant", correct: true},
            {text: "Dung Beatle", correct: false},
            {text: "Horse", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/sheep-poo.webp)",
        image2: "url(assets/images/answer-images/sheep.webp)",
        answers: [
            {text: "Parrot", correct: false},
            {text: "Zebra", correct: false},
            {text: "Bull", correct: false},
            {text: "Sheep", correct: true}
        ]
    },
    {
        image1: "url(assets/images/answer-images/bat-poo.webp)",
        image2: "url(assets/images/answer-images/bat.webp)",
        answers: [
            {text: "Rabbit", correct: false},
            {text: "Mouse", correct: false},
            {text: "Bat", correct: true},
            {text: "Budgie", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/whale-poo.webp)",
        image2: "url(assets/images/answer-images/whale.webp)",
        answers: [
            {text: "Whale", correct: true},
            {text: "Shark", correct: false},
            {text: "Dolphin", correct: false},
            {text: "Sea Lion", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/barn-owl-poo.webp)",
        image2: "url(assets/images/answer-images/barn-owl.webp)",
        answers: [
            {text: "Badger", correct: false},
            {text: "Barn Owl", correct: true},
            {text: "Kangaroo", correct: false},
            {text: "Anaconda", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/seagull-poo.webp)",
        image2: "url(assets/images/answer-images/seagull.webp)",
        answers: [
            {text: "Eagle", correct: false},
            {text: "Cat", correct: false},
            {text: "Seagull", correct: true},
            {text: "Penguin", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/toad-poo.webp)",
        image2: "url(assets/images/answer-images/toad.webp)",
        answers: [
            {text: "Toad", correct: true},
            {text: "Slug", correct: false},
            {text: "Hedgehog", correct: false},
            {text: "Fox", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/cow-poo.webp)",
        image2: "url(assets/images/answer-images/cow.webp)",
        answers: [
            {text: "Tiger", correct: false},
            {text: "Pony", correct: false},
            {text: "Bear", correct: false},
            {text: "Cow", correct: true}
        ]
    },
    {
        image1: "url(assets/images/answer-images/crocodile-poo.webp)",
        image2: "url(assets/images/answer-images/crocodile.webp)",
        answers: [
            {text: "Crocodile", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Leopard", correct: false},
            {text: "Squirrel", correct: false}
        ]
    },
    {
        image1: "url(assets/images/answer-images/caterpillar-poo.webp)",
        image2: "url(assets/images/answer-images/caterpillar.webp)",
        answers: [
            {text: "Bullet Ant", correct: false},
            {text: "Tarantula", correct: false},
            {text: "Bumble Bee", correct: false},
            {text: "Caterpillar", correct: true}
        ]
    },
];


/*  The start button begins the game and stores the username value. If the username value is empty 
    then the function will not execute and a warning will be displayed to the user.
    It will also execute the showQuestion function. */

startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (username.value.trim() === '') {
        username.style.border = '2px solid red';
        labelElement.classList.remove('attention-charset');
        labelElement.classList.add('attention');
        return;
    }

    if (specialCharacters.test(username.value) || username.value.length > 20) {
        username.style.border = '2px solid red';
        labelElement.classList.remove('attention');
        labelElement.classList.add('attention-charset');
        return;
    }

        questionContainer.classList.remove('d-none');
        welcomePopup.classList.add('d-none');
        username = username.value.trim().replace(/\s+/g, ' ');
        showQuestion();
    });


/*  The showQuestion function will display the the questions (images and answer buttons) by accessing their array index.
    It will also create answer buttons with the relative answers as the buttons' text and apply the selectAnswer function with
    a click event listener to each answer button. It will also execute the resetState function, which will remove 
    all the previous answer buttons from the previous question. */

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    imageContainer.style.backgroundImage = currentQuestion.image1;
    outOfTen.innerHTML = questionNo + '/10';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn", "answer-btn");
        answerBtns.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.classList.add('d-none');
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}


/*  The selectAnswer function will add the Correct or Incorrect CSS class respectively to the selected answer.
    It will also change the image1 (the question image) to image2 (the answer image).
    The heading text will change to Correct or Wrong respectively.
    All answer buttons will become disabled.
    The Next button will become displayed.
    If the currentQuestion index has reached its max length, the next button will have the text "See result" and
    will have the showResults function added to it as a click event listener. */

function selectAnswer(e) {
    imageContainer.style.backgroundImage = questions[currentQuestionIndex].image2;
    
    const selectedBtn = e.target;
    
    if (selectedBtn.dataset.correct === "true") {
        rightOrWrong.innerHTML = 'Correct!';
        rightOrWrong.classList.add('correct');
        score++;
    } else {
        rightOrWrong.innerHTML = 'Wrong!';
        rightOrWrong.classList.add('incorrect');
    }

    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }

        button.disabled = true;

        nextBtn.classList.remove('d-none');

        if (currentQuestionIndex + 1 === questions.length) {
            nextBtn.innerHTML = 'See Result';
            nextBtn.addEventListener('click', showResults);
        }
    });
}


/*  The next button will have a click event listener which will reset the heading to display the question
    "Who does the poo belong to?", and will execute the showQuestion function after incrementing the 
    currentQuestion index (if currentQuestion index has not reached its length). */

nextBtn.addEventListener('click', () => {
    rightOrWrong.classList.remove('correct', 'incorrect');
    rightOrWrong.innerHTML = 'Who does the poo belong to?';

    if (currentQuestionIndex + 1 < questions.length) {
        currentQuestionIndex++;
        showQuestion();
    }
});


/*  The showResults function removes the questionContainer and displayes the resultsContainer.
    It will display the score of the user and will provide a condition based comment for the user in respective 
    to how much they scored. */

function showResults() {
    questionContainer.classList.add('d-none');
    resultsContainer.classList.remove('d-none');

    let result, commentText;

    result = `You scored ${score}/10!`;

    switch (true) {
        case (score <= 4):
            commentText = `Terrible, ${username}, I'm never gonna trust you to offer me chocolate.`;
            break;
        case (score <= 6):
            commentText = `Fair play, ${username} that's not a bad effort.`;
            break;
        case (score <= 9):
            commentText = `Very impressive, ${username}! It seems like you know your stuff!`;
            break;
        default:
            commentText = `Urmmm, ${username}... I'm actually concerned that you got all those correct...`;
            break;
    }

    finalResult.innerHTML = result;
    resultMessage.innerHTML = commentText;
}


/*  The Try Again button will have a click event listener which will basically reset the whole game to be played again.
    It will reset score to 0, currentQuestionIndex to 0, remove the showResults event listener from the Next button,
    change the text of the next button from "See Results" back to "Next", hide the resultsContainer and reveal
    the question container, and finally execute the showQuestion function. */

tryAgainBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    nextBtn.removeEventListener('click', showResults);
    nextBtn.innerHTML = 'Next';
    resultsContainer.classList.add('d-none');
    questionContainer.classList.remove('d-none');
    showQuestion();
});