// ✅ Connect to socket.io server
const socket = io();

let roomCode = "";
let playerName = "";
let isCreator = false;

const playerNameInput = document.getElementById("playerName");
const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const roomCodeInput = document.getElementById("roomCode");
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
const statusDiv = document.getElementById("status");
const startTestWrapper = document.getElementById("startTestWrapper");
const startTestBtn = document.getElementById("startTestBtn");

// ✅ Create Room
createRoomBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (!playerName) return alert("Enter your name!");
  socket.emit("createRoom", playerName);
});

// ✅ Join Room
joinRoomBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  roomCode = roomCodeInput.value.trim();
  if (!playerName || !roomCode) return alert("Enter name and room code!");
  socket.emit("joinRoom", { roomCode, playerName });
});

// ✅ Listen room created
socket.on("roomCreated", (code) => {
  isCreator = true;
  roomCode = code;
  roomCodeDisplay.innerText = `Room Code: ${roomCode}`;
  statusDiv.innerText = "Room created. Share the code with friends!";
  startTestWrapper.classList.remove("hidden");
});

// ✅ Listen room joined
socket.on("roomJoined", (code) => {
  roomCode = code;
  statusDiv.innerText = `Joined room: ${roomCode}`;
});

// ✅ Player joined notification
socket.on("playerJoined", (msg) => {
  statusDiv.innerText = msg;
});

// ✅ Start Test Button
startTestBtn.addEventListener("click", () => {
  if (!isCreator) return;
  socket.emit("startTest", roomCode);
});

// ✅ Redirect when test starts
socket.on("redirectToTest", (code) => {
  window.location.href = `/test.html?room=${code}&name=${playerName}`;
});
