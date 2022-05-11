// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const API_SECRET = process.env.API_SECRET;
    return {
      statusCode: 200,
      body: JSON.stringify({ secretMessage: API_SECRET }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
