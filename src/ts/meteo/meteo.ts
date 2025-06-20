import { type AemetForecast, type AemetResponse, type MunicipalityToday } from "../types.js";
import { municipalityId } from "../index.js";

export const filterMeteoByMunicipality = async (
	meteoResponse: AemetForecast,
): Promise<MunicipalityToday> => {
	if (meteoResponse.length === 0) {
		throw new Error("Resposta buida de l'AEMET");
	}

	const forecast = meteoResponse[0];
	const diaArray = forecast.prediccion.dia;
	if (diaArray.length === 0) {
		throw new Error("No hi ha predicció per avui");
	}

	const todayForecast = diaArray[0];

	const {
		temperatura: { maxima, minima, dato: hourlyData },
	} = todayForecast;
	const dato = hourlyData.map((entry) => ({
		hora: entry.hora,
		value: entry.value,
	}));

	const temperatura = `Min: ${minima}°C / Max: ${maxima}°C`;

	let municipalityTodayDates: MunicipalityToday = {
		nombre: forecast.nombre,
		provincia: forecast.provincia,
		dato,
		maxima,
		minima,
		temperatura,
	};
	console.log(
		"filter → municipalityTodayDates:",
		JSON.stringify(municipalityTodayDates, null, 2),
	);
	return municipalityTodayDates;
};
