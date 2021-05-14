// import React from 'react';
import Solver from './Solver';

let weapons = [
	{ name: "Dagger", cost: 8, damage: 4 },
	{ name: "Shortsword", cost: 10, damage: 5 },
	{ name: "Warhammer", cost: 25, damage: 6 },
	{ name: "Longsword", cost: 40, damage: 7 },
	{ name: "Greataxe", cost: 74, damage: 8 },
];

let armors = [
	{ name: "None", cost: 0, armor: 0 },
	{ name: "Leather", cost: 13, armor: 1 },
	{ name: "Chainmail", cost: 31, armor: 2 },
	{ name: "Splintmail", cost: 53, armor: 3 },
	{ name: "Bandedmail", cost: 75, armor: 4 },
	{ name: "Platemail", cost: 102, armor: 5 },
];

let rings = [
	{ name: "No ring", cost: 0, damage: 0, armor: 0 },
	{ name: "No ring", cost: 0, damage: 0, armor: 0 },
	{ name: "Damage +1", cost: 25, damage: 1, armor: 0 },
	{ name: "Damage +2", cost: 50, damage: 2, armor: 0 },
	{ name: "Damage +3", cost: 100, damage: 3, armor: 0 },
	{ name: "Armor +1", cost: 20, damage: 0, armor: 1 },
	{ name: "Armor +2", cost: 40, damage: 0, armor: 2 },
	{ name: "Armor +3", cost: 80, damage: 0, armor: 3 },
];

export class S21a extends Solver {
	simulate(me, boss) {
		while (me.hp > 0 && boss.hp > 0) {
			boss.hp -= Math.max(1, me.damage - boss.armor);
			if (boss.hp > 0) me.hp -= Math.max(1, boss.damage - me.armor);
		}
	}

	solve(input) {
		let minCost = 0, maxCost = 0;
		let boss = {
			hp: parseInt(/Hit Points: (\d+)/.exec(input)[1], 10),
			damage: parseInt(/Damage: (\d+)/.exec(input)[1], 10),
			armor: parseInt(/Armor: (\d+)/.exec(input)[1], 10)
		}
		for (let w = 0; w < weapons.length; w++) {
			for (let a = 0; a < armors.length; a++) {
				for (let r1 = 0; r1 < rings.length; r1++) {
					for (let r2 = 0; r2 < rings.length; r2++) {
						if (r1 !== r2) {
							let cost = weapons[w].cost + armors[a].cost + rings[r1].cost + rings[r2].cost;
							let me = { hp: 100, damage: 0, armor: 0 };
							me.damage += weapons[w].damage + rings[r1].damage + rings[r2].damage;
							me.armor += armors[a].armor + rings[r1].armor + rings[r2].armor;
							this.simulate(me, { ...boss });
							if (me.hp > 0 && (minCost === 0 || cost < minCost)) minCost = cost;
							if (me.hp < 1 && cost > maxCost) maxCost = cost;
						}
					}
				}
			}
		}
		console.log("Done");
		this.setState({ solution: `Minimum cost: ${minCost}\nMaximum cost: ${maxCost}` });
	}
}

export class S21b extends Solver {
}