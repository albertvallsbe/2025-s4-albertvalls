export type Joke = {
	id: string;
	joke: string;
	status: string;
	score?: number;
	date?: string;
};

export type AemetResponse = {
	descripcion: string;
	estado: number;
	datos: string;
	metadatos: string;
};

export type AemetForecast = {
	nombre: string;
	provincia: string;
	prediccion: {
		dia: Array<{
			fecha: string;
			estadoCielo: Array<{ value: string; periodo: string }>;
			temperatura: {
				maxima: string;
				minima: string;
			};
		}>;
	};
};

export type MunicipalityDates = {
	nom: string;
	temperatura: string;
};
