import { apiConstants, key } from "./constants.js";

async function fetchPromptResponse(prompt) {
  const promptRequest = {
    prompt,
    ...apiConstants,
  };
  const apiKey = await key;

  return fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip", // optimize network latency for textual data.
      Authorization:
        `Bearer ${apiKey}`,
    },
    body: JSON.stringify(promptRequest),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export { fetchPromptResponse };
