const today = new Date().toISOString().split("T")[0];

let streak = Number(localStorage.getItem("streak")) || 0;
let bestStreak = Number(localStorage.getItem("bestStreak")) || 0;
let lastDate = localStorage.getItem("lastActiveDate");

if (lastDate !== today) {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  streak = lastDate === yesterday ? streak + 1 : 1;
  bestStreak = Math.max(bestStreak, streak);

  localStorage.setItem("streak", streak);
  localStorage.setItem("bestStreak", bestStreak);
  localStorage.setItem("lastActiveDate", today);
}

document.getElementById("streakText").innerText = `${streak} day(s)`;
document.getElementById("bestStreakText").innerText = `Best: ${bestStreak}`;

function getBadge(s) {
  if (s >= 30) return "🥇 English Champion";
  if (s >= 14) return "🥈 Consistent Learner";
  if (s >= 7) return "🥉 Rising Star";
  if (s >= 3) return "📘 Beginner";
  return "No badge yet";
}

document.getElementById("badgeText").innerText = getBadge(streak);

const boosters = [
  "Idiom: Break the ice",
  "Tip: Use much with uncountable nouns",
  "Mistake: He go ❌ → He goes ✅",
  "Word: Meticulous",
  "Speak slowly and clearly"
];

document.getElementById("boosterText").innerText =
  boosters[new Date().getDate() % boosters.length];

const timeline = document.getElementById("timeline");
const completed = JSON.parse(localStorage.getItem("completedDays")) || [];

completed.slice(-14).forEach(d => {
  const dot = document.createElement("span");
  dot.className = "timeline-dot";
  dot.title = d;
  timeline.appendChild(dot);
});
