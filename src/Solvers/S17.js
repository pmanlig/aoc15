//import React from 'react';
import Solver from './Solver';

export class S17a extends Solver {
	solve(input) {
		input = input.split('\n').map(n => parseInt(n, 10)).sort((a, b) => b - a);
		let combinations = 0;
		for (let i = 0; i < (2 ** 20); i++) {
			let amount = 0;
			for (let j = 0; j < 20; j++) {
				if (((2 ** j) & i) > 0) amount += input[j];
			}
			if (amount === 150) combinations++;
		}
		this.setState({ solution: `Combinations: ${combinations}` });
	}
}

export class S17b extends Solver {
}