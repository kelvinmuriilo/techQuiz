// initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// events
document.querySelector(".scoreArea button").addEventListener("click", reset);

// functions
function showQuestion() {
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
  }, 1000);
}

function markAnswerSelected() {}

function markCorrectAnswer(clickedOptionId) {
  let selectedOption = document.getElementById(clickedOptionId);
  selectedOption.style.backgroundColor = "#03fc62";
}

function markWrongAnswer(clickedOptionId) {
  let selectedOption = document.getElementById(clickedOptionId);
  selectedOption.style.backgroundColor = "#942329";
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points < 30) {
    document.querySelector(".scoreText1").innerHTML = "Você se saiu mal";
    document.querySelector(".scorePct").style.color = "#ff0000";
  } else if (points >= 30 && points < 70) {
    document.querySelector(".scoreText1").innerHTML = "Foi por muito pouco!";
    document.querySelector(".scorePct").style.color = "#ffff00";
  } else if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Parabéns!!";
    document.querySelector(".scorePct").style.color = "#0d630d";
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você  acertou ${correctAnswers} de ${questions.length}.`;

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
}

function reset() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
