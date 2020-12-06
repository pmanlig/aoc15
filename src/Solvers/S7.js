// import React from 'react';
import Solver from './Solver';

class Gate {
	constructor(s) {
		s = s.split(" -> ");
		this.output = s.pop();
		let input = s.pop();
		this.inputs = input.split(/ AND |NOT | RSHIFT | LSHIFT | OR /).filter(x => x !== "");
		this.op = (x) => x;
		if (input.includes("AND")) { this.op = (x, y) => x & y; }
		if (input.includes("OR")) { this.op = (x, y) => x | y; }
		if (input.includes("NOT")) { this.op = (x) => (~x) & 65535; }
		if (input.includes("LSHIFT")) { this.op = (x, y) => x << y % 65536; }
		if (input.includes("RSHIFT")) { this.op = (x, y) => x >>> y; }
	}

	eval(circuit) {
		if (this.value === undefined) {
			let e = [];
			for (let i = 0; i < this.inputs.length; i++) {
				let p = this.inputs[i];
				if (typeof p == "number") {
					e.push(p);
					continue;
				}
				let x = parseInt(p, 10);
				if (!isNaN(x)) {
					e.push(x);
					continue;
				}
				e.push(circuit[p].eval(circuit));
			}
			this.value = this.op(...e);
		}
		return this.value;
	}
}

export class S7a extends Solver {
	solve(input) {
		input = input.split('\n').map(l => new Gate(l));
		let circuit = {};
		input.forEach(g => circuit[g.output] = g);
		let a = circuit["a"].eval(circuit);
		input.forEach(g => { g.value = undefined; });
		circuit["b"].value = a;
		this.setState({ solution: `Gates: ${input.length}\nWire a: ${a}\nWire a after reset: ${circuit["a"].eval(circuit)}` });
	}
}

export class S7b extends Solver {
}