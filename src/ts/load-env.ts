import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiUrlJokes = process.env.API_JOKES;
if (!apiUrlJokes) {
	console.error("⚠️  ERROR: .env no conté API_JOKES");
	process.exit(1);
}

const apiUrlMeteo = process.env.API_METEO;
if (!apiUrlMeteo) {
	console.error("⚠️  ERROR: .env no conté API_METEO");
	process.exit(1);
}

const apiUrlMeteoKey = process.env.API_METEO_KEY;
if (!apiUrlMeteoKey) {
	console.error("⚠️  ERROR: .env no conté API_METEO_KEY");
	process.exit(1);
}

const apiStreetmap = process.env.API_STREETMAP;
if (!apiStreetmap) {
	console.error("⚠️  ERROR: .env no conté API_STREETMAP");
	process.exit(1);
}

const configContent = `/**
 * Aquest fitxer és generat per scripts/load-env.ts
 * No l'editis a mà, torna'l a generar després de canviar .env
 */
export const API_JOKES = "${apiUrlJokes}";
export const API_METEO = "${apiUrlMeteo}";
export const API_METEO_KEY = "${apiUrlMeteoKey}";
export const API_STREETMAP = "${apiStreetmap}";
`;

const outPath = path.resolve(__dirname, "config.ts");
fs.writeFileSync(outPath, configContent, { encoding: "utf8" });
console.log(`✅  Configuració generada a ${outPath}`);
