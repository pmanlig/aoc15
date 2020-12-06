// import React from 'react';
import Solver from './Solver';

export class S8a extends Solver {
	solve(input) {
		input = input.replace(/\n/g, "");
		let mem = input.replace(/\\x..|\\\\|\\"/g, "?");
		mem = mem.replace(/"/g, "");
		this.setState({ solution: `Characters: ${input.length - mem.length}` });
	}
}

export class S8b extends Solver {
	solve(input) {
		let i = 0;
		let enc = input.split('\n').map(l => {
			l = l.replace(/\\/g, "\\\\");
			l = l.replace(/"/g, "\\\"");
			return `"${l}"`;
		}).reduce((a, b) => a + b, "");
		input = input.replace(/\n/g, "");
		this.setState({ solution: `Characters: ${enc.length - input.length}` });
	}
}