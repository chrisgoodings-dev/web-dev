import { getCrossrefWork, getWork } from "./api.js";
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
const metadataStatus = document.querySelector("#metadata-status");
const metadataList = document.querySelector("#metadata-comparison");
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
    loadCrossref(currentPaper);
  } catch (error) {
    console.error(error);
    showError("The paper could not be loaded. Please return to search and try again.");
  }
}

function normalisePaper(work) {
  return {
    id: work.id?.split("/").pop() ?? workId,
    doi: work.doi?.replace(/^https?:\/\/doi\.org\//i, "") ?? null,
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
  if (paper.doi) addMeta("DOI", paper.doi);
  addMeta("Source", paper.source);
  abstract.textContent = paper.abstract || "No abstract is available from OpenAlex.";
  sourceLink.href = paper.sourceUrl;
  updateListButton();
}

async function loadCrossref(paper) {
  if (!paper.doi) {
    metadataStatus.textContent = "This paper has no DOI, so Crossref cannot be checked.";
    return;
  }

  metadataStatus.textContent = "Checking DOI metadata with Crossref...";

  try {
    const record = await getCrossrefWork(paper.doi);
    const crossref = normaliseCrossref(record);
    addComparison("Title", paper.title, crossref.title);
    addComparison("Publication year", paper.year, crossref.year);
    addComparison("Publication source", paper.source, crossref.source);
    metadataStatus.textContent = "Crossref metadata loaded. Compare the sources below.";
  } catch (error) {
    console.warn(error);
    metadataStatus.textContent = "Crossref metadata is unavailable. OpenAlex data remains available.";
  }
}

function normaliseCrossref(record) {
  const dateParts = record.published?.["date-parts"] ?? record.issued?.["date-parts"];

  return {
    title: record.title?.[0] || null,
    year: dateParts?.[0]?.[0] ?? null,
    source: record["container-title"]?.[0] || null
  };
}

function addComparison(label, openAlexValue, crossrefValue) {
  const item = document.createElement("li");
  const heading = document.createElement("div");
  const name = document.createElement("strong");
  const state = document.createElement("span");
  const openAlex = document.createElement("p");
  const crossref = document.createElement("p");

  heading.className = "comparison-heading";
  name.textContent = label;
  state.className = "comparison-state";

  if (crossrefValue == null) {
    state.textContent = "Not supplied";
  } else if (valuesMatch(openAlexValue, crossrefValue)) {
    state.textContent = "Matches";
    state.classList.add("match");
  } else {
    state.textContent = "Different";
    state.classList.add("different");
  }

  openAlex.textContent = `OpenAlex: ${openAlexValue ?? "Not supplied"}`;
  crossref.textContent = `Crossref: ${crossrefValue ?? "Not supplied"}`;
  heading.append(name, state);
  item.append(heading, openAlex, crossref);
  metadataList.append(item);
}

function valuesMatch(first, second) {
  return normaliseValue(first) === normaliseValue(second);
}

function normaliseValue(value) {
  return String(value ?? "").toLowerCase().replace(/\s+/g, " ").trim();
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
