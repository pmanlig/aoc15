//import React from 'react';
import Solver from './Solver';

class Parser {
	peek() {
		return this.input[this.pos];
	}

	next() {
		return this.input[this.pos++];
	}
	parseArray() {
		let arr = [];
		this.next(); // consume [
		while (this.peek() !== ']') {
			arr.push(this.parse());
			if (this.peek() === ',') { this.next(); }
		}
		this.next(); // consume ]
		return arr;
	}

	parseObject() {
		let obj = {};
		this.next(); // consume {
		while (this.peek() !== '}') {
			let propName = this.parseString();
			this.next(); // consume :
			obj[propName] = this.parse();
			if (this.peek() === ',') { this.next(); }
		}
		this.next(); // consume }
		return obj;
	}

	parseString() {
		this.next(); // consume "
		let s = "";
		while (this.peek() !== '"') {
			s += this.next();
		}
		this.next(); // consume "
		return s;
	}

	parseNumber() {
		let s = "";
		while ("-0123456789".includes(this.peek())) s += this.next();
		return parseInt(s, 10);
	}

	parse(input) {
		if (input) {
			this.input = input;
			this.pos = 0;
		}
		switch (this.peek()) {
			case '[':
				return this.parseArray();
			case '{':
				return this.parseObject();
			case '"':
				return this.parseString();
			default:
				return this.parseNumber();
		}
	}

}

export class S12a extends Solver {
	eval(o) {
		if (Array.isArray(o)) return o.map(x => this.eval(x)).reduce((a, b) => a + b, 0);
		if (typeof o === "number") return o;
		if (typeof o === "string") return 0;
		if (typeof o === "object") {
			let sum = 0;
			let keys = Object.keys(o);
			for (let i = 0; i < keys.length; i++) {
				if (o[keys[i]] === "red") return 0;
				sum += this.eval(o[keys[i]]);
			}
			return sum;
		}
	}

	solve(input) {
		let sum = input.match(/(-?\d+)/g).map(n => parseInt(n, 10)).reduce((a, b) => a + b, 0);
		let p = new Parser();
		let o = p.parse(input);
		console.log(o);
		let corrected = this.eval(o);
		this.setState({ solution: `Sum: ${sum}\nCorrected sum: ${corrected}` });
	}
}

export class S12b extends Solver {
}