// See REFERENCES.md [J6] [A2]: native constraint validation enhanced with accessible error descriptions.
function showError(input, errorElement, message) {
  input.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
  errorElement.hidden = false;
}

function clearError(input, errorElement) {
  input.removeAttribute("aria-invalid");
  errorElement.textContent = "";
  errorElement.hidden = true;
}

export function validateSearchForm(queryInput, countInput, queryError, countError) {
  clearError(queryInput, queryError);
  clearError(countInput, countError);

  const query = queryInput.value.trim();
  let firstInvalidField = null;

  if (query.length < 2) {
    showError(queryInput, queryError, "Enter at least two characters.");
    firstInvalidField = queryInput;
  }

  if (!countInput.validity.valid) {
    showError(countInput, countError, "Choose 5 to 25 results, in steps of 5.");
    firstInvalidField ??= countInput;
  }

  if (firstInvalidField) {
    firstInvalidField.focus();
    return false;
  }

  return true;
}
