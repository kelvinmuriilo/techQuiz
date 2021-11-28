// initial data
let currentQuestion = 0;
let correctAnswers = 0;
let audioIsEnable = true;
let isDisplayHome = true;
let isDisplayQuestion = false;
let isDisplayEnd = false;


// events
document.querySelector(".scoreArea button").addEventListener("click", reset);
document.querySelector(".startButton").addEventListener("click", showQuestion);
document.querySelector(".volume").addEventListener("click", changeSoundMode);

const audioCls = new Audio("./assets/sounds/start.mpeg");
/* setInterval(() => {
  audioCls.play();
}, 1000); */

document.querySelector(
  ".volume"
).innerHTML = `<i class="fas fa-volume-up"></i>`;

// functions
function showQuestion() {
  isDisplayHome = false;
  isDisplayQuestion = true;
  isDisplayEnd = false;

  playMainSound();

  document.querySelector(".homeArea").style.display = "none";
  document.querySelector(".progress").style.display = "block";
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector(".progress--bar").style.width = `${pct}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;

    let optionsHtml = "";

    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option" id="option-${i}"><span>${
        Number(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(event) {
  let clickedOption = parseInt(event.target.getAttribute("data-op"));

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
    markCorrectAnswer(`option-${clickedOption}`);
  } else {
    markWrongAnswer(`option-${clickedOption}`);
  }

  currentQuestion++;
  setTimeout(() => {
    showQuestion();
  }, 180);
}

function markCorrectAnswer(clickedOptionId) {
  const selectedOption = document.getElementById(clickedOptionId);
  selectedOption.style.backgroundColor = "#077a26";
}

function markWrongAnswer(clickedOptionId) {
  const selectedOption = document.getElementById(clickedOptionId);
  selectedOption.style.backgroundColor = "#d41111";
}

function finishQuiz() {
  playEndSound()
  const points = Math.floor((correctAnswers / questions.length) * 100);
  const scoreText1 = document.querySelector(".scoreText1");
  const scorePct = document.querySelector(".scorePct");
  const prizeImage = document.querySelector(".prizeImage");
  const winArea = document.querySelector(".winArea");

  isDisplayHome = false;
  isDisplayHome = false;
  isDisplayEnd = true;


  if (points < 30) {
    scoreText1.innerHTML = "Você se saiu mal";
    scorePct.style.color = "#ff0000";
    prizeImage.src = "./assets/YouLose.gif";
    playEndSound()
  } else if (points >= 30 && points < 70) {
    prizeImage.style.display = "none";
    scoreText1.innerHTML = "Foi por muito pouco!";
    scorePct.style.color = "#ffff00";
    playEndSound()
  } else if (points >= 70) {
    prizeImage.src = "./assets/Trofeu.gif";
    winArea.style.display = "flex";
    scoreText1.innerHTML = "Parabéns!";
    scorePct.style.color = "#0d630d";
    playEndSound()
  }

  scorePct.innerHTML = `Acertou ${points}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você  acertou ${correctAnswers} de ${questions.length}.`;

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
}

//Sound control
function playMainSound() {
  document.getElementById("mainSound").play();
  document.getElementById("startSound").pause();
  document.getElementById("endSound").pause();
}

function playStartSound() {
  document.getElementById("startSound").play();
  document.getElementById("mainSound").pause();
}

function playEndSound() {
  document.getElementById("endSound").pause();
  document.getElementById("endSound").currentTime = 0;
  document.getElementById("mainSound").pause();
  document.getElementById("endSound").play();
}

function muteSound() {
  const audioElements = document.getElementsByTagName("audio");

  for (var i = 0; i < audioElements.length; ++i) {
    audioElements[i].muted = true;
  }
}

function unmuteSound() {
  if (isDisplayHome) {
    document.getElementById("startSound").muted = false;
  }

  if (isDisplayQuestion) {
    document.getElementById("mainSound").muted = false;
  }

  if (isDisplayEnd) {
    document.getElementById("endSound").muted = false;
  }
}

function changeSoundMode() {
  audioIsEnable = !audioIsEnable;

  if (audioIsEnable) {
    unmuteSound();
    document.querySelector(
      ".volume"
    ).innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    muteSound();
    document.querySelector(
      ".volume"
    ).innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}
//End sound control

function reset() {
  correctAnswers = 0;
  currentQuestion = 0;
  window.location.assign("./index.html")
}
