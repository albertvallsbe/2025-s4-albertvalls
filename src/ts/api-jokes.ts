import axios from "axios";
import { API_JOKES } from "./config.js";
import { type Joke } from "./types.js";

export const randomJoke = async (): Promise<Joke> => {
	try {
		const response = await axios.get<Joke>(API_JOKES, {
			headers: { accept: "application/json" },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching joke:", error);
		throw new Error("Error fetching joke");
	}
};
