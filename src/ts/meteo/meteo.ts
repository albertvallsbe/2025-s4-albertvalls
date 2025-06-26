import { type AemetForecast, type AemetResponse, type MunicipalityToday } from "../types.js";
import { theoreticalHour } from "../index.js";

export function getNearestDatoValue(dato: Array<{ hora: number; value: number }>): number {
	if (dato.length === 0) {
		throw new Error("L'array de dades està buit");
	}

	const [hStr, mStr] = theoreticalHour.split(":");
	const h = Number(hStr);
	const m = Number(mStr);
	if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h >= 24 || m < 0 || m >= 60) {
		throw new Error(`Format d'hora invàlid: ${theoreticalHour}`);
	}

	const theoricHours = h + m / 60;

	let best = {
		diff: Infinity,
		value: Number(dato[0].value),
	};

	for (const entry of dato) {
		const rawHour = entry.hora % 24;
		const entryHour = rawHour < 0 ? rawHour + 24 : rawHour;

		const entryValue = entry.value;

		const directDiff = Math.abs(entryHour - theoricHours);
		const circularDiff = 24 - directDiff;
		const diff = Math.min(directDiff, circularDiff);

		if (diff < best.diff) {
			best = { diff, value: entryValue };
		}
	}

	return best.value;
}

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

	const nearest = getNearestDatoValue(dato);
	const temperatura = `Actual: ${nearest}°C - Min: ${minima}°C / Max: ${maxima}°C`;

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
