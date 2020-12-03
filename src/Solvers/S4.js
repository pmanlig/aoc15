// import React from 'react';
import Solver from './Solver';
import { md5 } from '../util/md5';

export class S4a extends Solver {
	calc(i, five, six, input) {

		let inc = 10000;
		while (inc-- > 0) {
			let h = md5(input + i);
			if (five === 0 && h.startsWith("00000")) five = i;
			if (six === 0 && h.startsWith("000000")) { six = i; break; }
			i++;
		}

		this.setState({
			solution: `Test hash #1: ${md5("abcdef609043")}\n\
				#: ${i}\n\
				Number(5): ${five === 0 ? '?' : five}\n\
				md5: ${five === 0 ? "Calculating..." : md5(input + five)}\n\
				Number(6): ${six === 0 ? '?' : six}\n\
				md5: ${six === 0 ? "Calculating..." : md5(input + six)}`
		});

		if (six === 0)
			setTimeout(() => { this.calc(i, five, six, input) }, 1);
	}

	solve(input) {
		let i = 1, five = 0, six = 0;
		this.calc(i, five, six, input);
	}
}

export class S4b extends Solver {
}