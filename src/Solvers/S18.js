// import React from 'react';
import Solver from './Solver';

export class S18a extends Solver {
	count(state, r, c) {
		let res = 0;
		if (r > 0) {
			if (c > 0) res += state[r - 1][c - 1];
			if (c < 99) res += state[r - 1][c + 1];
			res += state[r - 1][c];
		}
		if (c > 0) res += state[r][c - 1];
		if (c < 99) res += state[r][c + 1];
		if (r < 99) {
			if (c > 0) res += state[r + 1][c - 1];
			if (c < 99) res += state[r + 1][c + 1];
			res += state[r + 1][c];
		}
		return res;
	}

	solve(input) {
		input = input.split('\n').map(l => l.split('').map(c => c === '#' ? 1 : 0));
		let steps = 100, state = input, stuckState = input;
		while (steps-- > 0) {
			let n = [], n2 = [];
			for (let row = 0; row < 100; row++) {
				n[row] = [];
				for (let col = 0; col < 100; col++) {
					let c = this.count(state, row, col);
					n[row][col] = (state[row][col] === 1 ? ((c === 2 || c === 3) ? 1 : 0) : (c === 3 ? 1 : 0));
				}
			}
			stuckState[0][0] = 1;
			stuckState[0][99] = 1;
			stuckState[99][0] = 1;
			stuckState[99][99] = 1;
			for (let row = 0; row < 100; row++) {
				n2[row] = [];
				for (let col = 0; col < 100; col++) {
					let c = this.count(stuckState, row, col);
					n2[row][col] = (stuckState[row][col] === 1 ? ((c === 2 || c === 3) ? 1 : 0) : (c === 3 ? 1 : 0));
				}
			}
			state = n;
			stuckState = n2;
			stuckState[0][0] = 1;
			stuckState[0][99] = 1;
			stuckState[99][0] = 1;
			stuckState[99][99] = 1;
		}
		let total = state.map(l => l.reduce((t, c) => t + c)).reduce((tot, curr) => tot + curr);
		let stuckTotal = stuckState.map(l => l.reduce((t, c) => t + c)).reduce((tot, curr) => tot + curr);
		this.setState({ solution: `Lights on: ${total}\nLights on in faulty grid: ${stuckTotal}` });
	}
}

export class S18b extends Solver {
}
