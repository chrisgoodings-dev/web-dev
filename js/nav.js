// See REFERENCES.md [A3]: WAI disclosure pattern for aria-expanded and aria-controls.
export function initialiseMenu() {
  const button = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#site-nav");

  if (!button || !navigation) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });
}
