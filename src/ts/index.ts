import { type Joke } from "./types.js";
import { renderJoke, renderError } from "./ui.js";
import { randomJoke } from "./api-jokes.js";

import { updateJokesArray, updateJokesArrayWithScore } from "./joke.js";

const jokes: Joke[] = [];
export let currentJokeId = "";

export const startJoke = async (): Promise<void> => {
	try {
		const nextButton = document.querySelector("#jokeButton");
		if (!nextButton) throw new Error("Element .joke__next-button not found");

		nextButton.addEventListener("click", onClickNewJoke);
	} catch (error) {
		console.error("Error setting next button listener:", error);
	}
};

export const startRating = async (): Promise<void> => {
	try {
		const emoji1 = document.querySelector("#emoji1");
		if (!emoji1) throw new Error("Element #emoji1 not found");
		const emoji2 = document.querySelector("#emoji2");
		if (!emoji2) throw new Error("Element #emoji2 not found");
		const emoji3 = document.querySelector("#emoji3");
		if (!emoji3) throw new Error("Element #emoji3 not found");

		emoji1.addEventListener("click", onClickRating);
		emoji2.addEventListener("click", onClickRating);
		emoji3.addEventListener("click", onClickRating);
	} catch (error) {
		console.error("Error setting next button listener:", error);
	}
};

export const onClickNewJoke = async (): Promise<void> => {
	try {
		const newJoke: Joke = await randomJoke();

		renderJoke(newJoke);
		currentJokeId = newJoke.id;
		updateJokesArray(jokes, newJoke);
	} catch (error) {
		renderError("No s'ha pogut carregar l'acudit.");
	}
};

export const onClickRating = async (event: Event): Promise<void> => {
	try {
		const newRate = event.currentTarget as HTMLElement;
		const rateValue = newRate.getAttribute("data-value");

		if (rateValue) {
			updateJokesArrayWithScore(jokes, rateValue);
		} else {
			console.warn("No s'ha trobat cap valor de puntuació.");
		}
	} catch (error) {
		renderError("No s'ha pogut carregar l'acudit.");
	}
};

document.addEventListener("DOMContentLoaded", () => {
	void startJoke();
	void startRating();
	void onClickNewJoke();
});
