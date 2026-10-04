const WORKS_ENDPOINT = "https://api.openalex.org/works";

export async function searchWorks(options) {
  const url = new URL(WORKS_ENDPOINT);
  const searchParameter =
    options.scope === "title" ? "search.title" : "search.title_abstract_keywords";

  url.searchParams.set(searchParameter, options.query);
  url.searchParams.set("per_page", options.resultCount);
  url.searchParams.set("sort", options.sort);

  if (options.openAccess) {
    url.searchParams.set("filter", "open_access.is_oa:true");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OpenAlex returned HTTP ${response.status}`);
  }

  return response.json();
}

export async function getWork(id) {
  const response = await fetch(`${WORKS_ENDPOINT}/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`OpenAlex returned HTTP ${response.status}`);
  }

  return response.json();
}
