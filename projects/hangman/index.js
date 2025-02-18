const letters = document.getElementById('letters');
const fruits = document.getElementById('fruits');
const animals = document.getElementById('animals');
const countries = document.getElementById('countries');
const wordContainer = document.querySelector('#word-container');
const buttons = document.querySelectorAll('.btn');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const statsContainer = document.querySelector('.stats-container');
const stats = document.getElementById('stats');
const massage = document.getElementById('massage');
const playAgainBtn = document.querySelector('#playAgain');
const layer = document.getElementById('layer');


let options = {
    // number of letters in the word should be more than 6 
    fruit: ['strawberry', 'pineapple', 'blueberry', 'watermelon', 'cantaloupe', 'blackberry'],
    animal: ['elephant', 'giraffe', 'kangaroo', 'alligator', 'chimpanzee', 'hippopotamus'],
    countrie: ['australia', 'argentina', 'brazilian', 'canadian', 'colombia', 'switzerland']
};

let word = '';
let hidenWord = '';
let correctLetterCount;
let wrongLetterCount;


import { drawHangman, drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg } from './hangman.js';

// resize the canvas


// event listener for the options

const startGame = (category) => {
    word = options[category][Math.floor(Math.random() * options[category].length)];
    createLetterButtons();
    hideWord();
    drawHangman(ctx, canvas);
    correctLetterCount = 0;
    wrongLetterCount = 0;
};

fruits.addEventListener('click', () => startGame('fruit'));
animals.addEventListener('click', () => startGame('animal'));
countries.addEventListener('click', () => startGame('countrie'));


buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(button => button.classList.remove('btn-after-click'));
        buttons.forEach(button => button.disabled = true);
        btn.classList.add('btn-after-click');
    });
});


// a function to create the letter buttons

const createLetterButtons = () => {
    letters.style.display = 'flex';
    letters.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = document.createElement('button');
        letter.textContent = String.fromCharCode(i);
        letter.classList.add('letter');
        letters.appendChild(letter);
    }
};

// function to make the word hidden

const hideWord = () => {
    const wordArray = word.split('');
    hidenWord = wordArray.map(letter => {
        return letter = '_';
    }).join('');
    wordContainer.textContent = hidenWord;
};


// Array to store the functions for drawing hangman parts

const hangmanParts = [drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

// Add event delegation for letter buttons

letters.addEventListener('click', (e) => {
    if (!e.target.classList.contains('letter') || e.target.disabled) return;

    const clickedLetter = e.target.textContent.toLowerCase();
    e.target.disabled = true;
    checkLetter(clickedLetter);
});

// function to check if the letter is in the word

const checkLetter = (letter) => {
    let letterFound = false;
    let newHiddenWord = '';

    for (let i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() === letter) {
            newHiddenWord += word[i];
            letterFound = true;
            correctLetterCount++;
        } else {
            newHiddenWord += hidenWord[i];
        }
    }

    hidenWord = newHiddenWord;
    wordContainer.textContent = hidenWord;

    if (!letterFound) {
        wrongLetterCount++;
        if (wrongLetterCount <= hangmanParts.length) {
            hangmanParts[wrongLetterCount - 1](ctx);
        }
    }

    checkGameStatus();
};

const disableAllLetters = () => {
    const letterButtons = document.querySelectorAll('.letter');
    letterButtons.forEach(button => button.disabled = true);
};

// check if the word is guessed or the player lost

const checkGameStatus = () => {

    if (!hidenWord.includes('_')) {
        disableAllLetters();
        statsContainer.style.display = 'block';
        layer.style.display = 'block';
        stats.innerHTML = 'You Win!';
        massage.innerHTML = `The word was: ${word}`;
    }

    if (wrongLetterCount >= hangmanParts.length) {
        disableAllLetters();
        statsContainer.style.display = 'block';
        layer.style.display = 'block';
        stats.innerHTML = 'You Lose!';
        massage.innerHTML = `The word was: ${word}`;
    }
};

// Play again button

playAgainBtn.addEventListener('click', () => {
    statsContainer.style.display = 'none';
    layer.style.display = 'none';
    correctLetterCount = 0;
    wrongLetterCount = 0;
    word = '';
    hidenWord = '';
    wordContainer.textContent = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('btn-after-click');
    });

    letters.style.display = 'none';
    correctLetterCount = 0;
    wrongLetterCount = 0;
});

