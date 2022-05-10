import { apiConstants } from "./constants.js";

async function fetchPromptResponse(prompt) {
  const promptRequest = {
    prompt,
    ...apiConstants,
  };

  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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", // TODO: Move key to secret.
    },
    body: JSON.stringify(promptRequest),
  })
    .then((res) => res.json())
    .then(data => data)
    .catch(err => err);
}

export { fetchPromptResponse };
