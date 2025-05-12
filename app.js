let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];

let level = 0;
let started = false;
let highestScore = 0;

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("userPressed");

    setTimeout(function () {
        btn.classList.remove("userPressed");
    }, 400);
}

function levelUp() {
    userSeq = [];
    level++;
    document.querySelector("p").innerText = `Level ${level}`;
    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randBtn = document.querySelector(`#${randomColor}`);

    gameSeq.push(randomColor);
    gameFlash(randBtn);
}

function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highestScore) {
            highestScore = level;
            document.querySelector("#high-score").innerText = `Highest Score: ${highestScore}`;
        }

        document.querySelector("p").innerHTML = `Game Over! Your Score is : <b>${level}</b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPressed() {
    if (!started) return;
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}