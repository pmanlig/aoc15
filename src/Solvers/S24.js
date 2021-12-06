// import React from 'react';
import Solver from './Solver';

export class S24a extends Solver {
	findSolution(target, remaining, current, currentSum, sums, solution) {
		if (currentSum + sums[remaining.length] < target) { return; }
		let present = remaining[0];
		let rest = remaining.slice(1);
		if (currentSum + present === target) {
			// Solution found
			let s = current.concat(present);
			let qe = s.reduce((a, b) => a * b, 1);
			if (s.length < solution.presents.length || (s.length === solution.presents.length && qe < solution.qe)) {
				solution.presents = s;
				solution.qe = qe;
			}
			return;
		}
		if (currentSum + present < target) {
			this.findSolution(target, rest, current.concat(present), currentSum + present, sums, solution);
		}
		this.findSolution(target, rest, current, currentSum, sums, solution);
	}

	solve(input) {
		// input = "1\n2\n3\n4\n5\n7\n8\n9\n10\n11";
		input = input.split('\n').map(n => parseInt(n));
		let total = input.reduce((a, b) => a + b);
		let sums = [0];
		for (let i = 0; i < input.length; i++) { sums[i + 1] = sums[i] + input[i]; }
		input = input.reverse();
		let s3 = { presents: input, qe: 0 }, s4 = { presents: input, qe: 0 };
		this.findSolution(total / 3, input, [], 0, sums, s3);
		this.findSolution(total / 4, input, [], 0, sums, s4);
		this.setState({ solution: `Total: ${total} (1/3 = ${total / 3}, 1/4 = ${total / 4})\nSolution(3): ${s3.presents.join(',')} (QE: ${s3.qe})\nSolution(4): ${s4.presents.join(',')} (QE: ${s4.qe})` });
	}
}

export class S24b extends Solver {
}