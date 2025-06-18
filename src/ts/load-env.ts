/* eslint-disable @typescript-eslint/naming-convention */
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

const configContent = `/**
 * Aquest fitxer és generat per scripts/load-env.ts
 * No l'editis a mà, torna'l a generar després de canviar .env
 */
export const API_JOKES = "${apiUrlJokes}";
export const API_METEO = "${apiUrlMeteo}";
`;

const outPath = path.resolve(__dirname, "config.ts");
fs.writeFileSync(outPath, configContent, { encoding: "utf8" });
console.log(`✅  Configuració generada a ${outPath}`);
