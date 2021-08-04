//import React from 'react';
import Solver from './Solver';

export class S17a extends Solver {
	solve(input) {
		input = input.split('\n').map(n => parseInt(n, 10)).sort((a, b) => b - a);
		let combinations = 0, leastContainers = input.length, leastContainersCombinations = 0;
		for (let i = 0; i < (2 ** input.length); i++) {
			let amount = 0, num = 0;
			for (let j = 0; j < 20; j++) {
				if (((2 ** j) & i) > 0) {
					amount += input[j];
					num++;
				}
			}
			if (amount === 150) {
				combinations++;
				if (num < leastContainers) {
					leastContainers = num;
					leastContainersCombinations = 1;
				} else if (num === leastContainers) {
					leastContainersCombinations++;
				}
			}
		}
		this.setState({ solution: `Combinations: ${combinations}\nCombinations using least number of containers: ${leastContainersCombinations}` });
	}
}

export class S17b extends Solver {
}