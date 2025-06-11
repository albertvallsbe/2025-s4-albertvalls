import { randomJoke } from "./api.js";
import { renderJoke, renderError } from "./ui.js";
import { type Joke } from "./types.js";

export const index = async (): Promise<void> => {
	try {
		const nextButton = document.querySelector("#jokeButton");
		if (!nextButton) throw new Error("Element .joke__next-button not found");

		nextButton.addEventListener("click", onClick);
	} catch (error) {
		console.error("Error setting next button listener:", error);
	}
};

const onClick = async (): Promise<void> => {
	try {
		const newJoke: Joke = await randomJoke();
		renderJoke(newJoke.joke, newJoke.id);
	} catch (error) {
		renderError("No s'ha pogut carregar l'acudit.");
	}
};

document.addEventListener("DOMContentLoaded", () => {
	void index();
	void onClick();
});
