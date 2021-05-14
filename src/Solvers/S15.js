//import React from 'react';
import Solver from './Solver';

export class S15a extends Solver {
	solve(input) {
		let ingredients = input.split('\n').map(i => /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (\d+)$/.exec(i).slice(1));
		console.log(ingredients);
		this.setState({ solution: "No solution yet" });
	}
}

export class S15b extends Solver {
}