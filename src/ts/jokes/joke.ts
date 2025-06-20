import { type Joke } from "../types.js";
import { currentJokeId } from "../index.js";

export const updateJokesArray = (jokes: Joke[], newJoke: Joke) => {
	try {
		jokes.push(newJoke);

		return jokes;
	} catch (error) {
		console.error(error);
	}
};

export const updateJokesArrayWithScore = (jokes: Joke[], rateValue: string): void => {
	try {
		if (!Array.isArray(jokes)) {
			throw new Error("El paràmetre 'jokes' no és un array vàlid.");
		}

		if (!currentJokeId) {
			throw new Error("currentJokeId no està definit.");
		}

		const updatedJokes = jokes.find((joke) => {
			if (joke.id === currentJokeId) {
				joke.score = Number(rateValue);
				joke.date = new Date().toISOString();
				return true;
			}

			return false;
		});

		console.log(jokes);
	} catch (error) {
		console.error(error);
	}
};
