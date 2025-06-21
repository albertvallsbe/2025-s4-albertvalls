import axios from "axios";
import { type Coords, type Municipi } from "./types.js";

export const obtenirPosicioGps = async (): Promise<Coords> => {
	if (!("geolocation" in navigator)) {
		throw new Error("Geolocalització no disponible");
	}

	try {
		const positionResult: GeolocationPosition = await new Promise<GeolocationPosition>(
			(resolve, reject) => {
				navigator.geolocation.getCurrentPosition(
					(position: GeolocationPosition) => {
						resolve(position);
					},
					(geoError: GeolocationPositionError) => {
						switch (geoError.code) {
							case geoError.PERMISSION_DENIED:
								reject(new Error("Permís denegat per l’usuari"));
								break;
							case geoError.POSITION_UNAVAILABLE:
								reject(new Error("Ubicació no disponible"));
								break;
							case geoError.TIMEOUT:
								reject(new Error("Temps exhaurit obtenint la ubicació"));
								break;
							default:
								reject(new Error("Error desconegut de geolocalització"));
						}
					},
					{
						enableHighAccuracy: true,
						timeout: 10_000,
						maximumAge: 0,
					},
				);
			},
		);

		return {
			latitude: positionResult.coords.latitude,
			longitude: positionResult.coords.longitude,
		};
	} catch (locationError) {
		if (locationError instanceof Error) {
			throw locationError;
		}

		throw new Error("S'ha produït un error inesperat obtenint la ubicació");
	}
};

export const obtenirMunicipiPerCoords = async (coords: Coords): Promise<string> => {
	const { latitude, longitude } = coords;

	try {
		const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
			params: {
				format: "json",
				lat: latitude,
				lon: longitude,
				// "accept-language": "ca",
			},
			headers: {
				"User-Agent": "el-meu-app/1.0",
				// "Accept-Language": "ca-ES",
			},
		});

		const { address } = response.data;
		const municipi: string =
			address.municipality ?? address.city ?? address.town ?? address.village;

		if (!municipi) {
			throw new Error("No s'ha pogut obtenir el municipi de les coordenades");
		}

		return municipi;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Error en la petició de reverse-geocoding: ${error.message}`);
		}

		throw error as Error;
	}
};

export const getUbicationAndMunicipi = async (): Promise<string> => {
	try {
		let coords = await obtenirPosicioGps();

		// coords = { latitude: 41.93333, longitude: 2.06667 };
		const municipi = await obtenirMunicipiPerCoords(coords);

		return municipi;
	} catch (error) {
		console.error((error as Error).message);

		throw error;
	}
};

export const getCodiMunicipiByName = async (nomMunicipi: string): Promise<string> => {
	const response = await axios.get<Municipi[]>("./src/municipis.json", {
		headers: { "Accept": "application/json" },
	});
	const municipis = response.data;

	const municipiFound = municipis.find((item) => item.nom === nomMunicipi);

	if (!municipiFound) {
		throw new Error(`Municipi "${nomMunicipi}" no trobat al llistat`);
	}

	return municipiFound.codi;
};
