export const renderJoke = (text: string): void => {
	try {
		const jokeTextElement = document.querySelector(".joke__text");
		if (!jokeTextElement) throw new Error("Element .joke__text not found");
		jokeTextElement.textContent = text;
	} catch (error) {
		console.error("Error rendering joke:", error);
	}
};

// Render an error message into the DOM
export const renderError = (message: string): void => {
	try {
		const jokeTextElement = document.querySelector(".joke__text");
		if (!jokeTextElement) throw new Error("Element .joke__text not found");
		jokeTextElement.textContent = message;
	} catch (error) {
		console.error("Error rendering error message:", error);
	}
};

// Attach click listener to the "Següent acudit" button
export const setNextButtonListener = (handler: () => Promise<void>): void => {
	try {
		const nextButton = document.querySelector(".joke__next-button");
		if (!nextButton) throw new Error("Element .joke__next-button not found");
		nextButton.addEventListener("click", () => {
			handler().catch((err) => {
				console.error("Error in next-button handler:", err);
			});
		});
	} catch (error) {
		console.error("Error setting next button listener:", error);
	}
};
