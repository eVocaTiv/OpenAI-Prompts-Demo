import { throttleDecorator } from "./scripts/helpers.js";
import { viewElements, addPromptResponse } from "./scripts/view.js";
import { fetchPromptResponse } from "./scripts/apiService.js";
import {
  updateResponseInLocalStorage,
  restoreResponsesFromLocalStorage,
  clearResponsesFromLocalStorage,
} from "./scripts/storageService.js";

const throttledOnFormSubmit = throttleDecorator(onFormSubmit, 300); // throttle to prevent api traffic spam.

function onFormSubmit() {
  const prompt = viewElements.textArea.value;
  // Ignore empty input (or show a toast to inform user.)
  if (prompt.trim().length === 0) return;

  fetchPromptResponse(prompt)
    .then((response) => {
      addPromptResponse(prompt, response);
      updateResponseInLocalStorage(prompt, response.choices[0].text);
    })
    .catch((err) => console.error("there is an error", err)); // TODO change to graceful handling.
}

function onQuickPromptClick(ev) {
  const prompt = ev.target.closest(".prompts__form__quick-prompt");
  prompt &&
    fetchPromptResponse(prompt.textContent)
      .then((response) => {
        addPromptResponse(prompt.textContent, response);
        updateResponseInLocalStorage(
          prompt.textContent,
          response.choices[0].text
        );
      })
      .catch((err) => console.error("there is an error", err)); // TODO change to graceful handling.
}

// Initialize app once using IIFE.
// Attach required event listeners.
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
  viewElements.responsesClearBtn.addEventListener("click", () => {
    clearResponsesFromLocalStorage();
    const { responses } = viewElements;
    while (responses.firstChild) {
      responses.removeChild(responses.lastChild); // last child removal is O(1)
    }
  });

  // Restore stored responses from local storage, so they survive browser close and page refresh.
  const storedResponses = restoreResponsesFromLocalStorage();
  storedResponses.forEach(({ promptText, responseText }) => {
    const prompt = promptText;
    const choices = [{ text: responseText }];
    addPromptResponse(prompt, { choices });
  });
})();
