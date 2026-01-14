const pdfs = [
  {
    title: "Daily Vocabulary Builder",
    category: "vocabulary",
    level: "A1",
    url: "https://raw.githubusercontent.com/USERNAME/REPO/main/pdfs/vocabulary/vocab-a1.pdf"
  },
  {
    title: "Grammar Practice Sheet",
    category: "grammar",
    level: "A2",
    url: "https://raw.githubusercontent.com/USERNAME/REPO/main/pdfs/grammar/grammar-a2.pdf"
  },
  {
    title: "MCQ Test – Tenses",
    category: "mcqs",
    level: "B1",
    url: "https://raw.githubusercontent.com/USERNAME/REPO/main/pdfs/mcqs/tenses-b1.pdf"
  },
  {
    title: "Advanced Vocabulary List",
    category: "vocabulary",
    level: "C2",
    url: "https://raw.githubusercontent.com/USERNAME/REPO/main/pdfs/vocabulary/vocab-c2.pdf"
  }
];

const pdfList = document.getElementById("pdfList");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");

function renderPDFs() {
  pdfList.innerHTML = "";

  const category = categoryFilter.value;
  const level = levelFilter.value;

  const filtered = pdfs.filter(pdf => {
    return (category === "all" || pdf.category === category) &&
           (level === "all" || pdf.level === level);
  });

  filtered.forEach(pdf => {
    const card = document.createElement("div");
    card.className = "pdf-card";

    card.innerHTML = `
      <h3>${pdf.title}</h3>
      <div class="tags">${pdf.category.toUpperCase()} • ${pdf.level}</div>
      <a class="open-btn" href="${pdf.url}" target="_blank">Open PDF</a>
    `;

    pdfList.appendChild(card);
  });
}

categoryFilter.addEventListener("change", renderPDFs);
levelFilter.addEventListener("change", renderPDFs);

renderPDFs();
