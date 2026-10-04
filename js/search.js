import { searchWorks } from "./api.js";
import { initialiseMenu } from "./nav.js";
import { validateSearchForm } from "./validation.js";

const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const countInput = document.querySelector("#result-count");
const queryError = document.querySelector("#query-error");
const countError = document.querySelector("#result-count-error");
const resultsList = document.querySelector("#results-list");
const status = document.querySelector("#search-status");
const countText = document.querySelector("#result-count-text");
const searchButton = document.querySelector("#search-button");

initialiseMenu();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateSearchForm(queryInput, countInput, queryError, countError)) {
    setStatus("Check the highlighted fields and try again.", true);
    return;
  }

  const data = new FormData(form);
  const options = {
    query: data.get("query").trim(),
    scope: data.get("scope"),
    resultCount: Number(data.get("resultCount")),
    sort: data.get("sort"),
    openAccess: data.get("openAccess") === "on"
  };

  setLoading(true);
  clearResults();
  setStatus("Searching OpenAlex...");

  try {
    const response = await searchWorks(options);
    showResults(response.results ?? []);
    showResultCount(response.meta?.count ?? 0);

    if ((response.results ?? []).length === 0) {
      setStatus("No papers matched this search.");
    } else {
      setStatus(`Search complete. ${response.results.length} papers displayed.`);
    }
  } catch (error) {
    console.error(error);
    setStatus("The search could not be completed. Please try again.", true);
  } finally {
    setLoading(false);
  }
});

function showResults(works) {
  for (const work of works) {
    const item = document.createElement("li");
    const article = document.createElement("article");
    const heading = document.createElement("h3");
    const link = document.createElement("a");
    const id = work.id?.split("/").pop() ?? "";

    article.className = "result-card";
    link.href = `paper.html?id=${encodeURIComponent(id)}`;
    link.textContent = work.title || "Untitled work";
    heading.append(link);

    const authors = document.createElement("p");
    authors.className = "result-meta";
    authors.textContent = formatAuthors(work.authorships);

    const source = document.createElement("p");
    source.className = "result-source";
    source.textContent = work.primary_location?.source?.display_name || "Source not listed";

    const tags = document.createElement("div");
    tags.className = "result-tags";
    addTag(tags, work.publication_year ? String(work.publication_year) : "Year unknown");
    addTag(tags, `${work.cited_by_count ?? 0} citations`);

    if (work.open_access?.is_oa) {
      addTag(tags, "Open access");
    }

    article.append(heading, authors, source, tags);
    item.append(article);
    resultsList.append(item);
  }
}

function formatAuthors(authorships = []) {
  const names = authorships
    .map((entry) => entry.author?.display_name)
    .filter(Boolean);

  if (names.length === 0) {
    return "Authors not listed";
  }

  if (names.length > 3) {
    return `${names.slice(0, 3).join(", ")} et al.`;
  }

  return names.join(", ");
}

function addTag(container, text) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = text;
  container.append(tag);
}

function clearResults() {
  resultsList.replaceChildren();
  countText.textContent = "";
}

function showResultCount(total) {
  countText.textContent = `${total.toLocaleString()} matches`;
}

function setLoading(isLoading) {
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? "Searching..." : "Search papers";
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}
