const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const gameContainer = document.getElementById('game-screen');
const boxRed = document.getElementById('box-red');
const boxBlue = document.getElementById('box-blue');
const boxYellow = document.getElementById('box-yellow');
const boxGreen = document.getElementById('box-green');
const gameOver = document.getElementById('game-over');
const moves = document.getElementById('steps');

const colors = [boxRed, boxBlue, boxYellow, boxGreen];
const sequence = [];
let isUserTurn = false;
const userSequence = [];
let movesCounter = 0;

const changeButtonColor = (color) => {
    color.style.transition = 'background-color 1s ease, box-shadow 1s ease';
    if (color === boxRed) {
        color.style.backgroundColor = 'rgb(252, 29, 0)';
        color.style.boxShadow = '0 0 20px rgba(252, 29, 0, 0.96)';
    } else if (color === boxBlue) {
        color.style.backgroundColor = 'rgb(0, 0, 252)';
        color.style.boxShadow = '0 0 20px rgba(0, 0, 252, 0.96)';
    } else if (color === boxYellow) {
        color.style.backgroundColor = 'rgb(252, 252, 0)';
        color.style.boxShadow = '0 0 20px rgba(252, 252, 0, 0.95)';
    } else if (color === boxGreen) {
        color.style.backgroundColor = 'rgb(0, 252, 0)';
        color.style.boxShadow = '0 0 20px rgba(0, 252, 0, 0.94)';
    }

    setTimeout(() => {
        color.style.backgroundColor = '';
        color.style.boxShadow = '';
    }, 500);
};

const playSound = (color) => {
    if (color === boxRed) {
        const sound = new Audio('sounds/a6-102820.mp3');
        sound.play();
    } else if (color === boxBlue) {
        const sound = new Audio('sounds/c6-102822.mp3');
        sound.play();
    } else if (color === boxYellow) {
        const sound = new Audio('sounds/e6-82016.mp3');
        sound.play();
    } else if (color === boxGreen) {
        const sound = new Audio('sounds/f6-102819.mp3');
        sound.play();
    }
};
let isPlayingSequence = false;
const playSequence = () => {
    isUserTurn = false;
    isPlayingSequence = true;
    let delay = 0;

    sequence.forEach((color, index) => {
        setTimeout(() => {
            changeButtonColor(color);
            playSound(color);
        }, delay);
        delay += 1000;
    });

    setTimeout(() => {
        isPlayingSequence = false;
        isUserTurn = true;
    }, delay);
};



const randomSequence = () => {
    const randomBox = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomBox);
    playSequence();


    setTimeout(() => {
        isUserTurn = true;
    }, 1000);
};

const compareSequence = () => {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            isUserTurn = false;
            const sound = new Audio('sounds/error-126627.mp3');
            sound.play();
            setTimeout(() => {
                gameOver.style.display = 'flex';
                gameContainer.style.display = 'none';
            }, 2000);
            userSequence.length = 0;
            return;
        }
    }

    if (userSequence.length === sequence.length) {
        movesCounter++;
        powerUpSound();
        moves.innerText = `Moves: ${movesCounter}`;
        userSequence.length = 0;
        isUserTurn = false;
        setTimeout(() => {
            randomSequence();
        }, 1000);
    }
};

// make a power up sound after 5 moves

const powerUpSound = () => {
    if (movesCounter % 5 === 0 && movesCounter > 0) {
        const sound = new Audio('sounds/power-up-sparkle-1-177983.mp3');
        sound.play();
    }
};

startButton.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    startButton.style.display = 'none';
    randomSequence();
    moves.innerText = `Moves: ${movesCounter}`;
});


colors.forEach((colorBox) => {
    colorBox.addEventListener('click', () => {
        if (!isUserTurn || isPlayingSequence) return;
        changeButtonColor(colorBox);
        playSound(colorBox);
        userSequence.push(colorBox);
        compareSequence();
    });
});


restartButton.addEventListener('click', () => {
    gameOver.style.display = 'none';
    gameContainer.style.display = 'flex';
    sequence.length = 0;
    userSequence.length = 0;
    movesCounter = 0;
    moves.innerText = `Moves: ${movesCounter}`;
    randomSequence();
});



/*
כמה דברים לבדוק אותם
המשתנה איז טרו אני לא מביהנ כל כך אם אני בכלל צריכה אותו
אני צריכה שהמשתמש יכול ללחוץ רק אחרי שהרצף נגמר
גם אם המשחק נגמר הרצף לפעמים עדיין נמשך ואז זה יכול להיות בעיה
*/

// להוסיף שבכל 5 צעדים המשתמש כאילו עולה שלב יושמע צליל ברגע שמספר הצעדים יהיה חמישה ואז יתאפשר למשתמש ללחוץ על הכפתורים

