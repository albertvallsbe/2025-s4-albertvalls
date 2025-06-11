import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

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

const outPath = path.resolve(__dirname, "../src/config.ts");
fs.writeFileSync(outPath, configContent, { encoding: "utf8" });
console.log(`✅  Configuració generada a ${outPath}`);
