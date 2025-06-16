import { type Joke } from "./types.js";

export const updateJokesArray = (jokes: Joke[], newJoke: Joke) => {
	try {
		jokes.push(newJoke);

		console.log(jokes);
		return jokes;
	} catch (error) {
		console.error(error);
	}
};
