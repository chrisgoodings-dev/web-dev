import { getWork } from "./api.js";
import { initialiseMenu } from "./nav.js";
import { getSavedPaper, removePaper, savePaper } from "./storage.js";

const params = new URLSearchParams(location.search);
const workId = params.get("id");
const status = document.querySelector("#paper-status");
const content = document.querySelector("#paper-content");
const title = document.querySelector("#paper-title");
const authors = document.querySelector("#paper-authors");
const meta = document.querySelector("#paper-meta");
const abstract = document.querySelector("#paper-abstract");
const sourceLink = document.querySelector("#paper-link");
const listButton = document.querySelector("#reading-list-button");
const notesForm = document.querySelector("#notes-form");
const evidence = document.querySelector("#evidence");
const interpretation = document.querySelector("#interpretation");
const notesStatus = document.querySelector("#notes-status");
const backLink = document.querySelector("#back-to-search");
let currentPaper = null;

initialiseMenu();
setBackLink();
loadPaper();

async function loadPaper() {
  if (!/^W\d+$/.test(workId ?? "")) {
    showError("No valid OpenAlex paper ID was supplied.");
    return;
  }

  try {
    const work = await getWork(workId);
    currentPaper = normalisePaper(work);
    renderPaper(currentPaper);
    loadSavedNotes();
    content.hidden = false;
    status.hidden = true;
  } catch (error) {
    console.error(error);
    showError("The paper could not be loaded. Please return to search and try again.");
  }
}

function normalisePaper(work) {
  return {
    id: work.id?.split("/").pop() ?? workId,
    title: work.title || "Untitled work",
    authors: (work.authorships ?? []).map((entry) => entry.author?.display_name).filter(Boolean),
    year: work.publication_year ?? null,
    source: work.primary_location?.source?.display_name || "Source not listed",
    sourceUrl: work.primary_location?.landing_page_url || work.doi || work.id,
    abstract: rebuildAbstract(work.abstract_inverted_index)
  };
}

function renderPaper(paper) {
  document.title = `${paper.title} | Research Notes`;
  title.textContent = paper.title;
  authors.textContent = paper.authors.length ? paper.authors.join(", ") : "Authors not listed";
  addMeta("Year", paper.year ?? "Unknown");
  addMeta("Source", paper.source);
  abstract.textContent = paper.abstract || "No abstract is available from OpenAlex.";
  sourceLink.href = paper.sourceUrl;
  updateListButton();
}

function addMeta(label, value) {
  const item = document.createElement("li");
  item.textContent = `${label}: ${value}`;
  meta.append(item);
}

function rebuildAbstract(index) {
  if (!index) return "";
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) words[position] = word;
  }
  return words.join(" ");
}

function loadSavedNotes() {
  const saved = getSavedPaper(currentPaper.id);
  evidence.value = saved?.evidence ?? "";
  interpretation.value = saved?.interpretation ?? "";
  updateListButton();
}

listButton.addEventListener("click", () => {
  if (getSavedPaper(currentPaper.id)) {
    removePaper(currentPaper.id);
    evidence.value = "";
    interpretation.value = "";
    notesStatus.textContent = "Removed from your reading list.";
  } else {
    saveCurrentPaper();
    notesStatus.textContent = "Saved to your reading list.";
  }
  updateListButton();
});

notesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCurrentPaper();
  updateListButton();
  notesStatus.textContent = "Notes saved.";
});

function saveCurrentPaper() {
  savePaper({
    ...currentPaper,
    evidence: evidence.value.trim(),
    interpretation: interpretation.value.trim()
  });
}

function updateListButton() {
  const isSaved = currentPaper && getSavedPaper(currentPaper.id);
  listButton.textContent = isSaved ? "Remove from reading list" : "Save to reading list";
}

function showError(message) {
  status.textContent = message;
  status.classList.add("error");
}


function setBackLink() {
  const returnUrl = params.get("return");
  if (returnUrl?.startsWith("index.html?")) backLink.href = returnUrl;
}
