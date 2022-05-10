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
      "Content-Encoding": "gzip", // optimize network latency for textual data.
      Authorization:
        "Bearer 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", // TODO: Move key to secret.
    },
    body: JSON.stringify(promptRequest),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export { fetchPromptResponse };
