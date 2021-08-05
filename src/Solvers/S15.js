//import React from 'react';
import Solver from './Solver';

export class S15a extends Solver {
	solve(input) {
		let ingredients = input.split('\n').map(i => /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (\d+)$/.exec(i).slice(1));
		console.log(ingredients);
		let best = 0, calLimitBest = 0, amounts = [];
		for (amounts[0] = 0; amounts[0] < 101; amounts[0]++) {
			for (amounts[1] = 0; amounts[1] < (101 - amounts[0]); amounts[1]++) {
				for (amounts[2] = 0; amounts[2] < (101 - amounts[1] - amounts[0]); amounts[2]++) {
					amounts[3] = 100 - amounts[2] - amounts[1] - amounts[0]
					let score = [0, 0, 0, 0, 0];
					for (let q = 0; q < 5; q++) {
						for (let i = 0; i < ingredients.length; i++)
							score[q] += amounts[i] * ingredients[i][q + 1];
					}
					if ((score[0] > 0) && (score[1] > 0) && (score[2] > 0) && (score[3] > 0)) {
						let tot = score[0] * score[1] * score[2] * score[3];
						if (tot > best) best = tot;
						if (score[4] === 500 && tot > calLimitBest) calLimitBest = tot;
					}
				}
			}
		}
		this.setState({ solution: `Best score: ${best}\nBest 500cal score: ${calLimitBest}` });
	}
}

export class S15b extends Solver {
}