// ✅ Connect socket
const socket = io();

// ✅ Get room and player from query params
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("room");
const playerName = urlParams.get("name");

// ✅ DOM Elements
const quizForm = document.getElementById("quizForm");
const timerDiv = document.getElementById("timer");
const submitBtn = document.getElementById("submitBtn");

let timeLeft = 1800; // 30 minutes
let timer;

// ✅ Countdown Timer
function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswers();
    }
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;
    timerDiv.innerText = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    timeLeft--;
  }, 1000);
}

// ✅ Fetch Questions from Backend
async function loadQuestions() {
  try {
    const res = await fetch("/api/codeclash/questions");
    const data = await res.json();

    if (!data.success || !data.data) {
      quizForm.innerHTML = "<p>⚠️ No questions found. Please try again later.</p>";
      return;
    }

    const questions = data.data;
    quizForm.innerHTML = "";

    questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.classList.add("question-panel");

      div.innerHTML = `
        <p><b>Q${i + 1}:</b> ${q.question}</p>
        ${q.options
          .map(
            (opt) => `
          <label>
            <input type="radio" name="q${i}" value="${opt}" required /> ${opt}
          </label><br>`
          )
          .join("")}
      `;
      quizForm.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching questions:", err);
    quizForm.innerHTML = "<p>⚠️ Error loading questions.</p>";
  }
}

// ✅ Submit Answers
function submitAnswers() {
  clearInterval(timer);
  const formData = new FormData(quizForm);
  let answers = {};
  for (let [key, value] of formData.entries()) {
    answers[key] = value;
  }
  socket.emit("submitAnswers", { roomCode, playerName, answers });
  // redirect to leaderboard
  window.location.href = "/leaderboard.html?room=" + roomCode;

}

// ✅ Event Listeners
submitBtn.addEventListener("click", submitAnswers);

// ✅ Init
loadQuestions();
startTimer();
