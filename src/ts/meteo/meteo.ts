import { type AemetForecast, AemetResponse, type MunicipalityDates } from "../types.js";
import { municipalityId } from "../index.js";

export const filterMeteoByMunicipality = async (
	meteoResponse: AemetForecast,
): Promise<MunicipalityDates> => {
	console.log("filter", meteoResponse);
	let municipalityDates: MunicipalityDates = {
		nom: "Terrassa",
		temperatura: "24º",
	};
	return municipalityDates;
};
