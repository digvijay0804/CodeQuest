const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get("room");
const leaderboardDiv = document.getElementById("leaderboard");

// Render function (used both for HTTP fetch results and socket pushes)
function renderLeaderboard(players) {
  if (!players || players.length === 0) {
    leaderboardDiv.innerHTML = "<p>No scores yet.</p>";
    return;
  }

  // ✅ Sort players by score (descending)
  players.sort((a, b) => b.score - a.score);

  leaderboardDiv.innerHTML = `
    <table>
      <tr><th>Rank</th><th>Player</th><th>Score</th></tr>
      ${players
        .map((p, i) => {
          const rank = i + 1;
          let rowClass = "";
          let medal = "";

          if (rank === 1) { rowClass = "rank-1"; medal = " 🥇"; }
          else if (rank === 2) { rowClass = "rank-2"; medal = " 🥈"; }
          else if (rank === 3) { rowClass = "rank-3"; medal = " 🥉"; }

          return `
            <tr class="${rowClass}">
              <td>${rank}${medal}</td>
              <td>${p.playerName}</td>
              <td>${p.score}</td>
            </tr>
          `;
        })
        .join("")}
    </table>
  `;
}

// Load leaderboard via HTTP (room-aware)
async function loadLeaderboard() {
  try {
    const url = roomCode ? `/api/leaderboard?room=${encodeURIComponent(roomCode)}` : "/api/leaderboard";
    const res = await fetch(url);
    const data = await res.json();
    if (!data.success) {
      leaderboardDiv.innerHTML = "<p>Failed to load leaderboard.</p>";
      return;
    }
    renderLeaderboard(data.data);
  } catch (err) {
    console.error("Error loading leaderboard:", err);
    leaderboardDiv.innerHTML = "<p>Error loading leaderboard.</p>";
  }
}

// Listen for server pushed leaderboard (live updates)
socket.on("leaderboardData", (players) => {
  renderLeaderboard(players);
});

// Also listen for small score updates (optional)
socket.on("scoreUpdate", () => {
  loadLeaderboard();
});

// Initial load
loadLeaderboard();
