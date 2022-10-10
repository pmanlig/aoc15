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
	calibrate(mol, rules) {
		let calibration = [];
		let atoms = mol.match(molEx);
		atoms.forEach((a, i) => {
			rules.forEach(r => {
				if (a === r[0]) {
					let cpy = [...atoms];
					cpy[i] = r[1];
					cpy = cpy.join('');
					if (!calibration.some(m => m === cpy)) { calibration.push(cpy); }
				}
			});
		});
		return calibration;
	}
	
	solve(input) {
		// input = "H => HO\nH => OH\nO => HH\n\nHOH";
		// input = "H => HO\nH => OH\nO => HH\n\nHOHOHO";
		input = input.split('\n');
		let mol = input[input.length - 1];
		let rules = input.slice(0, -2).map(s => /(\w+) => (\w+)/.exec(s).slice(1));
		let calibration = this.calibrate(mol, rules);
		new State(mol, 0).generate(rules);
		let search = new Search(new State(mol, 0), "e");
		let reaction = search.find(rules);
		this.setState({ calibration: calibration.length, steps: reaction.steps, molecule: reaction.mol });
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