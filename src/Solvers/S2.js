// import React from 'react';
import Solver from './Solver';

export class S2a extends Solver {
	solve(input) {
		input = input.split("\n").map(s => s.split('x').map(n => parseInt(n, 10)));
		let paper = 0, ribbon = 0;
		input.forEach(i => {
			let p = { w: i[0], h: i[1], d: i[2] }
			paper += 2 * (p.w * p.h + p.w * p.d + p.h * p.d) + Math.min(p.w * p.h, p.w * p.d, p.h * p.d);
			ribbon += 2 * Math.min(p.w + p.h, p.w + p.d, p.h + p.d) + p.w * p.h * p.d;
		});
		this.setState({ solution: `Lines: ${input.length}\nWrapping paper: ${paper}\nRibbon: ${ribbon}` });
	}
}

export class S2b extends Solver {
}