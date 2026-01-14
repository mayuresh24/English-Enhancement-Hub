function searchDate() {
  const date = document.getElementById("dateSearch").value;
  const content = englishContent.find(c => c.date === date);
  showContent(date, content);
}

const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

