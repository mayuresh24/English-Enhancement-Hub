let englishContent = [];
fetch("js/data.json")
  .then(res => res.json())
  .then(data => {
    englishContent = data;
    renderCalendar();
  });

const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const contentBox = document.getElementById("contentBox");
let currentDate = new Date();

function renderCalendar() {
  calendarDays.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div class="empty"></div>`;
  }

  const completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];

  for (let day = 1; day <= lastDate; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const content = englishContent.find(c => c.date === dateStr);

    const div = document.createElement("div");
    div.className = "calendar-day";
    div.innerHTML = `<span>${day}</span>`;

    if (content) {
      div.classList.add("has-content");
      div.innerHTML += `<div class="icons">
        ${content.assignment ? "📄" : ""}
        ${content.vocabulary ? "📘" : ""}
        ${content.grammar ? "📗" : ""}
      </div>`;
    }

    if (completedDays.includes(dateStr)) {
      div.classList.add("completed");
    }

    const today = new Date().toISOString().split("T")[0];
    if (dateStr === today) div.classList.add("today");

    div.onclick = () => showContent(dateStr, content);
    calendarDays.appendChild(div);
  }
}

function showContent(date, content) {
  if (!content) {
    contentBox.innerHTML = `<p>No content available for ${date}</p>`;
    return;
  }

  contentBox.innerHTML = `
    <h6>${date}</h6>
    <ul>
      ${content.assignment ? `<li><a href="${content.assignment}" target="_blank">Assignment</a></li>` : ""}
      ${content.vocabulary ? `<li><a href="${content.vocabulary}" target="_blank">Vocabulary</a></li>` : ""}
      ${content.grammar ? `<li><a href="${content.grammar}" target="_blank">Grammar</a></li>` : ""}
    </ul>
  `;

  let completed = JSON.parse(localStorage.getItem("completedDays")) || [];
  if (!completed.includes(date)) {
    completed.push(date);
    localStorage.setItem("completedDays", JSON.stringify(completed));
  }
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};
