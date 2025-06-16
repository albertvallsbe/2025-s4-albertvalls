export const renderJoke = (jokeText: string, jokeId: string): void => {
	try {
		const jokeTextElement = document.querySelector("#jokeText");
		if (!jokeTextElement) throw new Error("Element Joke not found");
		jokeTextElement.textContent = jokeText;
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
