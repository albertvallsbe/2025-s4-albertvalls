import axios from "axios";
// import { municipalities } from "./municipalities.js";
import {
	type Joke,
	type MunicipalityToday,
	AemetResponse,
	type Coords,
	type Municipi,
} from "./types.js";
import { renderJoke, renderError } from "./jokes/jokeUi.js";
import { renderMunicipalityDates } from "./meteo/meteoUi.js";
import { getCurrentMunicipality, getCodiMunicipiByName } from "./ubication.js";

import { randomJoke } from "./jokes/api-jokes.js";
import { meteoByMunicipality } from "./meteo/api-meteo.js";

import { updateJokesArray, updateJokesArrayWithScore } from "./jokes/joke.js";
import { filterMeteoByMunicipality } from "./meteo/meteo.js";

const jokes: Joke[] = [];
export let currentJokeId = "";
export let municipalityId = "Terrassa";
let municipiReal = "";
let municipalities: Municipi[] = [];

export let theoreticalHour = "22:01";

export const meteoCalls = async (): Promise<void> => {
	try {
		municipiReal = await getCurrentMunicipality();

		// console.log("municipiReal", municipiReal);
		// console.log("municipalityId", municipalityId);
		let idToUse = municipiReal !== "" ? municipiReal : municipalityId;

		// Use json to import municipalities list
		// *
		municipalities = await getMunicipalitiesList();
		// *

		// idToUse = "Xàtiva";
		let aemetCode = await getCodiMunicipiByName(municipalities, idToUse);

		// console.log("aemetCode", aemetCode);
		let meteoResponse = await meteoByMunicipality(aemetCode);

		// console.log("meteoResponse", meteoResponse);
		let filterMeteoResponse = await filterMeteoByMunicipality(meteoResponse);

		renderMunicipalityDates(filterMeteoResponse);
	} catch (error) {
		console.error("Error calling meteo API:", error);
	}
};

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

// Treballant amb json i axios
export const getMunicipalitiesList = async (): Promise<Municipi[]> => {
	const municipalitiesList = await axios.get<Municipi[]>("./src/municipis.json", {
		headers: { "Accept": "application/json" },
	});

	let municipalities = municipalitiesList.data;

	return municipalities;
};

document.addEventListener("DOMContentLoaded", async () => {
	void meteoCalls();
	void startJoke();
	void startRating();
	void onClickNewJoke();
});
