// sockets/clashSocket.js
const { nanoid } = require("nanoid"); // npm install nanoid

// in-memory room store
const rooms = {};

module.exports = (io) => {
  const clash = io.of("/clash");

  clash.on("connection", (socket) => {
    console.log("🔥 Player connected:", socket.id);

    // --- CREATE ROOM ---
    socket.on("create:room", ({ username }, ack) => {
      const roomCode = nanoid(6).toUpperCase();
      rooms[roomCode] = { players: [] };

      const player = { id: socket.id, username, total: 0 };
      rooms[roomCode].players.push(player);
      socket.join(roomCode);

      // Ack back to creator
      ack({ success: true, roomCode });
      clash.to(roomCode).emit("room:joined", { roomCode, players: rooms[roomCode].players });
    });

    // --- JOIN ROOM ---
    socket.on("join:room", ({ username, roomCode }, ack) => {
      const room = rooms[roomCode];
      if (!room) return ack({ success: false, error: "Room not found" });

      const player = { id: socket.id, username, total: 0 };
      room.players.push(player);
      socket.join(roomCode);

      ack({ success: true, roomCode });
      clash.to(roomCode).emit("room:joined", { roomCode, players: room.players });
    });

    // --- START MATCH (host only) ---
    socket.on("start:match", ({ roomCode }, ack) => {
      const room = rooms[roomCode];
      if (!room) return ack({ success: false, error: "Room not found" });

      ack({ success: true });
      clash.to(roomCode).emit("match:start", { roundsMeta: [] });

      // for demo send one question after 2 sec
      setTimeout(() => {
        clash.to(roomCode).emit("round:question", {
          roundIndex: 0,
          type: "mcq",
          payload: {
            title: "Sample Question",
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "HighText Machine Language", "Hot Mail", "How to Make Lasagna"]
          },
          durationSec: 30
        });
      }, 2000);
    });

    // --- ANSWER SUBMITTED ---
    socket.on("round:answer", ({ roomCode, roundIndex, payload }, ack) => {
      const room = rooms[roomCode];
      if (!room) return ack({ success: false, error: "Room not found" });

      // find player
      const player = room.players.find((p) => p.id === socket.id);
      if (player) {
        // scoring logic: +10 for demo
        player.total = (player.total || 0) + 10;
      }

      ack({ success: true });
      clash.to(roomCode).emit("round:end", { roundIndex, players: room.players });
    });

    // --- DISCONNECT ---
    socket.on("disconnect", () => {
      console.log("❌ Player left:", socket.id);
      for (const [code, room] of Object.entries(rooms)) {
        room.players = room.players.filter((p) => p.id !== socket.id);
        clash.to(code).emit("room:joined", { roomCode: code, players: room.players });
      }
    });
  });
};
