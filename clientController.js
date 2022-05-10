import { throttleDecorator } from "./scripts/helpers.js";
import { viewElements, addPromptResponse } from "./scripts/view.js";
import { fetchPromptResponse } from "./scripts/apiService.js";

const throttledOnFormSubmit = throttleDecorator(onFormSubmit, 300); // throttle to prevent api traffic spam.

function onFormSubmit() {
  const prompt = viewElements.textArea.value;
  // Ignore empty input (or show a toast to inform user.)
  if (prompt.trim().length === 0) return;

  fetchPromptResponse(prompt)
    .then((response) => addPromptResponse(prompt, response))
    .catch((err) => console.log("there is an error", err)); // TODO change to graceful handling.
}

function onQuickPromptClick(ev) {
  const prompt = ev.target.closest(".prompts__form__quick-prompt");
  prompt &&
    fetchPromptResponse(prompt.textContent)
      .then((response) => addPromptResponse(prompt.textContent, response))
      .catch((err) => console.log("there is an error", err)); // TODO change to graceful handling.
}

// Initialize app once using IIFE.
(function initializeApp() {
  viewElements.form.addEventListener("submit", (ev) => {
    ev.preventDefault(); // prevent refresh.
    throttledOnFormSubmit();
  });
  viewElements.textArea.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 13 && !ev.shiftKey) {
      // 'Enter' Key.
      ev.preventDefault(); // prevent changing line in input, but make it accessible through shift+enter
      throttledOnFormSubmit();
    }
  });
  viewElements.quickPrompts.addEventListener("click", onQuickPromptClick);
})();
