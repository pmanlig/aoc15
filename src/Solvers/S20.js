// import React from 'react';
import Solver from './Solver';

export class S20a extends Solver {
	presents(i) {
		let elf = 0, p = i * 10, half = Math.floor(i / 2);
		while (elf++ < half) if (i % elf === 0) p += 10 * elf;
		return p;
	}

	solve(input) {
		input = parseInt(input, 10);
		let house = input;
		while (this.presents(house) < input) {
			house++;
		}
		console.log("Done");
		this.setState({ solution: `House #: ${house}` });
	}
}

export class S20b extends Solver {
}