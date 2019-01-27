import { Point } from "pixi.js/lib/core/math";
import { player, setScene } from "./main";

export function toInterior(Scene) {
	return {
		points: [
			new Point(-580, 100),
			new Point(-500, 100),
			new Point(-500, 400),
			new Point(-580, 400),
		],
		onEnter: () => {
			setTimeout(() => {
				setScene(new Scene());
				// hallway entrance
				player.p.x = 424;
				player.p.y = 235;
			});
		},
	};
}

export function toExterior(Scene) {
	return {
		points: [
			new Point(500, 100),
			new Point(450, 100),
			new Point(450, 400),
			new Point(500, 400),
		],
		onEnter: () => {
			setTimeout(() => {
				setScene(new Scene());
				// hallway exit
				player.p.x = -480;
				player.p.y = 240;
			});
		},
	};
}

export function toNextDay(Scene, day) {
	return {
		points: [
			new Point(-450, 100),
			new Point(-400, 100),
			new Point(-400, 200),
			new Point(-450, 200),
		],
		onEnter: () => {
			player.saying = 'go to bed';
		},
		onExit: () => {
			player.saying = '';
		},
		onInteract: () => {
			player.saying = '';
			setTimeout(() => {
				setScene(new Scene(), day);
				// at stairs
				player.p.x = 12;
				player.p.y = 144;
			});
		}
	};
}
