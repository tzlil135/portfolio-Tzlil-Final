// DOM variables

const gameStatus = document.querySelector('.wrapper');
const gameContainer = document.querySelector('.game-container');
const movesCounter = document.getElementById('moves-counter');
const timeCounter = document.getElementById('time-counter');
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const playAgainButton = document.getElementById('play-again');

// Game variables

let moves = 0;
let time = 0;
let firstCard = null;
let secondCard = null;
let winCounter = 0;

// Items array
const items = [
    { name: "clownFish", img: "./images/clown-fish.png" },
    { name: "elephant", img: "./images/elephant.png" },
    { name: "flamingo", img: "./images/flamingo.png" },
    { name: "hippo", img: "./images/hippo.png" },
    { name: "ladyBug", img: "./images/ladybug.png" },
    { name: "lion", img: "./images/lion.png" },
    { name: "mouse", img: "./images/mouse.png" },
    { name: "owl", img: "./images/owl.png" },
    { name: "pig", img: "./images/pig.png" },
    { name: "sheep", img: "./images/sheep.png" },
];

// Initial time
let seconds = 0;
let minutes = 0;

// Time function
let interval;
const timer = () => {
    seconds++; // Increment seconds by 1
    if (seconds >= 60) {
        seconds = 0;
        minutes++; // Increment minutes by 1 if seconds is greater than or equal to 60
    }
    let sec = seconds < 10 ? `0${seconds}` : seconds;
    let min = minutes < 10 ? `0${minutes}` : minutes;
    let time = `${min}:${sec}`;
    timeCounter.textContent = `Time: ${time}`;
};

const moveCounter = () => {
    moves++;
    movesCounter.textContent = `Moves: ${moves}`;
};

let cardValues = []; // מערך שיכיל את הערכים של הקלפים
// Pick random items from the array
const generateRandomItems = (cardsPairs = 8) => {
    let tempArray = [...items];  // העתקת המערך items
    // לולאת for יוצרת את כמות הקלפים לפי cardsPairs
    for (let i = 1; i <= cardsPairs; i++) {
        let randomIndex = Math.floor(Math.random() * tempArray.length);  // בוחרים קלף אקראי
        cardValues.push(tempArray[randomIndex]);  // מוסיפים את הקלף שנבחר למערך
        tempArray.splice(randomIndex, 1);  // מסירים את הקלף שנבחר כדי לא לבחור אותו שוב
    }

    return cardValues;  // מחזירים את הקלפים שנבחרו
};

// cards   // יוצרים את הקלפים 

const cardsBoard = () => {
    gameBoard.innerHTML = '';  // מאפס את הקונטיינר של הקלפים

    // משכפלים את הקלפים, ממערבבים ומציבים
    const cards = [...cardValues, ...cardValues];
    cards.sort(() => Math.random() - 0.5); // מערבבים את הקלפים

    // יוצר את הקלפים ומוסיף לכל קלף את מאפייני ה-DOM
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-container');
        cardElement.dataset.cardValue = card.name;

        // הוספת תוכן לכל קלף
        cardElement.innerHTML = `
            <div class="card-before">?</div>
            <div class="card-after">
                <img src="${card.img}" class="image" alt="${card.name}"> 
            </div>
        `;

        // הוספת הקלף ללוח
        gameBoard.appendChild(cardElement);
    });

    const allCards = document.querySelectorAll('.card-container');
    checkCards(allCards); // קורא לפונקציה שמוסיפה את המאזינים
};

// הוספת מאזיני אירועים לאחר יצירת הקלפים

const checkCards = (cards) => {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('matched') && !card.classList.contains('flipped')) {
                // כאשר לא נלחץ קלף ראשון
                if (!firstCard) {
                    firstCard = card; // מגדירים את הקלף הראשון
                    card.classList.add('flipped'); // מוסיפים קלאס לקלף
                } else {
                    secondCard = card; // מגדירים את הקלף השני
                    moveCounter();  // מוסיפים צעד
                    card.classList.add('flipped'); // מוסיפים קלאס לקלף
                    const firstCardValue = firstCard.getAttribute('data-card-value');
                    const secondCardValue = secondCard.getAttribute('data-card-value');

                    // בודקים אם הקלפים תואמים
                    if (firstCardValue === secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard = null;
                        secondCard = null;
                        winCounter++;
                        if (winCounter === cards.length / 2) {
                            gameStatus.style.display = 'flex';
                            gameStatus.innerHTML = `<h2>You Won</h2> <h4>Moves: ${moves}</h4> `;
                            gameContainer.style.display = 'none';
                            clearInterval(interval);
                            initGame();
                        }
                    } else {
                        let [tempFirstCard, tempSecond] = [firstCard, secondCard];
                        firstCard = null;
                        secondCard = null;
                        setTimeout(() => {
                            tempFirstCard.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 900);
                    }
                }
            }
        });
    });
}

// אתחול המשחק
const initGame = () => {
    moves = 0;
    time = 0;
    minutes = 0;
    seconds = 0;
    firstCard = null;
    secondCard = null;
    winCounter = 0;
    movesCounter.textContent = `Moves: ${moves}`;
    timeCounter.textContent = `Time: 00:00`;
    cardValues = generateRandomItems(); // בוחר קלפים אקראיים
    cardsBoard();  // קורא לפונקציה שמייצרת את הקלפים
};

document.addEventListener('DOMContentLoaded', () => {
    startButton.addEventListener('click', () => {
        gameStatus.style.display = 'none';
        gameContainer.style.display = 'flex';
        cardValues = [];
        initGame();
        timer();
        interval = setInterval(timer, 1000);
    });
});

stopButton.addEventListener('click', () => {
    gameStatus.style.display = 'flex';
    gameContainer.style.display = 'none';
    clearInterval(interval);
    cardValues = [];
    initGame();
});

