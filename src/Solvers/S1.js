import Solver from './Solver';

export class S1a extends Solver {
	solve(input) {
		let floor = 0;
		let hits_basement = 0;
		for (let i = 0; i < input.length; i++) {
			if (input[i] === '(') { floor++; } else { floor--; }
			if (floor === -1 && hits_basement < 1) hits_basement = i + 1;
		}
		this.setState({ solution: `Characters: ${input.length}\nFinal floor: ${floor}\nHits basement on instruction: ${hits_basement}` });
	}
}

export class S1b extends Solver {
}