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
            {text: "Penguine", correct: false}
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



// The start button begins the game and stores the username value. If the username value is empty 
// then the function will not execute and a warning will be displayed to the user.

startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (document.getElementById('username').value.trim() === '') {
        username.style.border = '2px solid red';
        labelElement.classList.add('attention');
        return;
    }

    questionContainer.classList.remove('d-none');
    welcomePopup.classList.add('d-none');
    username = username.value;
    showQuestion();
});

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
    })
};

function resetState() {
    nextBtn.classList.add('d-none');
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e) {
    imageContainer.style.backgroundImage = questions[currentQuestionIndex].image2;
    
    const selectedBtn = e.target;
    
    if (selectedBtn.dataset.correct === "true") {
        selectedBtn.classList.add('correct');
        rightOrWrong.innerHTML = 'Correct!';
        rightOrWrong.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
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
            
        }
    })
}

nextBtn.addEventListener('click', () => {
    rightOrWrong.classList.remove('correct', 'incorrect');
    rightOrWrong.innerHTML = 'Who does the poo belong to?';

    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        showQuestion();
    }
})