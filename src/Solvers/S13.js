//import React from 'react';
import Solver from './Solver';

function permutate(list, func, fixed) {
	if (fixed === undefined) fixed = [];
	if (list.length === 1) func(fixed.concat(list));
	else {
		for (let i = 0; i < list.length; i++) {
			let elem = list[i];
			permutate(list.filter(e => e !== elem), func, fixed.concat([elem]));
		}
	}
}

export class S13a extends Solver {

	happiness(seating, rules) {
		let h = 0;
		for (let i = 0; i < seating.length; i++) {
			let r = rules[seating[i]];
			h += r[seating[(i + 1) % seating.length]];
			h += r[seating[(i + seating.length - 1) % seating.length]];
		}
		return h;
	}

	solve(input) {
		// input = "Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol.";
		input = input.split('\n').map(l => /^(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+).$/mi.exec(l).slice(1));
		let rules = {};
		input.forEach(r => {
			if (rules[r[0]] === undefined) rules[r[0]] = {};
			rules[r[0]][r[3]] = parseInt(r[2], 10) * (r[1] === "lose" ? -1 : 1);
		});
		let guests = [...new Set(input.map(d => d[0]))];
		let max = 0, max2 = 0;
		permutate(guests.slice(1), list => {
			let h = this.happiness(list, rules);
			if (h > max) max = h;
		}, [guests[0]]);
		rules["me"] = {};
		guests.forEach(g => {
			rules["me"][g] = 0;
			rules[g]["me"] = 0;
		});
		permutate(guests, list => {
			let h = this.happiness(list, rules);
			if (h > max2) max2 = h;
		}, ["me"]);
		this.setState({ solution: `# guests: ${guests.length}\nMax happiness: ${max}\nMax including yourself: ${max2}` });
	}
}

export class S13b extends Solver {
}