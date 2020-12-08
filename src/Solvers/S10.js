//import React from 'react';
import Solver from './Solver';

export class S10a extends Solver {
	looksay(n) {
		let d = 1, last = n[0], res = "";
		for (let i = 1; i < n.length; i++) {
			if (n[i] === last) {
				d++;
			} else {
				res += d;
				res += last;
				d = 1;
				last = n[i];
			}
		}
		res += d;
		res += last;
		return res;
	}

	solve(input) {
		let result = input;
		for (let i = 0; i < 40; i++) {
			result = this.looksay(result);
		}
		let fourty = result.length;
		for (let i = 0; i < 10; i++) {
			result = this.looksay(result);
		}
		let fifty = result.length;
		this.setState({ solution: `Looksay number length(40): ${fourty}\nLooksay number length(50): ${fifty}` });
	}
}

export class S10b extends Solver {
}