import { fetchRandomJoke } from "./api.js";
import { renderJoke, renderError } from "./ui.js";
import { type Joke } from "./types.js";

export const index = async (): Promise<void> => {
	try {
		const firstJoke: Joke = await fetchRandomJoke();
		renderJoke(firstJoke.joke);
	} catch (error) {
		renderError("No s'ha pogut carregar l'acudit.");
	}

	try {
		const nextButton = document.querySelector(".joke__next-button");
		if (!nextButton) throw new Error("Element .joke__next-button not found");

		nextButton.addEventListener("click", async (): Promise<void> => {
			try {
				const newJoke: Joke = await fetchRandomJoke();
				renderJoke(newJoke.joke);
			} catch (error) {
				renderError("No s'ha pogut carregar l'acudit.");
			}
		});
	} catch (error) {
		console.error("Error setting next button listener:", error);
	}
};

document.addEventListener("DOMContentLoaded", () => {
	void index();
});
