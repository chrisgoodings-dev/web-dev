const STORAGE_KEY = "research-notes-reading-list";

export function getReadingList() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function getSavedPaper(id) {
  return getReadingList().find((paper) => paper.id === id) ?? null;
}

export function savePaper(paper) {
  const papers = getReadingList();
  const index = papers.findIndex((item) => item.id === paper.id);
  if (index >= 0) papers[index] = paper;
  else papers.push(paper);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
}

export function removePaper(id) {
  const papers = getReadingList().filter((paper) => paper.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
}
