//import React from 'react';
import Solver from './Solver';

export class S16a extends Solver {
	filter(list, type, amount) {
		return list.filter(s => s.includes(type) ? s.includes(`${type}: ${amount}`) : true);
	}

	filter2(list, type, func) {
		return list.filter(s => s.includes(type) ? func(parseInt(new RegExp(`${type}: (\\d+)`).exec(s)[1], 10)) : true);
	}

	solve(input) {
		let sue1 = "", sue2 = "";
		let sues = input.split('\n');
		sues = this.filter(sues, "children", 3);
		sues = this.filter(sues, "cats", 7);
		sues = this.filter(sues, "samoyeds", 2);
		sues = this.filter(sues, "pomeranians", 3);
		sues = this.filter(sues, "akitas", 0);
		sues = this.filter(sues, "vizslas", 0);
		sues = this.filter(sues, "goldfish", 5);
		sues = this.filter(sues, "trees", 3);
		sues = this.filter(sues, "cars", 2);
		sues = this.filter(sues, "perfumes", 1);
		sue1 = parseInt(/^Sue (\d+)/.exec(sues[0])[1]);
		sues = input.split('\n');
		sues = this.filter(sues, "children", 3);
		sues = this.filter(sues, "samoyeds", 2);
		sues = this.filter(sues, "akitas", 0);
		sues = this.filter(sues, "vizslas", 0);
		sues = this.filter(sues, "cars", 2);
		sues = this.filter(sues, "perfumes", 1);
		sues = this.filter2(sues, "cats", x => x > 7);
		sues = this.filter2(sues, "trees", x => x > 3);
		sues = this.filter2(sues, "pomeranians", x => x < 3);
		sues = this.filter2(sues, "goldfish", x => x < 5);
		sue2 = parseInt(/^Sue (\d+)/.exec(sues[0])[1]);
		this.setState({ solution: `First Sue: ${sue1}\nSecond Sue: ${sue2}` });
	}
}

export class S16b extends Solver {
}