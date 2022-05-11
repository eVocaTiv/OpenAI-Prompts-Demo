const apiConstants = {
  temperature: 0.5,
  max_tokens: 64,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

const key = fetch(`../../.netlify/functions/fetch-api-key`) // return Promise
  .then((res) => res.json())
  .then((body) => body.secretMessage);

export { apiConstants, key };
