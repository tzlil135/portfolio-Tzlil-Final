import { ImagesAnimation } from './animation.js';

ImagesAnimation(); // קריאה לפונקציה ImagesAnimation מהקובץ animation.js

const logIn = document.querySelector('.login');
const signIn = document.querySelector('.sign-in');
const GoToSignIn = document.querySelector('.sign-in-btn');
const GoToLogIn = document.querySelector('.already-signed-in');
const singInForm = document.querySelector('.sign-in-form');
const logInForm = document.querySelector('.login-form');

GoToLogIn.addEventListener('click', () => {
    signIn.style.display = 'none';
    logIn.style.display = 'block';

    singInForm.reset();
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
});

GoToSignIn.addEventListener('click', () => {
    logIn.style.display = 'none';
    signIn.style.display = 'block';

    logInForm.reset();
    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }
});

singInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('name').value;
    const username = document.getElementById('username2').value;
    const password = document.getElementById('password2').value;
    const email = document.getElementById('email').value;

    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }

    if (fullName === '' || username === '' || password === '' || email === '') {
        const errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'You must fill all the fields';

        singInForm.appendChild(errorMessage);
        return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.username === username) {
            const errorMessage = document.createElement('div');
            errorMessage.id = 'error-message';
            errorMessage.style.color = 'red';
            errorMessage.textContent = 'This username is already registered';

            singInForm.appendChild(errorMessage);
            return;
        }
    }

    const user = {
        fullName,
        username,
        password,
        email,
        isLoggedIn: true
    };

    localStorage.setItem('user', JSON.stringify(user));


    window.location.href = "./burger-vs-pizza/burger-vs-pizza.html";
});


logInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;

    const existingError = document.getElementById('error-message');
    if (existingError) {
        existingError.remove();
    }

    if (username === '' || password === '') {
        const errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'You must fill all the fields';

        logInForm.appendChild(errorMessage);
        return;
    }

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        const errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'No registered user found';
        logInForm.appendChild(errorMessage);
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.username !== username || user.password !== password) {
        const errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Invalid username or password';
        logInForm.appendChild(errorMessage);
        return;
    }

    user.isLoggedIn = true;
    window.location.href = "./burger-vs-pizza/burger-vs-pizza.html";
});