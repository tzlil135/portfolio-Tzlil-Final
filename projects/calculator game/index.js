const startBtn = document.getElementById('start-game');
const gameContainer = document.getElementById('game-container');
const question = document.getElementById('question');
const stats = document.getElementById('stats');
const h2 = document.getElementById('h2');
const score = document.getElementById('score');
const submit = document.getElementById('submit');
const check = document.getElementById('check');
const stopBtn = document.getElementById('stop-game');
const restartBtn = document.getElementById('restart');

let result = 0;
let correctCounter = 0;
let questionCounter = 0;


const randomQuestion = () => {
    let rndNum1 = Math.ceil(Math.random() * 10);
    let rndNum2 = Math.ceil(Math.random() * 10);

    let operator = ['+', '-', '*', '/'];
    let randomIndex = Math.floor(Math.random() * operator.length);

    if (operator[randomIndex] === '-') {

        if (rndNum1 < rndNum2) {
            [rndNum1, rndNum2] = [rndNum2, rndNum1];
        }
    } else if (operator[randomIndex] === '/') {

        while (rndNum2 === 0 || rndNum1 % rndNum2 !== 0) {
            rndNum1 = Math.ceil(Math.random() * 10);
            rndNum2 = Math.ceil(Math.random() * 10);
        }
    }

    switch (operator[randomIndex]) {
        case '+':
            result = rndNum1 + rndNum2;
            break;
        case '-':
            result = rndNum1 - rndNum2;
            break;
        case '*':
            result = rndNum1 * rndNum2;
            break;
        case '/':
            result = Math.floor(rndNum1 / rndNum2);
            break;
    }

    let displayOperator = operator[randomIndex] === '*' ? '\u00D7' :
        operator[randomIndex] === '/' ? ':' :
            operator[randomIndex];
    question.textContent = `${rndNum1} ${displayOperator} ${rndNum2} = `;
};


startBtn.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    startBtn.style.display = 'none';
    randomQuestion();
});

submit.addEventListener('click', () => {
    const userAnswer = Number(input.value);

    if (input.value.trim() === '') {
        check.textContent = 'Please enter a number!';
        return;
    } else if (!/^-?\d*\.?\d+$/.test(userAnswer)) {
        check.textContent = 'Please enter a valid number!';
        return;
    }

    if (userAnswer === result) {
        correctCounter++;
        check.textContent = 'Correct!';
    } else {
        check.textContent = 'Wrong!';
    }

    setTimeout(() => {
        check.textContent = '';
    }, 1000);

    questionCounter++;

    if (questionCounter < 10) {
        randomQuestion();
    } else {
        stats.style.display = 'flex';
        gameContainer.style.display = 'none';
        if (correctCounter === 10) {
            h2.textContent = `You Won 🎉`;
            score.textContent = `You answered correctly on all 10 questions!`;
        } else if (correctCounter >= 7) {
            h2.textContent = `almost there! 😃`;
            score.textContent = `You answered correctly on ${correctCounter} out of 10 questions.`;
        } else {
            h2.textContent = `You can do better! 😔`;
            score.textContent = `You answered correctly on ${correctCounter} out of 10 questions.`;
        }
    }

    input.value = '';
});


stopBtn.addEventListener('click', () => {
    stats.style.display = 'none';
    startBtn.style.display = 'flex';
    gameContainer.style.display = 'none';
    questionCounter = 0;
    correctCounter = 0;
    input.value = '';
});

restartBtn.addEventListener('click', () => {
    stats.style.display = 'none';
    gameContainer.style.display = 'flex';
    questionCounter = 0;
    correctCounter = 0;
    randomQuestion();
    input.value = '';
});


