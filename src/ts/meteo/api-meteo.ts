import axios from "axios";
import { API_METEO, API_METEO_KEY } from "../config.js";
import type { AemetResponse, AemetForecast } from "../types.js";

export const meteoByMunicipality = async (municipalityId: string): Promise<AemetForecast> => {
	try {
		let url = `${API_METEO}${municipalityId}`;

		const initialResponse = await axios.get<AemetResponse>(url, {
			params: {
				"api_key": API_METEO_KEY,
			},
		});

		const { datos } = initialResponse.data;

		if (!datos) {
			throw new Error("No s'ha rebut cap URL de dades");
		}

		const forecastResponse = await axios.get<AemetForecast>(datos);

		// console.log("📦 Dades meteorològiques rebudes:", forecastResponse.data);

		return forecastResponse.data;
	} catch (error) {
		console.error("Error obtenint dades de l'AEMET:", error);
		throw new Error("Error carregant la predicció meteorològica");
	}
};
