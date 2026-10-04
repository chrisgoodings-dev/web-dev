import { getReadingList, removePaper } from "./storage.js";
import { initialiseMenu } from "./nav.js";

const list = document.querySelector("#reading-list");
const status = document.querySelector("#reading-status");
const count = document.querySelector("#saved-count");

initialiseMenu();
renderReadingList();

function renderReadingList(message = "") {
  const papers = getReadingList();
  list.replaceChildren();
  count.textContent = `${papers.length} saved`;

  if (papers.length === 0) {
    status.textContent = message || "Your reading list is empty. Search for a paper to add one.";
    return;
  }

  status.textContent = message || "Your saved papers are shown below.";
  for (const paper of papers) list.append(createPaperItem(paper));
}

function createPaperItem(paper) {
  const item = document.createElement("li");
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const link = document.createElement("a");
  const details = document.createElement("p");
  const notes = document.createElement("div");
  const evidence = document.createElement("p");
  const interpretation = document.createElement("p");
  const removeButton = document.createElement("button");

  article.className = "result-card";
  link.href = `paper.html?id=${encodeURIComponent(paper.id)}`;
  link.textContent = paper.title || "Untitled work";
  heading.append(link);

  details.className = "result-meta";
  details.textContent = [paper.year, paper.source].filter(Boolean).join(" · ") || "Publication details unavailable";

  notes.className = "reading-notes";
  evidence.append(makeLabel("Evidence: "), document.createTextNode(paper.evidence || "No evidence note saved."));
  interpretation.append(makeLabel("Interpretation: "), document.createTextNode(paper.interpretation || "No interpretation note saved."));
  notes.append(evidence, interpretation);

  removeButton.className = "secondary-button";
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.setAttribute("aria-label", `Remove ${paper.title || "untitled work"} from reading list`);
  removeButton.addEventListener("click", () => {
    removePaper(paper.id);
    renderReadingList(`Removed "${paper.title || "Untitled work"}" from your reading list.`);
  });

  article.append(heading, details, notes, removeButton);
  item.append(article);
  return item;
}

function makeLabel(text) {
  const label = document.createElement("strong");
  label.textContent = text;
  return label;
}
