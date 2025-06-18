/* eslint-disable @typescript-eslint/naming-convention */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiUrl = process.env.API_URL;
if (!apiUrl) {
	console.error("⚠️  ERROR: .env no conté API_URL");
	process.exit(1);
}

const configContent = `/**
 * Aquest fitxer és generat per scripts/load-env.ts
 * No l'editis a mà, torna'l a generar després de canviar .env
 */
export const API_URL = "${apiUrl}";
`;

const outPath = path.resolve(__dirname, "config.ts");
fs.writeFileSync(outPath, configContent, { encoding: "utf8" });
console.log(`✅  Configuració generada a ${outPath}`);
