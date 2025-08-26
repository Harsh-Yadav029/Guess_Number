let randomNumber = (parseInt(Math.random() * 100 + 1));

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const loworhi = document.querySelector('.lowOrHi');
const startover = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numberGuess = 1;
let playgame = true;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please Enter a valid number');
    }
    else if (guess < 1) {
        alert('Please Enter a number more than 1');
    }
    else if (guess > 100) {
        alert('Please Enter a number less than 100');
    }
    else {
        prevGuess.push(guess);
        if (numberGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game over 😢. Random number was ${randomNumber}`, "orange");
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`🎯 You guessed it right!`, "green");
        celebrateWin();
        playSound("win");
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage(`📉 Number is TOO low`, "red");
        playSound("wrong");
    }
    else if (guess > randomNumber) {
        displayMessage(`📈 Number is TOO high`, "red");
        playSound("wrong");
    }

    // Give a hint after 5 guesses
    if (numberGuess === 6) {
        if (randomNumber <= 50) {
            displayMessage("💡 Hint: The number is between 1 and 50!", "blue");
        } else {
            displayMessage("💡 Hint: The number is between 51 and 100!", "blue");
        }
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numberGuess++;
    remaining.innerHTML = `${11 - numberGuess}`;
}

function displayMessage(message, color = "black") {
    loworhi.innerHTML = `<h2 style="color:${color}">${message}</h2>`;
}

// 🎉 Confetti effect
function celebrateWin() {
    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement("div");
        confetti.innerHTML = "🎉";
        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.fontSize = "24px";
        confetti.style.animation = "fall 2s linear";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

// 🔊 Sound effects
function playSound(type) {
    let audio;
    if (type === "win") {
        audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    } else {
        audio = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
    }
    audio.play();
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = '<h2 id="newGame" style = "cursor:pointer">🔄 Start New Game</h2>';
    startover.appendChild(p);
    playgame = false;
    newGame();
}

function newGame() {
    const newGamebutton = document.querySelector('#newGame');
    newGamebutton.addEventListener('click', function (e) {
        randomNumber = (parseInt(Math.random() * 100 + 1));
        prevGuess = [];
        numberGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numberGuess}`;
        userInput.removeAttribute('disabled');
        startover.removeChild(p);
        playgame = true;
        displayMessage("Game Restarted! 🎮 Guess again!", "yellow");
    })
}
