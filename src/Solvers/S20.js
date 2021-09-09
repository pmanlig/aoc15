// import React from 'react';
import Solver from './Solver';

export class S20a extends Solver {
	solve(input) {
		input = parseInt(input, 10);
		let max = input / 10;
		let houses = [];
		for (let i = 1; i <= max; i++) { houses[i] = 10; }
		for (let i = 2; i <= max; i++) {
			for (let j = i; j <= max; j += i) {
				houses[j] += 10 * i;
			}
		}
		let h1 = 0, h2 = 0;
		while (houses[++h1] < input);
		for (let i = 1; i <= max; i++) { houses[i] = 0; }
		for (let i = 1; i <= max; i++) {
			for (let j = 1; j <= 50; j++) {
				if (i * j > max) break;
				houses[i * j] += 11 * i;
			}
		}
		while (houses[++h2] < input);
		console.log("Houses", houses);
		this.setState({ solution: `House: ${h1}\nHouse (lazy): ${h2}` });
		// setTimeout(() => { this.increment(1, input) }, 1);
	}
}


export class S20b extends Solver {
}