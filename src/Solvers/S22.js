// import React from 'react';
import Solver from './Solver';

class Easy {
	constructor(wiz, boss, effects) {
		this.wiz = wiz;
		this.boss = boss;
		this.effects = effects || { shield: 0, poison: 0, recharge: 0 };
		this.manaSpent = 0;
		this.lastSpell = "Initial";
	}

	applyEffects() {
		this.effects.shield--;
		if (this.effects.poison-- > 0) this.boss.hp -= 3;
		if (this.effects.recharge-- > 0) this.wiz.mana += 101;
	}

	bossTurn() {
		this.wiz.hp -= (this.effects.shield > 0 ? Math.max(1, this.boss.damage - 7) : this.boss.damage);
	}

	cast(wiz, boss, effects, mana, last) {
		let s = new Easy({ hp: wiz.hp || this.wiz.hp, mana: wiz.mana || this.wiz.mana, armor: wiz.armor || this.wiz.armor },
			{ hp: boss.hp || this.boss.hp, damage: this.boss.damage },
			{ shield: effects.shield || this.effects.shield, poison: effects.poison || this.effects.poison, recharge: effects.recharge || this.effects.recharge });
		s.history = this;
		s.manaSpent = mana;
		s.lastSpell = last;
		if (s.wiz.mana < 0) return s;
		// Boss' turn
		s.applyEffects();
		if (s.boss.hp < 1) return s;
		if (s.wiz.hp < 1) return s;
		s.bossTurn();
		// Next turn
		s.applyEffects();
		if (s.wiz.hp < 1) return s;
		return s;
	}

	magicMissile() {
		return this.cast({ mana: this.wiz.mana - 53 }, { hp: this.boss.hp - 4 }, {}, this.manaSpent + 53, "Magic Missile");
	}

	drain() {
		return this.cast({ mana: this.wiz.mana - 73, hp: this.wiz.hp + 2 }, { hp: this.boss.hp - 2 }, {}, this.manaSpent + 73, "Drain");
	}

	shield() {
		return this.cast({ mana: this.wiz.mana - 113 }, {}, { shield: 6 }, this.manaSpent + 113, "Shield");
	}

	poison() {
		return this.cast({ mana: this.wiz.mana - 173 }, {}, { poison: 6 }, this.manaSpent + 173, "Poison");
	}

	recharge() {
		return this.cast({ mana: this.wiz.mana - 229 }, {}, { recharge: 5 }, this.manaSpent + 229, "Recharge");
	}

	toString() {
		return `WizHP: ${this.wiz.hp}, Mana: ${this.wiz.mana}, Mana Spent: ${this.manaSpent}, BossHP: ${this.boss.hp}, Damage: ${this.boss.damage}, Shield: ${Math.max(this.effects.shield, 0)}, Poison: ${Math.max(this.effects.poison, 0)}, Recharge: ${Math.max(this.effects.recharge, 0)} - ${this.lastSpell}`;
	}
}

class Hard extends Easy {
	cast(wiz, boss, effects, mana, last) {
		let s = new Hard({ hp: wiz.hp || this.wiz.hp, mana: wiz.mana || this.wiz.mana, armor: wiz.armor || this.wiz.armor },
			{ hp: boss.hp || this.boss.hp, damage: this.boss.damage },
			{ shield: effects.shield || this.effects.shield, poison: effects.poison || this.effects.poison, recharge: effects.recharge || this.effects.recharge });
		s.history = this;
		s.manaSpent = mana;
		s.lastSpell = last;
		if (s.wiz.mana < 0) return s;
		// Boss' turn
		s.applyEffects();
		if (s.boss.hp < 1) return s;
		s.bossTurn();
		// Next turn
		s.wiz.hp--;
		if (s.wiz.hp < 1) return s;
		s.applyEffects();
		return s;
	}
}

export class S22a extends Solver {
	solve(input) {
		let initial = {
			wiz: { hp: 50, mana: 500, armor: 0 },
			boss: { hp: parseInt(/Hit Points: (\d+)/.exec(input)[1], 10), damage: parseInt(/Damage: (\d+)/.exec(input)[1], 10) }
		};
		// initial = new State({ hp: 10, mana: 250 }, { hp: 13, damage: 8 });
		// initial = new State({ hp: 10, mana: 250 }, { hp: 14, damage: 8 });
		let states = [new Easy({ ...initial.wiz }, { ...initial.boss })], win = null;
		while (states.length > 0) {
			let s = states.shift();
			if (s.boss.hp < 1) {
				if (win === null || s.manaSpent < win.manaSpent) win = s;
			} else {
				states.push(s.magicMissile());
				states.push(s.drain());
				if (s.effects.shield < 1) states.push(s.shield());
				if (s.effects.poison < 1) states.push(s.poison());
				if (s.effects.recharge < 1) states.push(s.recharge());
				states = states.filter(st => st.wiz.hp > 0 && st.wiz.mana > -1).sort((a, b) => a.boss.hp - b.boss.hp);
				// eslint-disable-next-line
				if (win !== null) states = states.filter(st => st.manaSpent < win.manaSpent);
			}
		}
		if (win !== null) {
			let hist = [win];
			while (hist[0].history !== undefined) hist.unshift(hist[0].history);
			this.setState({ solution: hist.map(s => s.toString()).join("\n") });
		} else
			this.setState({ solution: "No solution found" });
	}
}

export class S22b extends Solver {
	solve(input) {
		let initial = {
			wiz: { hp: 50, mana: 500, armor: 0 },
			boss: { hp: parseInt(/Hit Points: (\d+)/.exec(input)[1], 10), damage: parseInt(/Damage: (\d+)/.exec(input)[1], 10) }
		};
		// initial = new State({ hp: 10, mana: 250 }, { hp: 13, damage: 8 });
		// initial = new State({ hp: 10, mana: 250 }, { hp: 14, damage: 8 });
		let states = [new Hard({ ...initial.wiz }, { ...initial.boss })], win = null;
		while (states.length > 0) {
			let s = states.shift();
			if (s.boss.hp < 1) {
				if (win === null || s.manaSpent < win.manaSpent) win = s;
			} else {
				states.push(s.magicMissile());
				states.push(s.drain());
				if (s.effects.shield < 1) states.push(s.shield());
				if (s.effects.poison < 1) states.push(s.poison());
				if (s.effects.recharge < 1) states.push(s.recharge());
				states = states.filter(st => st.wiz.hp > 0 && st.wiz.mana > -1).sort((a, b) => a.boss.hp - b.boss.hp);
				// eslint-disable-next-line
				if (win !== null) states = states.filter(st => st.manaSpent < win.manaSpent);
			}
		}
		if (win !== null) {
			let hist = [win];
			while (hist[0].history !== undefined) hist.unshift(hist[0].history);
			this.setState({ solution: hist.map(s => s.toString()).join("\n") });
		} else
			this.setState({ solution: "No solution found" });
	}
}