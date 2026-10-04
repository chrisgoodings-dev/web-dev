const OPENALEX_WORKS = "https://api.openalex.org/works";
const CROSSREF_WORKS = "https://api.crossref.org/works";

export async function searchWorks(options, signal) {
  const url = new URL(OPENALEX_WORKS);
  const searchParameter =
    options.scope === "title" ? "search.title" : "search.title_abstract_keywords";

  url.searchParams.set(searchParameter, options.query);
  url.searchParams.set("per_page", options.resultCount);
  url.searchParams.set("sort", options.sort);

  if (options.openAccess) {
    url.searchParams.set("filter", "open_access.is_oa:true");
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`OpenAlex returned HTTP ${response.status}`);
  }

  return response.json();
}

export async function getWork(id) {
  const response = await fetch(`${OPENALEX_WORKS}/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`OpenAlex returned HTTP ${response.status}`);
  }

  return response.json();
}

// Crossref REST API: https://www.crossref.org/documentation/retrieve-metadata/rest-api/
export async function getCrossrefWork(doi) {
  const cleanDoi = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  const doiPath = cleanDoi.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${CROSSREF_WORKS}/${doiPath}`);

  if (!response.ok) {
    throw new Error(`Crossref returned HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.message;
}
