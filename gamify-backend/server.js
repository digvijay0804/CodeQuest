const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const storyRoutes = require("./routes/storyRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config(); // ✅ Load .env variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // optional, allows cross-origin requests
});

// ✅ Connect MongoDB from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Import Routes
const codeClashRoutes = require("./routes/codeClashRoutes");

// ====== Leaderboard-related models (ADDED) ======
const CodeClashQuestion = require("./models/CodeClashQuestion"); // used to validate answers
const Score = require("./models/score"); // stores scores per room & player

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/codeclash", codeClashRoutes);
// ✅ API Routes
app.use("/api/codeclash", codeClashRoutes);
app.use("/api/story", storyRoutes);        // <-- story module
app.use("/api/questions", questionRoutes); // <-- MCQ module

// ====== Leaderboard HTTP API (ADDED) ======
// GET /api/leaderboard           -> global top (all rooms)
// GET /api/leaderboard?room=ABC  -> top players for room ABC
app.get("/api/leaderboard", async (req, res) => {
  try {
    const room = req.query.room;
    const filter = room ? { roomCode: room } : {};
    // Return sorted by score desc
    const scores = await Score.find(filter).sort({ score: -1 }).limit(100);
    res.json({ success: true, data: scores });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ✅ Store rooms and their players
const rooms = {};

// ✅ Serve frontend files (must come after API routes)
app.use(express.static(path.join(__dirname, "Frontend")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Create Room
  socket.on("createRoom", (playerName) => {
    // Generate 6-char uppercase room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    rooms[roomCode] = {
      players: [{ id: socket.id, name: playerName, score: 0 }],
    };

    socket.join(roomCode);

    // Send room code back to creator
    socket.emit("roomCreated", roomCode);
    console.log(`Room ${roomCode} created by ${playerName}`);
  });

  // ✅ Join Room
  socket.on("joinRoom", ({ roomCode, playerName }) => {
    if (!rooms[roomCode]) {
      socket.emit("errorMessage", "Room does not exist!");
      return;
    }

    rooms[roomCode].players.push({
      id: socket.id,
      name: playerName,
      score: 0,
    });
    socket.join(roomCode);

    // Notify all players in the room about the new player
    io.to(roomCode).emit("playerJoined", `${playerName} joined the room!`);

    // Notify joining player that they joined successfully
    socket.emit("roomJoined", roomCode);

    console.log(`${playerName} joined room ${roomCode}`);
  });

  // ✅ Start Test
  socket.on("startTest", (roomCode) => {
    if (!rooms[roomCode]) return;
    io.to(roomCode).emit("redirectToTest", roomCode);
    console.log(`Test started in room ${roomCode}`);
  });

  // ====== Submit Answers: calculate score, save, and broadcast leaderboard (ADDED) ======
  // Expecting: { roomCode, playerName, answers } where answers keys are q0, q1, ...
  socket.on("submitAnswers", async ({ roomCode, playerName, answers }) => {
    try {
      if (!roomCode || !playerName || !answers) {
        console.warn("submitAnswers missing data");
        return;
      }

      // Fetch questions in same order used by frontend
      const questions = await CodeClashQuestion.find().limit(100); // limit to a safe number

      let score = 0;
      questions.forEach((q, idx) => {
        const key = `q${idx}`;
        // Only count if answer present and matches correctAnswer
        if (answers[key] && answers[key] === q.correctAnswer) {
          score += 1; // 1 point per correct answer (adjust if you want different scoring)
        }
      });

      // Save/update score in DB (per room + player)
      await Score.findOneAndUpdate(
        { roomCode, playerName },
        { score },
        { upsert: true, new: true }
      );

      console.log(`${playerName} scored ${score} in room ${roomCode}`);

      // Send latest per-room leaderboard to everyone in the room
      const roomLeaderboard = await Score.find({ roomCode }).sort({ score: -1 });
      io.to(roomCode).emit("leaderboardData", roomLeaderboard);

      // Optional: also send a compact update event
      io.to(roomCode).emit("scoreUpdate", { playerName, score });

      // Also update in-memory room players (if exists) so in-memory view remains consistent
      if (rooms[roomCode]) {
        const p = rooms[roomCode].players.find(pl => pl.name === playerName);
        if (p) p.score = score;
      }
    } catch (err) {
      console.error("Error saving/calculating score:", err);
    }
  });

  // ====== Provide leaderboard on request (ADDED) ======
  socket.on("getLeaderboard", async (roomCode) => {
    try {
      if (!roomCode) {
        // send global top
        const globalTop = await Score.find().sort({ score: -1 }).limit(100);
        socket.emit("leaderboardData", globalTop);
      } else {
        const roomLeaderboard = await Score.find({ roomCode }).sort({ score: -1 });
        socket.emit("leaderboardData", roomLeaderboard);
      }
    } catch (err) {
      console.error("Error fetching leaderboard for socket:", err);
    }
  });

  // ✅ Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Optional: Remove player from rooms if needed
  });
});

// ✅ Use PORT from .env or fallback 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🎮 CodeClash backend running on http://localhost:${PORT}`);
});
