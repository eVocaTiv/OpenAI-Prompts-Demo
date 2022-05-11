### Welcome! 
This is my attempt of the Front End Developer Intern Challenge based on fetching data from OpenAI's GPT-3.

### Features & Notes
- Responses to prompts are displayed in a new-first order with background color transition depicting that.
- The client side HTML is accessible using native tags, aria attributes and appropriate focus indicators wherever useful, making it easy to use through screen reader and boosting SEO stats.
- The API key is stored on server side through Netlify's deployment environment and captured as a Promise.
- The responses are cached in the localStorage, and therefore survive page refresh and browser closing.
- A clear button is provided to clear the display as well as the localStorage of stored responses.
- There is a 'Quick Prompts' section which allows the user to get response with a single click/enter key press.
- The code is split into modules like apiService, localStorageService, etc. to keep loose coupling.
- CSS BEM convention is used for maintenable styling.
- Loading & Errors are indicated to the user with the help of self-disappearing toasts.


### Performance
- Since we deal with textual data, it has been compressed using GZip via HTTP headers.
- We hide and show loading/error toasts (keep them in the DOM with absolute positioning) instead of using display: none to avoid reflows.
- The api fetching logic is throttled with a cooldown time of 300ms to avoid traffic spam on the api endpoint.
- When clearing all responses from the localStorage as well as the display, we eliminate children of the response list using .lastChild which takes
O(1) time to remove 1 child as opposed to .firstChild.
- JS is embedded at the bottom to avoid blocking HTML parsing.
- Stacking contexts are used (using z-index, transforms, etc.) to leverage GPU acceleration wherever feasible.

Thank you for checking out my code, have a great day =)

You can find me on __[LinkedIn](https://www.linkedin.com/in/kunal-dewan-bb0a67161/)__
