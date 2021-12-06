// import React from 'react';
import Solver from './Solver';

export class S25a extends Solver {
	solve(input) {
		// input = "3 3";
		input = input.match(/(\d+)/g).map(n => parseInt(n));
		let diagonal = input[0] + input[1] - 1;
		let n = diagonal * (diagonal - 1) / 2.0 + input[1];
		let code = 20151125;
		while (n-- > 1) { code = (code * 252533) % 33554393; }
		this.setState({ solution: `Row: ${input[0]}\nColumn: ${input[1]}\nCode: ${code}` });
	}
}

export class S25b extends Solver {
}