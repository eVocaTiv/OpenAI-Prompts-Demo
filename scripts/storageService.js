function updateResponseInLocalStorage(promptText, responseText) {
  // stored as array of {promptText:, responseText:}
  const responses = restoreResponsesFromLocalStorage();
  const responseToStore = { promptText, responseText };
  responses.push(responseToStore);
  localStorage.setItem("responses", JSON.stringify(responses));
}

function restoreResponsesFromLocalStorage() {
  const responses = localStorage.getItem("responses");
  return responses ? JSON.parse(responses) : [];
}

function clearResponsesFromLocalStorage() {
  localStorage.setItem("responses", JSON.stringify([]));
}

export {
  updateResponseInLocalStorage,
  restoreResponsesFromLocalStorage,
  clearResponsesFromLocalStorage,
};
