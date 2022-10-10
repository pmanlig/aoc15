// import React from 'react';
import Solver from './Solver';

const molEx = /(e|[A-Z][a-z]?)/g;

class State {
	constructor(mol, steps) {
		this.mol = mol;
		this.steps = steps;
	}

	generate(rules) {
		let moves = [];
		rules.forEach(r => {
			let matches = [...this.mol.matchAll(new RegExp(r[1], "g"))].map(a => a.index);
			matches.forEach(m => {
				moves.push(new State(this.mol.substr(0, m) + r[0] + this.mol.substr(m + r[1].length), this.steps + 1));
			});
		});
		/*
		atoms.forEach((a, i) => {
			rules.forEach(r => {
				if (r[0] === a) {
					let cpy = [...atoms];
					cpy[i] = r[1];
					let newMol = cpy.join('');
					if (!moves.some(m => m.mol === newMol)) { moves.push(new State(newMol, this.steps + 1)) }
				}
			});
		});
		*/
		return moves;
	}
}

class Search {
	constructor(initial, target) {
		this.queue = [initial];
		this.target = target;
		this.targetAtoms = target.match(molEx);
		initial.matches = this.compare(initial.mol);
	}

	compare(mol) {
		let atoms = mol.match(molEx);
		for (let i = 0; i < atoms.length; i++) {
			if (atoms[i] !== this.targetAtoms[i]) { return i; }
		}
		return atoms.length;
	}

	find(rules) {
		let sorter = (a, b) => b.mol.length - a.mol.length;
		let pot = this.queue.pop();
		while (pot.mol !== this.target) {
			let mv = pot.generate(rules);
			// mv.forEach(m => m.matches = this.compare(m.mol))
			this.queue = this.queue.concat(mv);
			this.queue.sort(sorter);
			pot = this.queue.pop();
		}
		return pot;
	}
}

export class S19a extends Solver {
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
		let rules = input.slice(0, -2).map(s => /(\w+) => (\w+)/.exec(s).slice(1));
		let calibration = new State(mol, 0).generate(rules);
		let search = new Search(new State(mol, 0), "e");
		let reaction = search.find(rules);
		this.setState({ calibration: calibration.length, steps: reaction.steps, molecule: reaction.mol });
		/*
		let ruledata = rules.map(r => ({ from: r[0], to: r[1].match(molEx) }));
		let atoms = new Set(ruledata.flatMap(r => r.to));
		let uniqueAtoms = [...atoms].filter(a => !rules.some(r => r[0] === a));
		uniqueAtoms = uniqueAtoms.map(u => ({ atom: u, rules: ruledata.filter(r => r.to.some(a => a === u)).length }));
		console.log(uniqueAtoms);
		*/
		// setTimeout(() => { this.reverseOperate([{ steps: 0, data: mol }], rules, new Set()); }, 1);
	}

	customRender() {
		return <div>
			<p>Calibration: {this.state.calibration}</p>
			<p>Shortest sequence: {this.state.steps}</p>
		</div>;
	}
}

export class S19b extends Solver {
}