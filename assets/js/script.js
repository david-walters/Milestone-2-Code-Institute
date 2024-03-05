let welcomePopup = document.getElementById('welcome-popup');
let questionContainer = document.getElementById('question-container');
let startBtn = document.querySelector('button[type="submit"]');
let imageContainer = document.getElementById('image-container');
let nextBtn = document.getElementById('next-btn');
let username;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    questionContainer.classList.remove('d-none');
    welcomePopup.classList.add('d-none');
    username = document.getElementById('username').value;
});