//import React from 'react';
import Solver from './Solver';

export class S14a extends Solver {
	travel(speed, stamina, rest, time) {
		return Math.floor(time / (stamina + rest)) * (speed * stamina)
			+ Math.min(time % (stamina + rest), stamina) * speed;
	}

	solve(input) {
		// input = "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.";
		// let time = 1000;
		let time = 2503;
		let reindeers = input.split('\n').map(r => /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds.$/mi.exec(r).slice(1));
		reindeers.forEach(r => {
			r[1] = parseInt(r[1], 10);
			r[2] = parseInt(r[2], 10);
			r[3] = parseInt(r[3], 10);
			r.push(0);
			r.push(0);
		});

		for (let t = 0; t < time;) {
			t++;
			let max = 0;
			reindeers.forEach(r => {
				r[4] = this.travel(r[1], r[2], r[3], t);
				if (r[4] > max) max = r[4];
			});
			reindeers.forEach(r => {
				if (r[4] === max) r[5]++;
			});
		}

		this.setState({ solution: `Max travel after ${time}s: ${Math.max(...reindeers.map(r => r[4]))}\nScore after ${time}s: ${Math.max(...reindeers.map(r => r[5]))}` });
	}
}

export class S14b extends Solver {
}