// import React from 'react';
import Solver from './Solver';

class Computer {
	reg = { a: 0, b: 0 }
	prg = [];
	ip = 0;

	hlf(r) {
		this.reg[r] /= 2;
		this.ip++;
	}

	tpl(r) {
		this.reg[r] *= 3;
		this.ip++;
	}

	inc(r) {
		this.reg[r]++;
		this.ip++;
	}

	jmp(o) {
		this.ip += parseInt(o);
	}

	jie(r, o) {
		this.ip += this.reg[r] % 2 === 0 ? parseInt(o) : 1;
	}

	jio(r, o) {
		this.ip += this.reg[r] === 1 ? parseInt(o) : 1;
	}

	exec(prg) {
		this.ip = 0;
		this.prg = prg;
		while (this.ip > -1 && this.ip < prg.length) {
			let instr = this.prg[this.ip];
			this[instr[0]](instr[1], instr[2]);
		}
	}
}

export class S23a extends Solver {
	solve(input) {
		let regex = /^(hlf|tpl|inc|jmp|jie|jio) (a|b|\+\d+|-\d+),? ?(.*)$/;
		input = input.split('\n').map(s => regex.exec(s).splice(1));
		let cmp = new Computer(), cmp2 = new Computer();
		cmp.exec(input);
		cmp2.reg.a = 1;
		cmp2.exec(input);
		this.setState({ solution: `Register B: ${cmp.reg.b}\nRegister B when A starts at 1: ${cmp2.reg.b}` });
	}
}

export class S23b extends Solver {
}