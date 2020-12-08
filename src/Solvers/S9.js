// import React from 'react';
import Solver from './Solver';

export class S9a extends Solver {
	calc(route) {
		let dist = 0;
		for (let i = 1; i < route.length; i++) {
			dist += this.paths[route[i - 1]][route[i]];
		}
		// console.log(`${route.join(",")} => ${dist}`);
		return dist;
	}

	permutate(cities, taken, p) {
		if (taken.length === cities.length) { return this.calc(taken); }
		let dist = -1;
		for (let i = 0; i < cities.length; i++) {
			if (!taken.includes(cities[i])) {
				let d = this.permutate(cities, taken.concat([cities[i]]), p);
				if (dist === -1 || p(d, dist)) { dist = d; }
			}
		}
		return dist;
	}

	solve(input) {
		// input = "London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141";
		input = input.split('\n').map(d => /^([A-Za-z]+)\sto\s([A-Za-z]+)\s=\s(\d+)$/g.exec(d).slice(1));
		let cities = [...new Set(input.map(c => c[0]).concat(input.map(d => d[1])))];
		this.paths = {};
		cities.forEach(c => this.paths[c] = {});
		input.forEach(p => {
			let dist = parseInt(p[2], 10);
			this.paths[p[0]][p[1]] = dist;
			this.paths[p[1]][p[0]] = dist;
		});
		let shortest = this.permutate(cities, [], (n, d) => n < d);
		let longest = this.permutate(cities, [], (n, d) => n > d);

		this.setState({ solution: `Shortest distance: ${shortest}\nLongest: ${longest}` });
	}
}

export class S9b extends Solver {
}