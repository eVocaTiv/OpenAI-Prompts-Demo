const viewElements = {
  submitBtn: document.querySelector(".prompts__form__submit-btn"),
  form: document.querySelector(".prompts__form"),
  responses: document.querySelector(".prompts__responses"),
  quickPrompts: document.querySelector(".prompts__form__quick-prompts"),
  textArea: document.querySelector(".prompts__form__input"),
  responsesClearBtn: document.querySelector(".prompts__responses__clear-btn"),
  errorToast: document.querySelector(".prompts__error-toast"),
  loadingToast: document.querySelector(".prompts__loading-toast "),
};

function addPromptResponse(promptText, { choices }) {
  const responseText = choices[0].text;
  const newResponse = document.createElement("li");

  newResponse.classList.add("prompts__response");

  const promptContent = document.createElement('div');
  promptContent.insertAdjacentHTML('afterbegin', `<span><strong>Prompt:</strong> &emsp; ${promptText}</span>`)
  promptContent.classList.add("prompts__response__content");

  const responseContent = document.createElement('div');
  responseContent.insertAdjacentHTML('afterbegin', `<span><strong>Response:</strong> &emsp; ${responseText}</span>`)
  responseContent.classList.add("prompts__response__content");

  newResponse.append(promptContent, responseContent);
  viewElements.responses.prepend(newResponse);
  setTimeout(() => {
    newResponse.style.backgroundColor="whitesmoke";
  }, 500)
}

export { viewElements, addPromptResponse };
