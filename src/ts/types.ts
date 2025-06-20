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
export type AemetForecastDay = {
	fecha: string;
	estadoCielo?: Array<{ value: string; periodo: string }>;
	probPrecipitacion?: Record<string, unknown>;
	humedadRelativa?: Array<{
		maxima: number;
		minima: number;
		dato: Array<{ hora: number; value: number }>;
	}>;
	sensTermica?: {
		maxima: number;
		minima: number;
		dato: Array<{ hora: number; value: number }>;
	};
	uvMax?: number;
	viento?: Record<string, unknown>;
	cotaNieveProv?: Record<string, unknown>;
	// **Ara temperatura és un objecte, no un array**
	temperatura: {
		maxima: number;
		minima: number;
		dato: Array<{ hora: number; value: number }>;
	};
};

export type AemetForecast = Array<{
	elaborado: string;
	id: number;
	nombre: string;
	origen: Record<string, unknown>;
	notaLegal: string;
	enlace: string;
	version: number;
	provincia: string;
	prediccion: {
		dia: AemetForecastDay[];
	};
}>;

export type MunicipalityToday = {
	nombre: string;
	provincia: string;
	maxima: number;
	minima: number;
	temperatura: string;
	dato: Array<{
		hora: number;
		value: number;
	}>;
};
