let welcomePopup = document.getElementById('welcome-popup');
let questionContainer = document.getElementById('question-container');
let startBtn = document.querySelector('button[type="submit"]');
let imageContainer = document.getElementById('image-container');
let nextBtn = document.getElementById('next-btn');
let labelElement = document.querySelector('label');
let username = document.getElementById('username');


// The start button begins the game and stores the username value. If the username value is empty 
// then the function will not execute.

startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (document.getElementById('username').value.trim() === '') {
        username.style.border = '2px solid red';
        labelElement.classList.add('attention');
        return;
    }

    questionContainer.classList.remove('d-none');
    welcomePopup.classList.add('d-none');
    username = document.getElementById('username').value;
});