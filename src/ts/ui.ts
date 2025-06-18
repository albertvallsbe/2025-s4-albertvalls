import { type Joke } from "./types.js";
export const renderJoke = (joke: Joke): void => {
	try {
		const jokeTextElement = document.querySelector("#jokeText");
		if (!jokeTextElement) throw new Error("Element Joke not found");
		jokeTextElement.textContent = joke.joke;
	} catch (error) {
		console.error("Error rendering joke:", error);
	}
};

export const renderError = (message: string): void => {
	try {
		const jokeTextElement = document.querySelector("#jokeText");
		if (!jokeTextElement) throw new Error("Element #jokeText not found");
		jokeTextElement.textContent = message;
	} catch (error) {
		console.error("Error rendering error message:", error);
	}
};
