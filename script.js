let currentLang = "en";
let cvText = {};

const langButton = document.getElementById("lang-toggle");
const experienceContainer = document.getElementById("experience-container");
const abstract = document.getElementById("abstract");
const initiativesContainer = document.getElementById("innitiatives-container");


async function loadData() {
  const res = await fetch("./content.json");
  cvText = await res.json();
  render();
}

function createElem(elem, container, text, className) {
  const el = document.createElement(elem);
  if (text) el.textContent = text;
  if (className) el.className = className;
  container.appendChild(el);
  return el;
}

function render() {
  experienceContainer.innerHTML = "";
  abstract.innerHTML = "";
  initiativesContainer.innerHTML = "";

  cvText.experience.forEach((job) => {
    const companySection = createElem(
      "div",
      experienceContainer,
      "",
      "companies",
    );
    const jobTitle = createElem("h2", companySection);
    createElem("span", jobTitle, `[${job.year}] `, "dates");
    jobTitle.append(job.title);
    createElem("span", jobTitle, ` | ${job.company}`, "details");
    job.summary && createElem("p", companySection, job.summary[currentLang]);
    const highlightsList = createElem("ul", companySection);
    job.highlights[currentLang].forEach((li) => {
      createElem("li", highlightsList, li);
    });
  });

  cvText.initiatives.forEach((ini) => {
    const title = createElem("h3", initiativesContainer);
    createElem("span", title, ini.title[currentLang], "title");
    createElem("span", title, ini.details, "details");
    const iniList = createElem("ul", initiativesContainer);
    ini.description[currentLang].forEach((li) => {
      createElem("li", iniList, li);
    });
  });
  createElem("p", abstract, cvText.abstract[currentLang]);
}

langButton.addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  langButton.textContent = currentLang === "es" ? "EN" : "ES";
  render()
});

loadData();
