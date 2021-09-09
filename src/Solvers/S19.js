// import React from 'react';
import Solver from './Solver';

export class S19a extends Solver {
	operate(mol, rules, result) {
		result = result || new Set();
		for (let i = 0; i < mol.length; i++) {
			for (let j = 0; j < rules.length; j++) {
				let l = rules[j][0].length;
				if (i + l - 1 < mol.length) {
					if (mol.slice(i, i + l) === rules[j][0]) {
						result.add(mol.slice(0, i) + rules[j][1] + mol.slice(i + l));
					}
				}
			}
		}
		return result;
	}

	reverseOperate(search, rules, seen) {
		let b = 0;
		for (let i = 1; i < search.length; i++) {
			if (search[i].data.length < search[b].data.length ||
				(search[i].data.length === search[b].data.length && search[i].steps < search[b].steps)) {
				b = i;
			}
		}
		let data = search[b].data, steps = search[b].steps;
		search.splice(b, 1);
		if (data !== "e") {
			if (!seen.has(data)) {
				seen.add(data);
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < rules.length; j++) {
						let l = rules[j][1].length;
						if (i + l - 1 < data.length) {
							if (data.slice(i, i + l) === rules[j][1]) {
								let n = data.slice(0, i) + rules[j][0] + data.slice(i + l);
								search = search.filter(r => r.data !== n);
								search.push({ steps: steps + 1, data: n });
							}
						}
					}
				}
			}
			setTimeout(() => { this.reverseOperate(search, rules, seen) }, 1);
		}
		this.setState({ molecule: data, steps: steps });
	}

	solve(input) {
		// input = "H => HO\nH => OH\nO => HH\n\nHOH";
		// input = "H => HO\nH => OH\nO => HH\n\nHOHOHO";
		input = input.split('\n');
		let mol = input[input.length - 1];
		let rules = input.slice(0, -2).map(s => /(\w+) => (\w+)/.exec(s).slice(1, 3));
		let result = this.operate(mol, rules);
		this.setState({ calibration: result.size, steps: 0, molecule: mol });
		setTimeout(() => { this.reverseOperate([{ steps: 0, data: mol }], rules, new Set()); }, 1);
	}

	customRender() {
		return <div>
			<p>Calibration: {this.state.calibration}</p>
			<p>Best sequence: {this.state.steps}</p>
			<p>Current sequence: {this.state.molecule}</p>
			<p>Current length: {this.state.molecule.length}</p>
		</div>;
	}
}

export class S19b extends Solver {
}