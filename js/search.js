// See REFERENCES.md [J2] [J4] [J5]: request cancellation and URL/history state.
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
let activeSearch = null;

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

  // [J2]: cancel a superseded fetch so an older response cannot replace newer results.
  activeSearch?.abort();
  const controller = new AbortController();
  activeSearch = controller;

  updateSearchUrl(options);
  setLoading(true);
  clearResults();
  setStatus("Searching OpenAlex...");

  try {
    const response = await searchWorks(options, controller.signal);
    if (activeSearch !== controller) return;
    showResults(response.results ?? []);
    showResultCount(response.meta?.count ?? 0);

    if ((response.results ?? []).length === 0) {
      setStatus("No papers matched this search.");
    } else {
      setStatus(`Search complete. ${response.results.length} papers displayed.`);
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error(error);
    setStatus("The search could not be completed. Please try again.", true);
  } finally {
    if (activeSearch === controller) {
      activeSearch = null;
      setLoading(false);
    }
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
    const returnUrl = `index.html${location.search}`;
    link.href = `paper.html?id=${encodeURIComponent(id)}&return=${encodeURIComponent(returnUrl)}`;
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

// [J4] [J5]: persist search controls in the query string without reloading the page.
function updateSearchUrl(options) {
  const params = new URLSearchParams();
  params.set("q", options.query);
  params.set("scope", options.scope);
  params.set("count", options.resultCount);
  params.set("sort", options.sort);
  if (options.openAccess) params.set("oa", "1");
  history.replaceState(null, "", `index.html?${params.toString()}`);
}

function restoreSearch() {
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  if (!query) return;

  queryInput.value = query;
  form.elements.scope.value = params.get("scope") || "title_abstract_keywords";

  const resultCount = Number(params.get("count"));
  if ([5, 10, 15, 20, 25].includes(resultCount)) countInput.value = resultCount;

  const sort = params.get("sort");
  if ([...form.elements.sort.options].some((option) => option.value === sort)) {
    form.elements.sort.value = sort;
  }

  form.elements.openAccess.checked = params.get("oa") === "1";
  form.requestSubmit();
}

restoreSearch();
