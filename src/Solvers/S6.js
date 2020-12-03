import React from 'react';
import Solver from './Solver';

class Grid {
	constructor() {
		this.data = [];
		for (let y = 0; y < 1000; y++) {
			this.data[y] = [];
			for (let x = 0; x < 1000; x++) {
				this.data[y][x] = 0;
			}
		}
	}
}

class MonoGrid extends Grid {
	on(x, y) {
		this.data[y][x] = 1;
	}

	off(x, y) {
		this.data[y][x] = 0;
	}

	toggle(x, y) {
		if (this.data[y][x] === 1) { this.data[y][x] = 0; } else { this.data[y][x] = 1; }
	}

	drawTo(canvas) {
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, 1000, 1000);
		ctx.fillStyle = "#FFFFFF";
		for (let y = 0; y < 1000; y++) {
			for (let x = 0; x < 1000; x++) {
				if (this.data[y][x] === 1) { ctx.fillRect(x, y, 1, 1); }
			}
		}
	}
}

class ColorGrid extends Grid {
	on(x, y) {
		this.data[y][x]++;
	}

	off(x, y) {
		if (this.data[y][x] > 0) {
			this.data[y][x]--;
		}
	}

	toggle(x, y) {
		this.data[y][x] += 2;
	}
}

class Coordinate {
	constructor(s) {
		s = s.split(',');
		this.x = parseInt(s[0], 10);
		this.y = parseInt(s[1], 10);
	}

	toString() {
		return `<${this.x}, ${this.y}>`;
	}
}

class Command {
	constructor(c) {
		c = c.split(' ');
		if (c.length === 5) c.shift();
		this.cmd = c[0];
		if (c[0] === "toggle") { this.op = (g, x, y) => g.toggle(x, y); this.drawTo = this.toggle; }
		else if (c[0] === "off") { this.op = (g, x, y) => g.off(x, y); this.drawTo = this.off; }
		else if (c[0] === "on") { this.op = (g, x, y) => g.on(x, y); this.drawTo = this.on; }
		this.from = new Coordinate(c[1]);
		this.to = new Coordinate(c[3]);
	}

	exec(g) {
		for (let y = this.from.y; y <= this.to.y; y++) {
			for (let x = this.from.x; x <= this.to.x; x++) {
				this.op(g, x, y);
			}
		}
	}

	draw(canvas, color) {
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(this.from.x, this.from.y, this.to.x - this.from.x + 1, this.to.y - this.from.y + 1);
	}

	on(canvas) { this.draw(canvas, "#FFFFFF"); }
	off(canvas) { this.draw(canvas, "#000000"); }

	toggle(canvas) {
		let ctx = canvas.getContext("2d");
		let img = ctx.getImageData(this.from.x, this.from.y, this.to.x - this.from.x + 1, this.to.y - this.from.y + 1);
		for (let i = 0; i < img.data.length; i++) {
			img.data[i] = 255 - img.data[i];
			if (i % 4 === 3) img.data[i] = 255;
		}
		ctx.putImageData(img, this.from.x, this.from.y);
	}
}

export class S6a extends Solver {
	constructor(props) {
		super(props);
		this.mono = new MonoGrid();
		this.col = new ColorGrid();
		this.canvas = React.createRef();
	}

	process(input, i) {
		if (i >= input.length) { return; }
		input[i].exec(this.mono);
		input[i].exec(this.col);
		this.setState({ instruction: i + 1 });
		// if (i % 10 === 9) { input[i].drawTo(this.canvas.current); }
		input[i].drawTo(this.canvas.current);
		setTimeout(() => this.process(input, i + 1), 1);
	}

	solve(input) {
		input = input.split('\n').map(c => new Command(c));
		this.setState({ input: input });
		let ctx = this.canvas.current.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, 1000, 1000);
		setTimeout(() => this.process(input, 0), 1);
	}

	customRender() {
		// let i = 0;
		return <div>
			<p>Length: {this.state.input && this.state.input.length}</p>
			<p>Processing: {this.state.instruction}</p>
			<p>Grid: {this.mono.data.length}</p>
			<p>Lit: {this.mono.data.reduce((a, b) => a + b.reduce((p, q) => p + q, 0), 0)}</p>
			<p>Brightness: {this.col.data.reduce((a, b) => a + b.reduce((p, q) => p + q, 0), 0)}</p>
			{/*this.state.input && this.state.input.map(r => <p key={i++}>{r.cmd} {r.from.toString()} =&gt; {r.to.toString()}</p>)*/}
			<canvas id="solution" ref={this.canvas} width="1000" height="1000" />
		</div>
	}
}

export class S6b extends Solver {
}