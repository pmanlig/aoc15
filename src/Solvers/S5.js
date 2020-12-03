//import React from 'react';
import Solver from './Solver';

export class S5a extends Solver {
	vowels = "aeiou";

	nice1(s) {
		if (s.includes("ab") || s.includes("cd") || s.includes("pq") || s.includes("xy")) {
			return 0;
		}
		let v = 0;
		let d = false;
		for (let j = 0; j < s.length; j++) {
			if (this.vowels.includes(s[j])) { v++; }
			if (j > 0 && s[j - 1] === s[j]) { d = true; }
		}
		return d && v > 2 ? 1 : 0;
	}

	nice2(s) {
		let d = 0, r = 0;
		for (let i = 0; i < s.length - 2; i++) {
			if (s.substring(i + 2).includes(s.substring(i, i + 2))) { d = 1; }
			if (s[i] === s[i + 2]) { r = 1; }
		}
		return d * r;
	}

	solve(input) {
		input = input.split('\n');
		let n1 = 0, n2 = 0;
		for (let i = 0; i < input.length; i++) {
			n1 += this.nice1(input[i]);
			n2 += this.nice2(input[i]);
		}
		this.setState({ solution: `Lines: ${input.length}\nNice(1): ${n1}\nNice(2): ${n2}` });
	}
}

export class S5b extends Solver {
}