// import React from 'react';
import Solver from './Solver';

export class S3a extends Solver {
	solve(input) {
		let presents = input.length + 1, presents1 = input.length + 1;
		let houses = [[1]], houses1 = [[2]];
		let pos = { x: 0, y: 0 }, pos1 = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
		for (let i = 0; i < input.length; i++) {
			let n = i % 2;
			if (input[i] === '^') { pos.y++; pos1[n].y++; }
			if (input[i] === '>') { pos.x++; pos1[n].x++; }
			if (input[i] === '<') { pos.x--; pos1[n].x--; }
			if (input[i] === 'v') { pos.y--; pos1[n].y--; }
			if (houses[pos.y] === undefined) { houses[pos.y] = []; }
			if (houses[pos.y][pos.x] === undefined) {
				houses[pos.y][pos.x] = 1;
			} else {
				houses[pos.y][pos.x]++;
				presents--;
			}
			if (houses1[pos1[n].y] === undefined) { houses1[pos1[n].y] = []; }
			if (houses1[pos1[n].y][pos1[n].x] === undefined) {
				houses1[pos1[n].y][pos1[n].x] = 1;
			} else {
				houses1[pos1[n].y][pos1[n].x]++;
				presents1--;
			}
		}
		this.setState({ solution: `Length: ${input.length}\n# houses(1): ${presents}\n# houses(2): ${presents1}` });
	}
}

export class S3b extends Solver {
	solve(input) {
		let presents = input.length + 1, presents1 = input.length + 1;
		let houses = [[1]], houses1 = [[2]];
		let pos = { x: 0, y: 0 }, pos1 = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
		for (let i = 0; i < input.length; i++) {
			let n = i % 2;
			if (input[i] === '^') { pos.y++; pos1[n].y++; }
			if (input[i] === '>') { pos.x++; pos1[n].x++; }
			if (input[i] === '<') { pos.x--; pos1[n].x--; }
			if (input[i] === 'v') { pos.y--; pos1[n].y--; }
			if (houses[pos.y] === undefined) { houses[pos.y] = []; }
			if (houses[pos.y][pos.x] === undefined) {
				houses[pos.y][pos.x] = 1;
			} else {
				houses[pos.y][pos.x]++;
				presents--;
			}
			if (houses1[pos1[n].y] === undefined) { houses1[pos1[n].y] = []; }
			if (houses1[pos1[n].y][pos1[n].x] === undefined) {
				houses1[pos1[n].y][pos1[n].x] = 1;
			} else {
				houses1[pos1[n].y][pos1[n].x]++;
				presents1--;
			}
		}
		this.setState({ solution: `Length: ${input.length}\n# houses(1): ${presents}\n# houses(2): ${presents1}` });
	}
}