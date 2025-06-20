import { type AemetForecast, AemetResponse, type MunicipalityDates } from "../types.js";

export const renderMunicipalityDates = (meteoDates: MunicipalityDates): void => {
	try {
		const meteoMunicipalityTextElement = document.querySelector("#location");
		if (!meteoMunicipalityTextElement) throw new Error("Element Meteo name not found");

		const meteoMunicipalityTemperatureElement = document.querySelector("#temperature");
		if (!meteoMunicipalityTemperatureElement) throw new Error("Element Joke not found");

		meteoMunicipalityTextElement.textContent = meteoDates.nom;
		meteoMunicipalityTemperatureElement.textContent = meteoDates.temperatura;
	} catch (error) {
		console.error("Error rendering joke:", error);
	}
};
