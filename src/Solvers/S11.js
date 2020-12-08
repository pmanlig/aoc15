//import React from 'react';
import Solver from './Solver';

const letters = "abcdefghijklmnopqrstuvwxyz";

export class S11a extends Solver {


	valid(pwd) {
		if (/[iol]/.test(pwd)) { return false; }
		let dupes = 0, straights = 0;
		for (let i = 1; i < pwd.length; i++) {
			if (pwd[i] === pwd[i - 1]) {
				dupes++;
				i++;
			}
		}
		for (let i = 0; i < pwd.length - 2; i++) {
			if (letters.includes(pwd.substring(i, i + 3))) {
				straights++;
			}
		}
		return dupes > 1 && straights > 0;
	}

	increment(pwd) {
		pwd = pwd.split('');
		for (let i = pwd.length; i > 0;) {
			i--;
			let pos = letters.indexOf(pwd[i]);
			if (pos === letters.length - 1) {
				pwd[i] = 'a'
			} else {
				pwd[i] = letters[pos + 1];
				return pwd.join('');
			}
		}
	}

	solve(input) {
		input = this.increment(input);
		while (!this.valid(input)) {
			input = this.increment(input);
		}
		let firstPwd = input;
		input = this.increment(input);
		while (!this.valid(input)) {
			input = this.increment(input);
		}
		this.setState({ solution: `Password(1): ${firstPwd}\nPassword(2): ${input}` });
	}
}

export class S11b extends Solver {
}